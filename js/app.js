/**
 * app.js
 * Main application entry point.
 * Wires up event listeners for the product page and cart page.
 */

/* ─── Initialization ─────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;

    if (page === "shop") {
        initShopPage();
    } else if (page === "checkout") {
        initCheckoutPage();
    }

    // Always update badge
    updateCartBadge();
});

/* ─── Shop Page ──────────────────────────────────────────── */

function initShopPage() {
    let currentCategory = "All";
    let currentView = "grid";

    // Render categories
    renderCategoryFilters(getCategories(), currentCategory);

    // Render products
    renderProductGrid(getAllProducts(), currentView);

    /* Category filter clicks */
    document.getElementById("category-filters")?.addEventListener("click", (e) => {
        const pill = e.target.closest(".filter-pill");
        if (!pill) return;

        currentCategory = pill.dataset.cat;

        // Update active pill
        document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("filter-pill--active"));
        pill.classList.add("filter-pill--active");

        renderProductGrid(getProductsByCategory(currentCategory), currentView);
    });

    /* View toggle (grid / list) */
    document.getElementById("view-toggle")?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-view]");
        if (!btn) return;
        currentView = btn.dataset.view;

        document.querySelectorAll("[data-view]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        renderProductGrid(getProductsByCategory(currentCategory), currentView);
    });

    /* Add to cart */
    document.getElementById("product-grid")?.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-to-cart-btn");
        if (!btn) return;

        const productId = parseInt(btn.dataset.id, 10);
        const result = addToCart(productId);

        if (result.success) {
            showToast(result.message, "success");
            updateCartBadge();

            // Visual feedback on button
            btn.classList.add("btn--added");
            btn.textContent = "✓ Added!";
            setTimeout(() => {
                btn.classList.remove("btn--added");
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg> Add to Cart`;
            }, 1500);
        } else {
            showToast(result.message, "error");
        }
    });

    /* Search */
    document.getElementById("search-input")?.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        let pool = getProductsByCategory(currentCategory);
        if (query) {
            pool = pool.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }
        renderProductGrid(pool, currentView);
    });
}

/* ─── Checkout Page ──────────────────────────────────────── */

function initCheckoutPage() {
    refreshCartUI();

    /* Quantity decrease */
    document.getElementById("cart-tbody")?.addEventListener("click", (e) => {
        const decBtn = e.target.closest(".qty-btn--dec");
        const incBtn = e.target.closest(".qty-btn--inc");
        const removeBtn = e.target.closest(".remove-btn");

        if (decBtn) {
            const id = parseInt(decBtn.dataset.id, 10);
            const item = getCartWithDetails().find((i) => i.id === id);
            if (!item) return;

            if (item.quantity <= 1) {
                showToast("Minimum quantity is 1. Use the remove button to delete.", "error");
                return;
            }
            const result = updateCartQuantity(id, item.quantity - 1);
            if (result.success) refreshCartUI();
            else showToast(result.message, "error");
        }

        if (incBtn) {
            const id = parseInt(incBtn.dataset.id, 10);
            const item = getCartWithDetails().find((i) => i.id === id);
            if (!item) return;

            const result = updateCartQuantity(id, item.quantity + 1);
            if (result.success) refreshCartUI();
            else showToast(result.message, "error");
        }

        if (removeBtn) {
            const id = parseInt(removeBtn.dataset.id, 10);
            const result = removeFromCart(id);
            if (result.success) {
                showToast("Item removed from cart.", "info");
                refreshCartUI();
            }
        }
    });

    /* Quantity input direct edit */
    document.getElementById("cart-tbody")?.addEventListener("change", (e) => {
        const input = e.target.closest(".qty-input");
        if (!input) return;

        const id = parseInt(input.dataset.id, 10);
        const newQty = parseInt(input.value, 10);

        if (isNaN(newQty) || newQty < 1) {
            showToast("Please enter a valid quantity (minimum 1).", "error");
            refreshCartUI(); // Reset invalid input
            return;
        }

        const result = updateCartQuantity(id, newQty);
        if (result.success) refreshCartUI();
        else showToast(result.message, "error");
    });

    /* Clear cart */
    document.getElementById("clear-cart-btn")?.addEventListener("click", () => {
        if (getCartCount() === 0) {
            showToast("Cart is already empty.", "info");
            return;
        }
        if (confirm("Are you sure you want to clear the entire cart?")) {
            clearCart();
            showToast("Cart cleared.", "info");
            refreshCartUI();
        }
    });

    /* Checkout button */
    document.getElementById("checkout-btn")?.addEventListener("click", () => {
        if (getCartCount() === 0) {
            showToast("Your cart is empty. Add some products first!", "error");
            return;
        }
        showOrderConfirmation();
    });

    /* Close modal */
    document.getElementById("modal-close")?.addEventListener("click", closeOrderModal);
    document.getElementById("order-modal")?.addEventListener("click", (e) => {
        if (e.target === document.getElementById("order-modal")) closeOrderModal();
    });
}

/* ─── Order Confirmation Modal ───────────────────────────── */

function showOrderConfirmation() {
    const modal = document.getElementById("order-modal");
    const items = getCartWithDetails();
    const subtotal = getCartSubtotal();
    const shipping = getShippingCost(subtotal);
    const total = subtotal + shipping;

    const itemsHtml = items
        .map(
            (item) =>
                `<div class="modal-item">
          <span>${item.name} × ${item.quantity}</span>
          <span>${formatCurrency(item.lineTotal)}</span>
        </div>`
        )
        .join("");

    document.getElementById("modal-items").innerHTML = itemsHtml;
    document.getElementById("modal-shipping").textContent =
        shipping === 0 ? "FREE" : formatCurrency(shipping);
    document.getElementById("modal-total").textContent = formatCurrency(total);

    modal.classList.add("modal--open");
    document.body.style.overflow = "hidden";
}

function closeOrderModal() {
    document.getElementById("order-modal")?.classList.remove("modal--open");
    document.body.style.overflow = "";
}

document.getElementById("modal-confirm")?.addEventListener("click", () => {
    clearCart();
    closeOrderModal();
    showToast("🎉 Order placed! Thank you for shopping with us.", "success");
    setTimeout(() => refreshCartUI(), 300);
});
