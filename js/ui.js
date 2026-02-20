/**
 * ui.js
 * Handles all DOM updates and UI rendering.
 */

/* ─── Shared helpers ─────────────────────────────────────── */

/**
 * Format a number as USD currency string.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Render star rating HTML.
 * @param {number} rating  e.g. 4.6
 * @returns {string} HTML string
 */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<span class="stars">' +
    "★".repeat(full) +
    (half ? '<span class="half-star">★</span>' : "") +
    "☆".repeat(empty) +
    "</span>"
  );
}

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 */
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  const icons = { success: "✓", error: "✕", info: "ℹ" };
  toast.innerHTML = `<span class="toast__icon">${icons[type] || "ℹ"}</span>${message}`;
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add("toast--show"));

  setTimeout(() => {
    toast.classList.remove("toast--show");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 3000);
}

/* ─── Cart badge ─────────────────────────────────────────── */

/**
 * Update the cart count badge in the navbar.
 */
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count === 0 ? "none" : "flex";
}

/* ─── Product page ───────────────────────────────────────── */

/**
 * Render the product grid / list.
 * @param {Array} products - Array of product objects.
 * @param {string} viewMode - 'grid' | 'list'
 */
function renderProductGrid(products, viewMode = "grid") {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">🔍</div>
        <h3>No products found</h3>
        <p>Try a different category.</p>
      </div>`;
    return;
  }

  grid.className = `product-${viewMode}`;

  grid.innerHTML = products
    .map(
      (p) => `
    <article class="product-card" data-id="${p.id}" aria-label="${p.name}">
      <a href="product.html?id=${p.id}" class="product-card__img-wrap" tabindex="-1" aria-hidden="true">
        <img src="${p.image}" alt="${p.name}" class="product-card__img" loading="lazy" />
        <span class="product-card__badge">${p.badge || p.category}</span>
      </a>
      <div class="product-card__body">
        <a href="product.html?id=${p.id}" style="text-decoration:none;color:inherit">
          <h3 class="product-card__name">${p.name}</h3>
        </a>
        <p class="product-card__desc">${p.description}</p>
        <div class="product-card__meta">
          ${renderStars(p.rating)}
          <span class="product-card__reviews">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-card__footer">
          <span class="product-card__price">${formatCurrency(p.price)}</span>
          <button
            class="btn btn--primary add-to-cart-btn"
            data-id="${p.id}"
            aria-label="Add ${p.name} to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </article>`
    )
    .join("");
}

/**
 * Render the category filter pills.
 * @param {string[]} categories
 * @param {string} active - Currently active category
 */
function renderCategoryFilters(categories, active = "All") {
  const container = document.getElementById("category-filters");
  if (!container) return;

  container.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-pill ${cat === active ? "filter-pill--active" : ""}" data-cat="${cat}">${cat}</button>`
    )
    .join("");
}

/* ─── Cart page ──────────────────────────────────────────── */

/**
 * Render the cart items table / list on checkout.html.
 */
function renderCartItems() {
  const tbody = document.getElementById("cart-tbody");
  const emptyState = document.getElementById("cart-empty");
  const cartContent = document.getElementById("cart-content");

  if (!tbody) return;

  const items = getCartWithDetails();

  if (items.length === 0) {
    if (emptyState) emptyState.style.display = "flex";
    if (cartContent) cartContent.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (cartContent) cartContent.style.display = "block";

  tbody.innerHTML = items
    .map(
      (item) => `
    <tr class="cart-row" data-id="${item.id}">
      <td class="cart-row__product">
        <img src="${item.image}" alt="${item.name}" class="cart-row__img" />
        <div>
          <p class="cart-row__name">${item.name}</p>
          <p class="cart-row__cat">${item.category}</p>
        </div>
      </td>
      <td class="cart-row__price">${formatCurrency(item.price)}</td>
      <td class="cart-row__qty">
        <div class="qty-control">
          <button class="qty-btn qty-btn--dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <input
            type="number"
            class="qty-input"
            value="${item.quantity}"
            min="1"
            data-id="${item.id}"
            aria-label="Quantity for ${item.name}"
          />
          <button class="qty-btn qty-btn--inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      </td>
      <td class="cart-row__total">${formatCurrency(item.lineTotal)}</td>
      <td class="cart-row__remove">
        <button class="remove-btn" data-id="${item.id}" aria-label="Remove ${item.name}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
        </button>
      </td>
    </tr>`
    )
    .join("");
}

/**
 * Render the order summary panel.
 */
function renderOrderSummary() {
  const subtotalEl = document.getElementById("summary-subtotal");
  const shippingEl = document.getElementById("summary-shipping");
  const totalEl = document.getElementById("summary-total");
  const itemCountEl = document.getElementById("summary-item-count");

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (shippingEl)
    shippingEl.textContent = shipping === 0 ? "FREE 🎉" : formatCurrency(shipping);
  if (totalEl) totalEl.textContent = formatCurrency(total);
  if (itemCountEl) {
    const count = getCartCount();
    itemCountEl.textContent = `${count} item${count !== 1 ? "s" : ""}`;
  }
}

/**
 * Refresh all cart UI (items + summary + badge).
 */
function refreshCartUI() {
  renderCartItems();
  renderOrderSummary();
  updateCartBadge();
}
