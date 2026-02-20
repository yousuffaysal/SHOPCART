# ShpCart 🛒

A fully functional shopping cart web application built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

![Shop Page](https://raw.githubusercontent.com/yousuffaysal/SHOPCART/main/images/headphones.png)

## ✨ Features

- **Product Shop** — 8 products across 5 categories (Audio, Wearables, Peripherals, Accessories, Displays)
- **Product Details Page** — image gallery with zoom, specs/description tabs, quantity selector, wishlist toggle, related products
- **Shopping Cart** — add, update quantity, remove items; persisted via `localStorage`
- **Checkout** — order summary with dynamic subtotal, free shipping threshold (>$100), confirmation modal
- **Filtering & Search** — category filter pills + live search bar
- **Grid / List view** toggle with smooth animations
- **Light Theme** — editorial Bauhaus aesthetic (warm cream, terracotta accents)
- **Responsive** — mobile, tablet, and desktop layouts

## 🗂️ Project Structure

```
Shpcart/
├── index.html          # Product listing page
├── product.html        # Product details page (?id=N)
├── checkout.html       # Cart & checkout page
├── css/
│   └── style.css       # Full custom stylesheet (light theme)
├── js/
│   ├── products.js     # Product data + helper functions
│   ├── cart.js         # Cart logic (localStorage persistence)
│   ├── ui.js           # DOM rendering functions
│   └── app.js          # App entry point & event wiring
└── images/             # Product images
```

## 🚀 Getting Started

No build steps needed. Just open `index.html` in your browser:

```bash
# Clone the repo
git clone https://github.com/yousuffaysal/SHOPCART.git
cd SHOPCART

# Open directly in browser
open index.html
```

Or serve it locally with any static server:

```bash
npx serve .
# → http://localhost:3000
```

## 🎨 Design

| Token | Value |
|---|---|
| Background | `#F7F4EE` (warm cream) |
| Accent | `#C4522A` (terracotta/rust) |
| Display font | Syne (geometric, 800wt) |
| Body font | Crimson Pro (editorial serif) |
| Mono font | JetBrains Mono (prices & labels) |

## 🛠️ Tech Stack

- **HTML5** — semantic markup, ARIA attributes
- **CSS3** — custom properties, grid, flexbox, `@keyframes` animations
- **Vanilla JavaScript** — ES6+, modular structure, no dependencies
- **Google Fonts** — Syne, Crimson Pro, JetBrains Mono

## 📄 License

MIT
