/**
 * products.js
 * Contains all product data for the store.
 */

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.",
    longDescription: "Experience music the way the artist intended. These flagship wireless headphones feature custom-tuned 40mm dynamic drivers, adaptive active noise cancellation that adjusts to your environment, and a comfortable memory-foam ear cushion designed for marathon listening sessions. Pair via multipoint Bluetooth 5.3 to two devices simultaneously.",
    price: 89.99,
    image: "images/headphones.png",
    images: ["images/headphones.png"],
    category: "Audio",
    rating: 4.8,
    reviews: 1240,
    badge: "Best Seller",
    specs: [
      { label: "Driver Size", value: "40mm Dynamic" },
      { label: "Frequency Response", value: "20 Hz – 20 kHz" },
      { label: "Battery Life", value: "30 hrs (ANC on)" },
      { label: "Charging", value: "USB-C, 10 min → 3 hrs" },
      { label: "Connectivity", value: "Bluetooth 5.3, Multipoint" },
      { label: "Noise Cancellation", value: "Adaptive ANC" },
      { label: "Weight", value: "254 g" },
      { label: "In the Box", value: "Headphones, USB-C Cable, Carry Case" },
    ],
  },
  {
    id: 2,
    name: "Pro Smartwatch Series X",
    description:
      "Advanced health tracking smartwatch with GPS, heart-rate monitor, sleep analysis, and 7-day battery.",
    longDescription: "Your ultimate health companion. The Series X tracks over 60 workout modes, continuous blood-oxygen saturation, ECG, and advanced sleep staging. An always-on AMOLED display with 1000-nit brightness stays readable in direct sunlight. IP68 rated — swim, shower, sweat.",
    price: 199.99,
    image: "images/smartwatch.png",
    images: ["images/smartwatch.png"],
    category: "Wearables",
    rating: 4.6,
    reviews: 876,
    badge: "New",
    specs: [
      { label: "Display", value: "1.9\" AMOLED, 1000 nits" },
      { label: "Battery Life", value: "Up to 7 days" },
      { label: "Health Sensors", value: "Heart Rate, SpO2, ECG, Temperature" },
      { label: "GPS", value: "Built-in GNSS (GPS + GLONASS)" },
      { label: "Water Resistance", value: "IP68 (50m)" },
      { label: "Connectivity", value: "Bluetooth 5.2, Wi-Fi 2.4G" },
      { label: "Compatibility", value: "iOS 14+ / Android 8+" },
      { label: "Storage", value: "4 GB onboard" },
    ],
  },
  {
    id: 3,
    name: "RGB Mechanical Gaming Keyboard",
    description:
      "Compact TKL mechanical keyboard with per-key RGB lighting, tactile switches, and aluminum top plate.",
    longDescription: "Built for performance, designed for aesthetics. The TKL layout reclaims desk space without sacrificing any typing keys. Per-key RGB with 16.8 million color effects synchronise across your setup. The aircraft-grade aluminum top plate damps vibration and gives every keystroke a satisfying, premium feel.",
    price: 129.99,
    image: "images/keyboard.png",
    images: ["images/keyboard.png"],
    category: "Peripherals",
    rating: 4.7,
    reviews: 2150,
    badge: "Top Rated",
    specs: [
      { label: "Layout", value: "TKL (87 keys)" },
      { label: "Switches", value: "Tactile Brown (hot-swap)" },
      { label: "RGB", value: "Per-key, 16.8M colors" },
      { label: "Top Plate", value: "Aircraft-grade Aluminum" },
      { label: "Polling Rate", value: "1000 Hz (1ms)" },
      { label: "Anti-ghosting", value: "Full N-Key Rollover" },
      { label: "Cable", value: "Detachable USB-C braided" },
      { label: "Weight", value: "870 g" },
    ],
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    description:
      "360° surround sound portable speaker, IPX7 waterproof, 20-hour playtime, and deep bass radiator.",
    longDescription: "Go anywhere, sound everywhere. The passive bass radiator delivers room-filling low-end that defies the compact size. 360° acoustic dispersion means every direction is the best seat in the house. Drop it, soak it — IPX7 certification means it just keeps playing.",
    price: 59.99,
    image: "images/speaker.png",
    images: ["images/speaker.png"],
    category: "Audio",
    rating: 4.5,
    reviews: 3420,
    badge: "Popular",
    specs: [
      { label: "Output Power", value: "20W (2 × 10W)" },
      { label: "Bass Radiator", value: "Passive, dual-sided" },
      { label: "Battery Life", value: "20 hrs at 70% volume" },
      { label: "Water Resistance", value: "IPX7 (30 min @ 1m)" },
      { label: "Charging", value: "USB-C, 2.5 hrs full charge" },
      { label: "Connectivity", value: "Bluetooth 5.0, AUX-in" },
      { label: "Dimensions", value: "Ø 97 × 88 mm" },
      { label: "Weight", value: "540 g" },
    ],
  },
  {
    id: 5,
    name: "4K Webcam Pro",
    description:
      "Ultra-sharp 4K webcam with autofocus, built-in ring light, dual noise-cancelling mics for streaming.",
    longDescription: "Look your absolute best in every call and stream. The Sony STARVIS sensor captures true 4K at 30fps or silky 1080p at 60fps. Temporal noise reduction and AI-powered auto-exposure adapt to every lighting condition, while the built-in ring light with 3 colour temperatures gives you studio-quality illumination — no extra gear needed.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=85",
    images: ["https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=85"],
    category: "Peripherals",
    rating: 4.4,
    reviews: 564,
    badge: "New",
    specs: [
      { label: "Resolution", value: "4K/30fps or 1080p/60fps" },
      { label: "Sensor", value: "Sony STARVIS CMOS" },
      { label: "Field of View", value: "90° adjustable" },
      { label: "Focus", value: "AI Auto-focus" },
      { label: "Microphone", value: "Dual beam-forming, noise-cancel" },
      { label: "Ring Light", value: "3 colour temps, 5 brightness" },
      { label: "Interface", value: "USB-A 3.0 (no driver needed)" },
      { label: "Compatibility", value: "Windows, macOS, ChromeOS, Linux" },
    ],
  },
  {
    id: 6,
    name: "Ergonomic Wireless Mouse",
    description:
      "Sculpted ergonomic mouse with 6 programmable buttons, silent clicks, and 18-month battery.",
    longDescription: "Designed in collaboration with physiotherapists, the contoured shell keeps your wrist in a neutral position during even the longest work marathons. The whisper-quiet switches reduce office noise by 90%. A single AA battery powers it for up to 18 months — no charging anxieties, ever.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=85",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=85"],
    category: "Peripherals",
    rating: 4.6,
    reviews: 1890,
    badge: null,
    specs: [
      { label: "DPI Range", value: "400 – 4000 DPI (5 steps)" },
      { label: "Buttons", value: "6 programmable" },
      { label: "Clicks", value: "Silent (90% noise reduction)" },
      { label: "Battery", value: "1× AA, up to 18 months" },
      { label: "Connectivity", value: "2.4GHz nano receiver" },
      { label: "Weight", value: "101 g" },
      { label: "Hand", value: "Right-handed" },
      { label: "Compatibility", value: "Windows, macOS, Linux" },
    ],
  },
  {
    id: 7,
    name: "USB-C 100W Charging Hub",
    description:
      "7-in-1 USB-C hub with 4K HDMI, 100W PD, SD card reader, and 3 USB 3.0 ports.",
    longDescription: "Turn your single USB-C port into a complete workstation. 4K@60Hz HDMI for an ultra-sharp external display, 100W Power Delivery to charge your laptop at full speed, UHS-I SD and microSD card readers at up to 104 MB/s, and three USB 3.0 ports for peripherals — all in a sleeve-sized aluminium housing that runs cool.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=85",
    images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=85"],
    category: "Accessories",
    rating: 4.3,
    reviews: 987,
    badge: null,
    specs: [
      { label: "Ports", value: "HDMI 4K, 3× USB-A 3.0, SD, microSD, USB-C PD" },
      { label: "HDMI", value: "4K @ 60 Hz" },
      { label: "Power Delivery", value: "100W pass-through" },
      { label: "USB-A Speed", value: "USB 3.0 (5 Gbps)" },
      { label: "SD Card Speed", value: "UHS-I, up to 104 MB/s" },
      { label: "Cable Length", value: "20 cm" },
      { label: "Housing", value: "Aluminium alloy" },
      { label: "Compatibility", value: "USB-C Thunderbolt 3/4 hosts" },
    ],
  },
  {
    id: 8,
    name: "LED Gaming Monitor 27\"",
    description:
      "27-inch QHD IPS display, 165Hz refresh rate, 1ms response time, AMD FreeSync Premium.",
    longDescription: "Competitive performance meets colour accuracy. The QHD (2560×1440) IPS panel covers 95% DCI-P3 for vivid, colour-accurate content, while 165Hz and 1ms MPRT eliminate blur in fast-paced games. AMD FreeSync Premium tears up tearing. Height, tilt, swivel, and pivot adjustment let you dial in the perfect position.",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a573d5e185?w=600&q=85",
    images: ["https://images.unsplash.com/photo-1527443224154-c4a573d5e185?w=600&q=85"],
    category: "Displays",
    rating: 4.9,
    reviews: 3102,
    badge: "Editor's Pick",
    specs: [
      { label: "Panel", value: "27\" QHD IPS (2560×1440)" },
      { label: "Refresh Rate", value: "165 Hz" },
      { label: "Response Time", value: "1ms MPRT" },
      { label: "Color Gamut", value: "95% DCI-P3, 100% sRGB" },
      { label: "Brightness", value: "400 cd/m² (HDR peak: 600)" },
      { label: "Sync", value: "AMD FreeSync Premium" },
      { label: "Inputs", value: "2× HDMI 2.0, 1× DisplayPort 1.4" },
      { label: "Stand", value: "Height, Tilt, Swivel, Pivot" },
    ],
  },
];

function getAllProducts() { return PRODUCTS; }
function getProductById(id) { return PRODUCTS.find((p) => p.id === id); }
function getProductsByCategory(category) {
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}
function getCategories() {
  const cats = PRODUCTS.map((p) => p.category);
  return ["All", ...new Set(cats)];
}
function getRelatedProducts(productId, count = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== productId && p.category === product.category
  );
  const others = PRODUCTS.filter(
    (p) => p.id !== productId && p.category !== product.category
  );
  return [...sameCategory, ...others].slice(0, count);
}
