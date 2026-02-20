/**
 * cart.js
 * Contains all cart operation logic.
 * Cart is persisted in localStorage.
 */

const CART_KEY = "shpcart_cart";

/**
 * Load cart from localStorage.
 * @returns {Array} Array of cart item objects: { productId, quantity }
 */
function loadCart() {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

/**
 * Save the cart array to localStorage.
 * @param {Array} cart - Cart array to persist.
 */
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add a product to the cart or increment its quantity.
 * @param {number} productId - ID of the product to add.
 * @param {number} [quantity=1] - Quantity to add (must be >= 1).
 * @returns {{ success: boolean, message: string }} Result object.
 */
function addToCart(productId, quantity = 1) {
    if (!Number.isInteger(quantity) || quantity < 1) {
        return { success: false, message: "Quantity must be a positive integer." };
    }

    const product = getProductById(productId);
    if (!product) {
        return { success: false, message: "Product not found." };
    }

    const cart = loadCart();
    const existingIndex = cart.findIndex((item) => item.productId === productId);

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    saveCart(cart);
    return { success: true, message: `${product.name} added to cart.` };
}

/**
 * Update the quantity of a cart item.
 * @param {number} productId - Product ID.
 * @param {number} newQuantity - New quantity (must be >= 1).
 * @returns {{ success: boolean, message: string }} Result object.
 */
function updateCartQuantity(productId, newQuantity) {
    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
        return { success: false, message: "Quantity must be at least 1. Use removeFromCart to delete." };
    }

    const cart = loadCart();
    const index = cart.findIndex((item) => item.productId === productId);

    if (index === -1) {
        return { success: false, message: "Item not found in cart." };
    }

    cart[index].quantity = newQuantity;
    saveCart(cart);
    return { success: true, message: "Quantity updated." };
}

/**
 * Remove a product from the cart entirely.
 * @param {number} productId - Product ID to remove.
 * @returns {{ success: boolean, message: string }} Result object.
 */
function removeFromCart(productId) {
    let cart = loadCart();
    const index = cart.findIndex((item) => item.productId === productId);

    if (index === -1) {
        return { success: false, message: "Item not found in cart." };
    }

    cart.splice(index, 1);
    saveCart(cart);
    return { success: true, message: "Item removed from cart." };
}

/**
 * Clear all items from the cart.
 */
function clearCart() {
    saveCart([]);
}

/**
 * Get the total number of items in the cart.
 * @returns {number} Total item count.
 */
function getCartCount() {
    return loadCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Calculate the subtotal for the cart.
 * @returns {number} Subtotal price.
 */
function getCartSubtotal() {
    const cart = loadCart();
    return cart.reduce((total, item) => {
        const product = getProductById(item.productId);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

/**
 * Calculate shipping cost based on subtotal.
 * Free shipping over $100.
 * @param {number} subtotal
 * @returns {number} Shipping cost.
 */
function getShippingCost(subtotal) {
    return subtotal >= 100 ? 0 : 9.99;
}

/**
 * Get full cart data with product details merged.
 * @returns {Array} Enriched cart items array.
 */
function getCartWithDetails() {
    const cart = loadCart();
    return cart
        .map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return {
                ...item,
                ...product,
                lineTotal: product.price * item.quantity,
            };
        })
        .filter(Boolean);
}
