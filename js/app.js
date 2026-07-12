// alug — site engine v2: chrome, cart, per-texture strap art, watch+strap
// composites, high-fidelity ad artwork, page routers

const inr = n => "₹" + n.toLocaleString("en-IN");
const qs = new URLSearchParams(location.search);

/* ---------------- shared chrome ---------------- */

const LOGO = `<a class="logo" href="index.html" aria-label="alug home"><span class="l-a">a</span><span class="l-w"><span class="l-1">1</span>u<span class="l-9">9</span></span><span class="l-bar"><i class="bt-l"></i><i class="bt-r"></i></span></a>`;

function mountChrome() {
  const page = document.body.dataset.page || "";
  const hdr = document.getElementById("hdr");
  if (hdr) hdr.innerHTML = `
  <div class="site-header">
    <div class="inner">
      ${LOGO}
      <nav>
        <a href="straps.html" class="${page === "straps" || page === "product" ? "active" : ""}">Straps</a>
        <a href="watches.html" class="${["watches","watch"].includes(page) ? "active" : ""}">Shop by watch</a>
        <a href="art.html" class="${["art","artwork"].includes(page) ? "active" : ""}">Art &amp; paper</a>
        <a href="journal.html" class="${["journal","article"].includes(page) ? "active" : ""}">Journal</a>
        <a href="about.html" class="${page === "about" ? "active" : ""}">Manifesto</a>
      </nav>
      <button class="cart-btn" onclick="openCart()">Cart <span class="cart-count" id="cart-count">0</span></button>
    </div>
  </div>`;

  const ftr = document.getElementById("ftr");
  if (ftr) ftr.innerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="cols">
        <div>
          ${LOGO}
          <p class="footer-tag">Different straps for different wrists. Mechanical watches only — if it charges overnight, we can't help you.</p>
        </div>
        <div>
          <h5>Shop</h5>
          <a href="straps.html">All straps</a>
          <a href="straps.html?family=curved">Curved-end line</a>
          <a href="straps.html?family=prx">PRX fit</a>
          <a href="straps.html?tag=odd lugs">The 21 Club</a>
          <a href="art.html">Art &amp; paper</a>
        </div>
        <div>
          <h5>House</h5>
          <a href="watches.html">Shop by watch</a>
          <a href="journal.html">Journal</a>
          <a href="about.html">Manifesto</a>
        </div>
        <div>
          <h5>The dispatch</h5>
          <p style="font-size:13.5px;opacity:0.75;margin-bottom:8px">One email a month. Straps, drops, and strong opinions about taper.</p>
          <div class="newsletter">
            <input type="email" placeholder="you@example.com" aria-label="Email for newsletter">
            <button class="btn brass sm" onclick="toast('Prototype: newsletter wiring comes at launch')">Join</button>
          </div>
        </div>
      </div>
      <div class="fine">
        <span>© 2026 alug · Made in India, worn on mechanical wrists everywhere</span>
        <span>No Apple Watches were considered during the making of this site.</span>
      </div>
    </div>
  </footer>
  <div class="cart-overlay" onclick="closeCart()"></div>
  <aside class="cart-drawer" aria-label="Shopping cart">
    <header><h3>Your wristwear</h3><button class="cart-close" onclick="closeCart()" aria-label="Close cart">×</button></header>
    <div class="cart-items" id="cart-items"></div>
    <div class="cart-footer" id="cart-footer"></div>
  </aside>
  <div class="toast" id="toast"></div>`;
  renderCart();
}

/* ---------------- cart ---------------- */

const CART_KEY = "alug-cart";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = c => { localStorage.setItem(CART_KEY, JSON.stringify(c)); renderCart(); };

function findItem(type, id) {
  if (type === "strap") return STRAPS.find(s => s.id === id);
  if (type === "art") return ART.find(a => a.id === id);
  if (type === "notebook") return NOTEBOOKS.find(n => n.id === id);
  return null;
}

function addToCart(type, id, variant, qty) {
  const cart = getCart();
  const key = `${type}:${id}:${variant || ""}`;
  const line = cart.find(l => l.key === key);
  if (line) line.qty += qty || 1;
  else cart.push({ key, type, id, variant: variant || "", qty: qty || 1 });
  saveCart(cart);
  toast("Added to cart");
  openCart();
}

function bumpQty(key, delta) {
  let cart = getCart();
  const line = cart.find(l => l.key === key);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter(l => l.key !== key);
  saveCart(cart);
}

function renderCart() {
  const cart = getCart();
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
  const box = document.getElementById("cart-items");
  const foot = document.getElementById("cart-footer");
  if (!box || !foot) return;
  if (!cart.length) {
    box.innerHTML = `<div class="cart-empty">Your wrist is unaccompanied.<br>That's fixable.</div>`;
    foot.innerHTML = `<a class="btn" href="straps.html" style="justify-content:center">Browse straps</a>`;
    return;
  }
  let total = 0;
  box.innerHTML = cart.map(l => {
    const item = findItem(l.type, l.id);
    if (!item) return "";
    const price = item.price * l.qty;
    total += price;
    const swatch = l.type === "strap" ? item.hex : (item.palette ? item.palette[0] : "#2A241B");
    const name = item.name || item.title || item.short;
    const sub = l.type === "strap" ? `${l.variant === 12 || l.variant === "12" ? "fitted" : l.variant + "mm"} · ${item.material}` : (item.size || item.detail || "");
    return `<div class="cart-item">
      <div class="ci-swatch" style="background:${swatch}"></div>
      <div class="ci-info">
        <div class="ci-name">${l.type === "art" ? item.short : name}</div>
        <div class="ci-sub">${sub}</div>
        <div class="ci-qty">
          <button onclick="bumpQty('${l.key}',-1)" aria-label="Decrease">−</button>
          <span>${l.qty}</span>
          <button onclick="bumpQty('${l.key}',1)" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="ci-price">${inr(price)}</div>
    </div>`;
  }).join("");
  foot.innerHTML = `
    <div class="total-row"><span>Subtotal</span><span>${inr(total)}</span></div>
    <button class="btn brass" onclick="toast('Prototype: Razorpay checkout wires in at launch')">Checkout</button>
    <p class="note">Free shipping across India above ₹3,000 · COD available at launch</p>`;
}

function openCart() { document.body.classList.add("cart-open"); }
function closeCart() { document.body.classList.remove("cart-open"); }

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------------- shared render utils ---------------- */

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = s => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * f)));
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}

// per-texture strap surface detail, drawn inside x:[x0,x1] y:[y0,y1]
function texDetail(s, x0, x1, y0, y1) {
  const w = x1 - x0, h = y1 - y0, cx = (x0 + x1) / 2;
  const dark = shade(s.hex, 0.7), light = shade(s.hex, 1.25);
  let t = "";
  if (s.tex === "leather") {
    for (let i = 1; i < 6; i++) t += `<path d="M ${x0 + 4} ${y0 + i * h / 6} Q ${cx} ${y0 + i * h / 6 + 3} ${x1 - 4} ${y0 + i * h / 6}" stroke="${dark}" stroke-width="0.8" fill="none" opacity="0.4"/>`;
    t += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="${light}" opacity="0.08"/>`;
  } else if (s.tex === "suede") {
    for (let i = 0; i < 40; i++) {
      const px = x0 + 3 + ((i * 37) % (w - 6)), py = y0 + 3 + ((i * 53) % (h - 6));
      t += `<circle cx="${px}" cy="${py}" r="0.9" fill="${i % 2 ? dark : light}" opacity="0.3"/>`;
    }
  } else if (s.tex === "croc") {
    const rows = Math.floor(h / 14), cols = 3;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const rw = (w - 10) / cols;
      t += `<rect x="${x0 + 5 + c * rw + (r % 2 ? rw / 3 : 0)}" y="${y0 + 4 + r * 14}" width="${rw - 3}" height="11" rx="4" fill="${light}" opacity="0.14" stroke="${dark}" stroke-width="0.7"/>`;
    }
  } else if (s.tex === "perf") {
    const rows = Math.floor(h / 13);
    for (let r = 1; r < rows; r++) for (let c = 0; c < 3; c++)
      t += `<circle cx="${x0 + w * 0.28 + c * w * 0.22}" cy="${y0 + r * 13}" r="2.3" fill="${dark}" opacity="0.9"/>`;
  } else if (s.tex === "rivet") {
    for (let i = 1; i < 6; i++) t += `<line x1="${x0 + 4}" y1="${y0 + i * h / 6}" x2="${x1 - 4}" y2="${y0 + i * h / 6}" stroke="${dark}" stroke-width="0.8" opacity="0.35"/>`;
    t += `<circle cx="${x0 + w * 0.3}" cy="${y0 + 12}" r="3.2" fill="${light}" stroke="${dark}" stroke-width="1"/>
          <circle cx="${x0 + w * 0.7}" cy="${y0 + 12}" r="3.2" fill="${light}" stroke="${dark}" stroke-width="1"/>`;
  } else if (s.tex === "tropic") {
    for (let yy = y0 + 4; yy < y1 - 3; yy += 7) for (let xx = x0 + 4; xx < x1 - 5; xx += 7)
      t += `<rect x="${xx}" y="${yy}" width="4.5" height="4.5" rx="1.4" fill="none" stroke="${dark}" stroke-width="0.9" opacity="0.7"/>`;
  } else if (s.tex === "fkm") {
    for (let i = 1; i < Math.floor(h / 9); i++) t += `<line x1="${x0 + 3}" y1="${y0 + i * 9}" x2="${x1 - 3}" y2="${y0 + i * 9}" stroke="${dark}" stroke-width="2.6" opacity="0.55" stroke-linecap="round"/>`;
  } else if (s.tex === "sail") {
    for (let i = 0; i < Math.floor(h / 4); i++) t += `<line x1="${x0}" y1="${y0 + i * 4}" x2="${x1}" y2="${y0 + i * 4}" stroke="${light}" stroke-width="0.7" opacity="0.35"/>`;
    for (let i = 0; i < Math.floor(w / 4); i++) t += `<line x1="${x0 + i * 4}" y1="${y0}" x2="${x0 + i * 4}" y2="${y1}" stroke="${dark}" stroke-width="0.5" opacity="0.25"/>`;
  } else if (s.tex === "nato") {
    const st = s.stripes || [s.hex];
    const bw = w / st.length;
    st.forEach((c, i) => { t += `<rect x="${x0 + i * bw}" y="${y0}" width="${bw}" height="${h}" fill="${c}"/>`; });
    for (let i = 1; i < Math.floor(h / 5); i++) t += `<line x1="${x0}" y1="${y0 + i * 5}" x2="${x1}" y2="${y0 + i * 5}" stroke="#000" stroke-width="0.4" opacity="0.12"/>`;
  } else if (s.tex === "canvas") {
    for (let yy = y0; yy < y1; yy += 5) for (let xx = x0; xx < x1; xx += 5)
      t += `<rect x="${xx}" y="${yy}" width="2.5" height="2.5" fill="${(xx + yy) % 10 ? light : dark}" opacity="0.15"/>`;
  }
  return t;
}

function stitchLines(s, x0, x1, y0, y1) {
  if (["nato", "fkm", "tropic"].includes(s.tex)) return "";
  return `<line x1="${x0 + 5}" y1="${y0 + 4}" x2="${x0 + 5}" y2="${y1 - 4}" stroke="${s.stitch}" stroke-width="1.6" stroke-dasharray="5 4"/>
          <line x1="${x1 - 5}" y1="${y0 + 4}" x2="${x1 - 5}" y2="${y1 - 4}" stroke="${s.stitch}" stroke-width="1.6" stroke-dasharray="5 4"/>`;
}

/* ---------------- strap product art ---------------- */

function strapSVG(s, big) {
  const w = big ? 560 : 400, h = big ? 420 : 300;
  const cx = w / 2, sw = big ? 96 : 72;
  const x0 = cx - sw / 2, x1 = cx + sw / 2;
  const yTop = h * 0.14, yBot = h * 0.84;
  const dark = shade(s.hex, 0.7);
  const taperNarrow = s.taper === "straight" || s.end !== "straight" ? sw : sw * 0.8;
  let endTop = "", body = "", hw = "";
  if (s.end === "curved") {
    endTop = `<path d="M ${x0 - 6} ${yTop + 10} Q ${cx} ${yTop - 14} ${x1 + 6} ${yTop + 10} L ${x1} ${yTop + 26} Q ${cx} ${yTop + 8} ${x0} ${yTop + 26} Z" fill="${dark}"/>`;
    body = `<path d="M ${x0} ${yTop + 22} Q ${cx} ${yTop + 4} ${x1} ${yTop + 22} L ${x1} ${yBot - 6} Q ${cx} ${yBot + 8} ${x0} ${yBot - 6} Z" fill="${s.hex}"/>`;
    hw = `<text x="${cx}" y="${h - 12}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="10" letter-spacing="2.5" fill="#988D79">FITTED CURVED END</text>`;
  } else if (s.end === "integrated") {
    body = `<path d="M ${x0 - 14} ${yTop} L ${x1 + 14} ${yTop} L ${x1} ${yTop + 34} L ${x1} ${yBot - 6} Q ${cx} ${yBot + 8} ${x0} ${yBot - 6} L ${x0} ${yTop + 34} Z" fill="${s.hex}"/>`;
    hw = `<text x="${cx}" y="${h - 12}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="10" letter-spacing="2.5" fill="#988D79">INTEGRATED FIT</text>`;
  } else {
    body = `<path d="M ${x0} ${yTop} L ${x1} ${yTop} L ${cx + taperNarrow / 2} ${yBot - 6} Q ${cx} ${yBot + 8} ${cx - taperNarrow / 2} ${yBot - 6} Z" fill="${s.hex}"/>`;
    hw = s.tex === "nato"
      ? `<rect x="${x0 - 5}" y="${yTop + 26}" width="${sw + 10}" height="7" rx="3.5" fill="#B0A895"/>
         <rect x="${x0 - 5}" y="${h * 0.52}" width="${sw + 10}" height="7" rx="3.5" fill="#B0A895"/>`
      : `<rect x="${x0 - 7}" y="${yTop - 6}" width="${sw + 14}" height="9" rx="4.5" fill="#B0A895"/>
         <rect x="${cx - taperNarrow / 2 - 6}" y="${yBot - 8}" width="${taperNarrow + 12}" height="8" rx="4" fill="#B0A895"/>`;
  }
  const keeper = ["nato"].includes(s.tex) ? "" : `<rect x="${x0 - 3}" y="${h * 0.33}" width="${sw + 6}" height="11" rx="4" fill="${dark}"/>`;
  const holes = ["leather", "suede", "croc", "perf", "rivet"].includes(s.tex) && s.end === "straight"
    ? [0.62, 0.69, 0.76].map(f => `<circle cx="${cx}" cy="${h * f}" r="3" fill="${shade(s.hex, 0.45)}"/>`).join("") : "";
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${s.name} strap">
    <rect width="${w}" height="${h}" fill="#EAE2CF"/>
    <ellipse cx="${cx}" cy="${h * 0.9}" rx="${sw * 1.35}" ry="9" fill="#2A241B" opacity="0.08"/>
    ${endTop}${body}
    ${texDetail(s, x0, x1, yTop + 8, yBot - 12)}
    ${stitchLines(s, x0, x1, yTop + 6, yBot - 10)}
    ${keeper}${holes}${hw}
  </svg>`;
}

/* ---------------- watch + strap composite ---------------- */

function watchSVG(w, s, big) {
  const W = big ? 480 : 400, H = big ? 540 : 430;
  const cx = W / 2, cy = H * 0.5;
  const R = big ? 92 : 76;
  const r = w.render || { shape: "diver", dial: "#17181C", bezel: "#17181C", case: "#A9A296" };
  const acc = r.accent || "#EDE6D2";
  const sw = R * 0.78;
  const x0 = cx - sw / 2, x1 = cx + sw / 2;
  const strapTop = s ? `
    ${s.end === "integrated" || r.shape === "integrated"
      ? `<path d="M ${cx - R * 0.72} ${cy - R * 0.86} L ${cx + R * 0.72} ${cy - R * 0.86} L ${cx + R * 0.5} 6 L ${cx - R * 0.5} 6 Z" fill="${s.hex}" transform="rotate(180 ${cx} ${(cy - R * 0.86 + 6) / 2})"/>`
      : s.end === "curved"
        ? `<path d="M ${x0} 8 L ${x1} 8 L ${x1} ${cy - R - 12} Q ${cx} ${cy - R + 2} ${x0} ${cy - R - 12} Z" fill="${s.hex}"/>`
        : `<rect x="${x0}" y="8" width="${sw}" height="${cy - R - 16}" rx="8" fill="${s.hex}"/>`}
    ${texDetail(s, x0, x1, 14, cy - R - 22)}
    ${stitchLines(s, x0, x1, 12, cy - R - 20)}` : "";
  const strapBot = s ? `
    ${s.end === "integrated" || r.shape === "integrated"
      ? `<path d="M ${cx - R * 0.72} ${cy + R * 0.86} L ${cx + R * 0.72} ${cy + R * 0.86} L ${cx + R * 0.5} ${H - 6} L ${cx - R * 0.5} ${H - 6} Z" fill="${s.hex}"/>`
      : s.end === "curved"
        ? `<path d="M ${x0} ${H - 8} L ${x1} ${H - 8} L ${x1} ${cy + R + 12} Q ${cx} ${cy + R - 2} ${x0} ${cy + R + 12} Z" fill="${s.hex}"/>`
        : `<rect x="${x0}" y="${cy + R + 8}" width="${sw}" height="${H - cy - R - 16}" rx="8" fill="${s.hex}"/>`}
    ${texDetail(s, x0, x1, cy + R + 14, H - 14)}
    ${stitchLines(s, x0, x1, cy + R + 12, H - 12)}` : "";
  const lugs = ["diver", "chrono", "pilot", "dress"].includes(r.shape) ? `
    <rect x="${cx - R * 0.62}" y="${cy - R - 14}" width="13" height="22" rx="4" fill="${r.case}"/>
    <rect x="${cx + R * 0.62 - 13}" y="${cy - R - 14}" width="13" height="22" rx="4" fill="${r.case}"/>
    <rect x="${cx - R * 0.62}" y="${cy + R - 8}" width="13" height="22" rx="4" fill="${r.case}"/>
    <rect x="${cx + R * 0.62 - 13}" y="${cy + R - 8}" width="13" height="22" rx="4" fill="${r.case}"/>` : "";
  let head = "";
  const idx = n => Array.from({ length: n }, (_, i) => {
    const a = i * 2 * Math.PI / n;
    const r1 = R * 0.52, r2 = R * 0.62;
    return `<line x1="${cx + r1 * Math.sin(a)}" y1="${cy - r1 * Math.cos(a)}" x2="${cx + r2 * Math.sin(a)}" y2="${cy - r2 * Math.cos(a)}" stroke="${acc}" stroke-width="${i % 3 === 0 ? 3 : 1.6}"/>`;
  }).join("");
  const hands = `
    <line x1="${cx}" y1="${cy}" x2="${cx - R * 0.34 * 0.824}" y2="${cy - R * 0.34 * 0.567}" stroke="${acc}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${cx + R * 0.5 * 0.809}" y2="${cy - R * 0.5 * 0.588}" stroke="${acc}" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#C4562A"/>`;
  const crown = `<rect x="${cx + R * 0.98}" y="${cy - 7}" width="11" height="14" rx="4" fill="${r.case}"/>`;
  if (r.shape === "diver") {
    const bez = Array.from({ length: 12 }, (_, i) => {
      const a = i * Math.PI / 6;
      return `<line x1="${cx + R * 0.8 * Math.sin(a)}" y1="${cy - R * 0.8 * Math.cos(a)}" x2="${cx + R * 0.92 * Math.sin(a)}" y2="${cy - R * 0.92 * Math.cos(a)}" stroke="#DDD4C0" stroke-width="2"/>`;
    }).join("");
    head = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${r.case}"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.96}" fill="${r.bezel}"/>${bez}
      <path d="M ${cx - 5} ${cy - R * 0.94} L ${cx + 5} ${cy - R * 0.94} L ${cx} ${cy - R * 0.8} Z" fill="#DDD4C0"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.68}" fill="${r.dial}"/>${idx(12)}${hands}${crown}`;
  } else if (r.shape === "chrono") {
    const sub = [[-0.36, 0], [0.36, 0], [0, 0.4]].map(([dx, dy]) =>
      `<circle cx="${cx + dx * R}" cy="${cy + dy * R}" r="${R * 0.16}" fill="${shade(r.dial, r.dial === "#F0EDE6" ? 0.3 : 1.9)}" opacity="0.9"/>`).join("");
    const tach = Array.from({ length: 24 }, (_, i) => {
      const a = i * Math.PI / 12;
      return `<line x1="${cx + R * 0.86 * Math.sin(a)}" y1="${cy - R * 0.86 * Math.cos(a)}" x2="${cx + R * 0.93 * Math.sin(a)}" y2="${cy - R * 0.93 * Math.cos(a)}" stroke="#DDD4C0" stroke-width="1"/>`;
    }).join("");
    head = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${r.case}"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.95}" fill="${r.bezel}"/>${tach}
      <circle cx="${cx}" cy="${cy}" r="${R * 0.72}" fill="${r.dial}"/>${idx(12)}${sub}${hands}
      <rect x="${cx + R * 0.9}" y="${cy - R * 0.42}" width="9" height="13" rx="3" fill="${r.case}"/>
      <rect x="${cx + R * 0.9}" y="${cy + R * 0.29}" width="9" height="13" rx="3" fill="${r.case}"/>${crown}`;
  } else if (r.shape === "pilot") {
    head = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${r.case}"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.82}" fill="${r.dial}"/>
      <path d="M ${cx - 6} ${cy - R * 0.6} L ${cx + 6} ${cy - R * 0.6} L ${cx} ${cy - R * 0.44} Z" fill="${acc}"/>
      <circle cx="${cx - 9}" cy="${cy - R * 0.56}" r="2.5" fill="${acc}"/><circle cx="${cx + 9}" cy="${cy - R * 0.56}" r="2.5" fill="${acc}"/>
      ${idx(12)}${hands}${crown}`;
  } else if (r.shape === "dress") {
    head = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${r.case}"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.88}" fill="${r.dial}"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${cx + R * 0.72 * Math.sin(a)}" y1="${cy - R * 0.72 * Math.cos(a)}" x2="${cx + R * 0.8 * Math.sin(a)}" y2="${cy - R * 0.8 * Math.cos(a)}" stroke="${r.accent || "#6C6252"}" stroke-width="${i % 3 === 0 ? 2.5 : 1.2}"/>`; }).join("")}
      <line x1="${cx}" y1="${cy}" x2="${cx - R * 0.38 * 0.824}" y2="${cy - R * 0.38 * 0.567}" stroke="${r.accent || "#2A241B"}" stroke-width="3.4" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${cx + R * 0.56 * 0.809}" y2="${cy - R * 0.56 * 0.588}" stroke="${r.accent || "#2A241B"}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="2.6" fill="#C4562A"/>${crown}`;
  } else if (r.shape === "square") {
    const sq = R * 0.9;
    const screws = [[-0.6, -0.95], [0.6, -0.95], [-0.6, 0.95], [0.6, 0.95], [-0.95, -0.6], [0.95, -0.6], [-0.95, 0.6], [0.95, 0.6]]
      .map(([fx, fy]) => `<circle cx="${cx + fx * sq * 0.8}" cy="${cy + fy * sq * 0.8}" r="2.4" fill="#7E7668"/>`).join("");
    head = `<rect x="${cx - sq}" y="${cy - sq}" width="${sq * 2}" height="${sq * 2}" rx="${sq * 0.28}" fill="${r.case}"/>
      ${screws}
      <rect x="${cx - sq * 0.68}" y="${cy - sq * 0.68}" width="${sq * 1.36}" height="${sq * 1.36}" rx="${sq * 0.12}" fill="${r.dial}"/>
      ${[[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]].map(([fx, fy]) => `<line x1="${cx + fx * sq}" y1="${cy + fy * sq * 0.62}" x2="${cx + fx * sq}" y2="${cy + fy * sq * 0.52}" stroke="${acc}" stroke-width="2"/>`).join("")}
      ${hands}${crown}`;
  } else if (r.shape === "rect") {
    const rw = R * 0.72, rh = R * 1.18;
    const ribs = [-1, 1].map(sgn => `
      <line x1="${cx - rw}" y1="${cy + sgn * (rh - 8)}" x2="${cx + rw}" y2="${cy + sgn * (rh - 8)}" stroke="#7E7668" stroke-width="2.5"/>
      <line x1="${cx - rw}" y1="${cy + sgn * (rh - 15)}" x2="${cx + rw}" y2="${cy + sgn * (rh - 15)}" stroke="#7E7668" stroke-width="2"/>`).join("");
    head = `<rect x="${cx - rw}" y="${cy - rh}" width="${rw * 2}" height="${rh * 2}" rx="10" fill="${r.case}"/>${ribs}
      <rect x="${cx - rw * 0.72}" y="${cy - rh * 0.62}" width="${rw * 1.44}" height="${rh * 1.24}" rx="6" fill="${r.dial}"/>
      ${[0.35, 0, -0.35].map(f => `<line x1="${cx - rw * 0.5}" y1="${cy + f * rh}" x2="${cx - rw * 0.28}" y2="${cy + f * rh}" stroke="${r.accent || "#2A241B"}" stroke-width="1.6"/>`).join("")}
      <line x1="${cx}" y1="${cy}" x2="${cx - 14}" y2="${cy - 10}" stroke="${r.accent || "#2A241B"}" stroke-width="3" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${cx + 16}" y2="${cy - 12}" stroke="${r.accent || "#2A241B"}" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="2.4" fill="#C4562A"/>`;
  } else if (r.shape === "cushion") {
    const cs = R * 1.02;
    head = `<rect x="${cx - cs}" y="${cy - cs}" width="${cs * 2}" height="${cs * 2}" rx="${cs * 0.44}" fill="${r.case}"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.74}" fill="${r.dial}"/>
      ${[0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map(a => `<line x1="${cx + R * 0.5 * Math.sin(a)}" y1="${cy - R * 0.5 * Math.cos(a)}" x2="${cx + R * 0.62 * Math.sin(a)}" y2="${cy - R * 0.62 * Math.cos(a)}" stroke="${acc}" stroke-width="3.4"/>`).join("")}
      ${hands}
      <path d="M ${cx + cs} ${cy - 16} Q ${cx + cs + 16} ${cy} ${cx + cs} ${cy + 16}" fill="none" stroke="${r.case}" stroke-width="7"/>`;
  } else if (r.shape === "integrated") {
    const iw = R * 1.02;
    head = `<path d="M ${cx - iw} ${cy - R * 0.62} Q ${cx - iw - 6} ${cy} ${cx - iw} ${cy + R * 0.62} L ${cx - R * 0.74} ${cy + R * 0.92} L ${cx + R * 0.74} ${cy + R * 0.92} L ${cx + iw} ${cy + R * 0.62} Q ${cx + iw + 6} ${cy} ${cx + iw} ${cy - R * 0.62} L ${cx + R * 0.74} ${cy - R * 0.92} L ${cx - R * 0.74} ${cy - R * 0.92} Z" fill="${r.case}"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.66}" fill="${r.dial}"/>
      ${(() => { let g = ""; for (let yy = -3; yy <= 3; yy++) for (let xx = -3; xx <= 3; xx++) { if (xx * xx + yy * yy <= 9) g += `<rect x="${cx + xx * R * 0.16 - 2.5}" y="${cy + yy * R * 0.16 - 2.5}" width="5" height="5" fill="${shade(r.dial, 0.82)}"/>`; } return g; })()}
      ${idx(12)}${hands}${crown}`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${w.brand} ${w.model}${s ? " on the " + s.name + " strap" : ""}">
    <rect width="${W}" height="${H}" fill="#EAE2CF"/>
    <circle cx="${cx}" cy="${cy}" r="${R * 1.6}" fill="none" stroke="#DDD4C0" stroke-width="1"/>
    ${strapTop}${strapBot}${lugs}${head}
  </svg>`;
}

/* ---------------- artwork (framed prints) ---------------- */

function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (((n >> 16) & 255) + ((n >> 8) & 255) + (n & 255)) / 3;
}

function adWatchHead(cx, cy, R, fg, dial, mode) {
  const line = mode === "line";
  const fill = line ? "none" : dial;
  const caseF = line ? "none" : fg;
  const hc = line ? fg : (lum(dial) > 140 ? "#2A241B" : (lum(fg) > 140 ? fg : "#EDE6D2"));
  const swm = line ? 2.4 : 0;
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = i * Math.PI / 6;
    return `<line x1="${cx + R * 0.66 * Math.sin(a)}" y1="${cy - R * 0.66 * Math.cos(a)}" x2="${cx + R * 0.8 * Math.sin(a)}" y2="${cy - R * 0.8 * Math.cos(a)}" stroke="${hc}" stroke-width="${i % 3 === 0 ? 3 : 1.5}"/>`;
  }).join("");
  return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${caseF}" stroke="${fg}" stroke-width="${line ? swm : 0}"/>
    <circle cx="${cx}" cy="${cy}" r="${R * 0.86}" fill="${fill}" stroke="${fg}" stroke-width="${line ? 1.8 : 0}"/>
    ${ticks}
    <line x1="${cx}" y1="${cy}" x2="${cx - R * 0.42 * 0.824}" y2="${cy - R * 0.42 * 0.567}" stroke="${hc}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${cx + R * 0.62 * 0.809}" y2="${cy - R * 0.62 * 0.588}" stroke="${hc}" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="${hc}"/>`;
}

function artSVG(a, big) {
  const w = 400, h = big ? 500 : 400;
  const [bg, fg, ac] = a.palette;
  const uid = a.id + (big ? "b" : "s");
  const cy = h * 0.5;
  let scene = "", defs = "";
  if (a.series === "archive") {
    defs = `<radialGradient id="sp-${uid}" cx="50%" cy="38%" r="80%">
        <stop offset="0%" stop-color="${shade(bg, 3.2)}"/><stop offset="100%" stop-color="${bg}"/>
      </radialGradient>
      <pattern id="ht-${uid}" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="0.9" fill="${fg}" opacity="0.1"/></pattern>`;
    const head = a.title.split("—")[0].trim().toUpperCase();
    const words = head.split(" ");
    const mid = Math.ceil(words.length / 2);
    const l1 = words.slice(0, mid).join(" "), l2 = words.slice(mid).join(" ");
    const brandLine = (a.title.split("—")[1] || "").trim().toUpperCase();
    if (a.id === "art-crack" || a.id === "art-polo") {
      const paper = bg;
      const motif = a.id === "art-crack"
        ? `<rect x="150" y="${cy - 62}" width="100" height="100" rx="24" fill="none" stroke="${fg}" stroke-width="3.2"/>
           <rect x="168" y="${cy - 44}" width="64" height="64" rx="10" fill="none" stroke="${fg}" stroke-width="2.2"/>
           <line x1="200" y1="${cy - 12}" x2="186" y2="${cy - 28}" stroke="${fg}" stroke-width="2.6" stroke-linecap="round"/>
           <line x1="200" y1="${cy - 12}" x2="216" y2="${cy - 20}" stroke="${fg}" stroke-width="2" stroke-linecap="round"/>
           <path d="M 120 ${cy + 62} Q 200 ${cy + 48} 280 ${cy + 62}" stroke="${ac}" stroke-width="5" fill="none" stroke-linecap="round"/>
           <path d="M 60 ${h * 0.24} L 340 ${h * 0.2}" stroke="${ac}" stroke-width="2" opacity="0.6"/>`
        : `<path d="M 150 ${cy + 40} Q 148 ${cy - 30} 186 ${cy - 52} Q 204 ${cy - 62} 212 ${cy - 46} Q 224 ${cy - 50} 228 ${cy - 38} Q 236 ${cy - 36} 232 ${cy - 26} L 210 ${cy - 22} Q 196 ${cy - 34} 188 ${cy - 22} L 184 ${cy + 40}" fill="none" stroke="${fg}" stroke-width="2.6" stroke-linecap="round"/>
           <circle cx="205" cy="${cy - 40}" r="2.2" fill="${fg}"/>
           <path d="M 158 ${cy - 44} Q 150 ${cy - 56} 160 ${cy - 64} M 166 ${cy - 50} Q 160 ${cy - 62} 170 ${cy - 68}" stroke="${fg}" stroke-width="2" fill="none" stroke-linecap="round"/>
           <g transform="rotate(-14 262 ${cy})"><rect x="244" y="${cy - 30}" width="36" height="60" rx="7" fill="none" stroke="${ac}" stroke-width="2.6"/><line x1="250" y1="${cy - 18}" x2="274" y2="${cy - 18}" stroke="${ac}" stroke-width="1.6"/><line x1="250" y1="${cy + 18}" x2="274" y2="${cy + 18}" stroke="${ac}" stroke-width="1.6"/></g>
           <g transform="rotate(10 262 ${cy})"><rect x="252" y="${cy - 22}" width="28" height="46" rx="6" fill="none" stroke="${fg}" stroke-width="1.8" stroke-dasharray="4 3"/></g>`;
      scene = `<rect x="26" y="26" width="${w - 52}" height="${h - 52}" fill="${paper}"/>
        <text x="200" y="62" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-weight="600" font-size="17" letter-spacing="1" fill="${fg}">${l1}</text>
        <text x="200" y="84" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-weight="600" font-size="17" letter-spacing="1" fill="${fg}">${l2}</text>
        ${motif}
        <text x="200" y="${h - 84}" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-style="italic" font-size="12" fill="${ac}">${brandLine.toLowerCase()}</text>
        <line x1="160" y1="${h - 68}" x2="240" y2="${h - 68}" stroke="${fg}" stroke-width="1"/>
        <text x="200" y="${h - 50}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="7.5" letter-spacing="2.5" fill="${fg}" opacity="0.7">ALUG ATELIER · UNLICENSED HOMAGE · EDITION OF 50</text>`;
    } else {
      let motif = "";
      if (a.id === "art-moonlanding") motif = `
        <polygon points="200,60 118,${h - 116} 282,${h - 116}" fill="${fg}" opacity="0.07"/>
        <ellipse cx="200" cy="${h - 128}" rx="128" ry="26" fill="${shade(bg, 2.6)}"/>
        <circle cx="132" cy="${h - 132}" r="9" fill="${bg}" opacity="0.85"/><circle cx="258" cy="${h - 126}" r="12" fill="${bg}" opacity="0.85"/><circle cx="196" cy="${h - 120}" r="6" fill="${bg}" opacity="0.7"/>
        ${adWatchHead(200, cy - 14, 56, fg, shade(bg, 1.6), "solid")}
        <rect x="182" y="${cy - 108}" width="36" height="34" rx="7" fill="${shade(fg, 0.55)}"/>
        <rect x="182" y="${cy + 44}" width="36" height="34" rx="7" fill="${shade(fg, 0.55)}"/>`;
      else if (a.id === "art-crown") motif = `
        ${[0.32, 0.44, 0.58].map(f => `<path d="M 60 ${h * f} Q 200 ${h * f - 16} 340 ${h * f}" stroke="${ac}" stroke-width="1.4" fill="none" opacity="0.5"/>`).join("")}
        ${adWatchHead(200, cy, 58, fg, shade(bg, 1.9), "solid")}
        <circle cx="200" cy="${cy}" r="72" fill="none" stroke="${ac}" stroke-width="1" opacity="0.6"/>
        <text x="200" y="${h - 116}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="9" letter-spacing="4" fill="${ac}">300M · NO VACANCY</text>`;
      else motif = `
        <rect width="${w}" height="${h}" x="26" y="26" fill="url(#ht-${uid})" opacity="0.9"/>
        ${adWatchHead(200, cy, 62, fg, shade(bg, 1.7), "solid")}
        ${[[-0.36, 0], [0.36, 0], [0, 0.42]].map(([dx, dy]) => `<circle cx="${200 + dx * 62}" cy="${cy + dy * 62}" r="10" fill="${shade(bg, 2.4)}"/>`).join("")}
        <rect x="180" y="${cy - 118}" width="40" height="40" rx="8" fill="${shade(fg, 0.5)}"/>
        <rect x="180" y="${cy + 78}" width="40" height="40" rx="8" fill="${shade(fg, 0.5)}"/>`;
      scene = `<rect x="26" y="26" width="${w - 52}" height="${h - 52}" fill="url(#sp-${uid})"/>
        ${motif}
        <text x="200" y="70" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-weight="600" font-size="18" letter-spacing="0.5" fill="${fg}">${l1}</text>
        <text x="200" y="93" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-weight="600" font-size="18" letter-spacing="0.5" fill="${fg}">${l2}</text>
        <text x="200" y="${h - 76}" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-weight="600" font-size="13" letter-spacing="2" fill="${fg}">${brandLine}</text>
        <text x="200" y="${h - 54}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="7.5" letter-spacing="2.5" fill="${fg}" opacity="0.6">ALUG ATELIER · UNLICENSED HOMAGE · EDITION OF 50</text>`;
    }
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${a.short} framed print">
      <defs>${defs}</defs>
      <rect width="${w}" height="${h}" fill="#EAE2CF"/>
      <rect x="10" y="10" width="${w - 20}" height="${h - 20}" fill="#2E2A24"/>
      ${scene}
    </svg>`;
  }
  // originals — warm vintage-paper template
  let motif = "";
  if (a.id === "art-rail") motif = `<circle cx="200" cy="${cy}" r="48" fill="#EFE6D2" stroke="${fg}" stroke-width="5"/>
    <circle cx="200" cy="${cy - 58}" r="9" fill="none" stroke="${fg}" stroke-width="4"/><rect x="192" y="${cy - 52}" width="16" height="8" rx="3" fill="${fg}"/>
    <line x1="200" y1="${cy}" x2="182" y2="${cy - 22}" stroke="${fg}" stroke-width="4" stroke-linecap="round"/>
    <line x1="200" y1="${cy}" x2="226" y2="${cy - 8}" stroke="${fg}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="200" cy="${cy}" r="4" fill="${ac}"/>
    <path d="M 246 ${cy - 40} Q 290 ${cy - 20} 296 ${cy + 34}" stroke="${ac}" stroke-width="2" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>`;
  else if (a.id === "art-bombay") motif = `
    ${[["62", h * 0.2, "86", h * 0.2, "62", h * 0.26], ["338", h * 0.2, "314", h * 0.2, "338", h * 0.26], ["62", h * 0.74, "86", h * 0.74, "62", h * 0.68], ["338", h * 0.74, "314", h * 0.74, "338", h * 0.68]].map(([x1, y1, x2, y2, x3, y3]) => `<path d="M ${x1} ${y1} L ${x2} ${y2} M ${x1} ${y1} L ${x3} ${y3}" stroke="${ac}" stroke-width="2.5" fill="none"/>`).join("")}
    ${adWatchHead(200, cy, 52, fg, "#F1EAD8", "solid")}
    <rect x="182" y="${cy - 100}" width="36" height="36" rx="7" fill="${fg}" opacity="0.9"/>
    <rect x="182" y="${cy + 64}" width="36" height="36" rx="7" fill="${fg}" opacity="0.9"/>`;
  else if (a.id === "art-springbar") motif = `
    <line x1="90" y1="${cy}" x2="310" y2="${cy}" stroke="${fg}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="84" cy="${cy}" r="6" fill="${ac}"/><circle cx="316" cy="${cy}" r="6" fill="${ac}"/>
    ${Array.from({ length: 9 }, (_, i) => `<line x1="${140 + i * 14}" y1="${cy - 6}" x2="${146 + i * 14}" y2="${cy + 6}" stroke="${ac}" stroke-width="1.6"/>`).join("")}
    <line x1="90" y1="${cy + 34}" x2="310" y2="${cy + 34}" stroke="${fg}" stroke-width="1"/>
    <line x1="90" y1="${cy + 28}" x2="90" y2="${cy + 40}" stroke="${fg}" stroke-width="1"/>
    <line x1="310" y1="${cy + 28}" x2="310" y2="${cy + 40}" stroke="${fg}" stroke-width="1"/>
    <text x="200" y="${cy + 52}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="9" letter-spacing="3" fill="${fg}" opacity="0.7">1.78MM · 316L · DOUBLE SHOULDER</text>
    <text x="200" y="${cy - 46}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="26" letter-spacing="0.5"><tspan fill="${ac}" font-weight="300">a</tspan><tspan fill="${fg}" font-weight="600">1u9</tspan></text>`;
  else motif = `<circle cx="200" cy="${cy}" r="62" fill="none" stroke="${fg}" stroke-width="3"/>
    ${Array.from({ length: 12 }, (_, i) => { const ang = i * Math.PI / 6; return `<circle cx="${200 + 50 * Math.sin(ang)}" cy="${cy - 50 * Math.cos(ang)}" r="${i % 3 === 0 ? 6 : 3}" fill="${fg}"/>`; }).join("")}
    <line x1="200" y1="${cy}" x2="178" y2="${cy - 26}" stroke="${fg}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="200" y1="${cy}" x2="232" y2="${cy - 16}" stroke="${fg}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="200" cy="${cy}" r="4" fill="${ac}"/>`;
  const head2 = a.title.split("—");
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${a.short} framed print">
    <rect width="${w}" height="${h}" fill="#EAE2CF"/>
    <rect x="10" y="10" width="${w - 20}" height="${h - 20}" fill="#4A3F30"/>
    <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="#F6F0E2"/>
    <rect x="38" y="38" width="${w - 76}" height="${h - 76}" fill="${bg}"/>
    <text x="200" y="66" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="8.5" letter-spacing="3" fill="${ac}">${a.styleTag.toUpperCase()}</text>
    <text x="200" y="94" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="20" font-style="italic" fill="${fg}">${head2[0].trim()}</text>
    ${head2[1] ? `<text x="200" y="112" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="9" letter-spacing="2.5" fill="${ac}">${head2[1].trim().toUpperCase()}</text>` : ""}
    ${motif}
    <line x1="150" y1="${h - 78}" x2="250" y2="${h - 78}" stroke="${ac}" stroke-width="1"/>
    <text x="200" y="${h - 58}" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="8.5" letter-spacing="2.5" fill="${ac}">ALUG ATELIER · ORIGINAL · EDITION OF 50</text>
  </svg>`;
}

function notebookSVG(nb) {
  const [bg, ac] = nb.palette;
  return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${nb.title} notebook">
    <rect width="400" height="300" fill="#EAE2CF"/>
    <rect x="120" y="40" width="170" height="220" rx="8" fill="${bg}"/>
    <rect x="120" y="40" width="18" height="220" rx="6" fill="${ac}" opacity="0.85"/>
    <text x="215" y="150" text-anchor="middle" font-family="Inter Tight,sans-serif" font-weight="600" font-size="15" fill="${ac}">${nb.title}</text>
    <text x="215" y="172" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="9" letter-spacing="2" fill="${ac}" opacity="0.8">ALUG PAPER GOODS</text>
  </svg>`;
}

function heroWatchSVG() {
  const idx = Array.from({ length: 12 }, (_, i) => {
    const a = i * Math.PI / 6;
    const r1 = i % 3 === 0 ? 58 : 61, sw = i % 3 === 0 ? 5 : 3;
    return `<line x1="${190 + r1 * Math.sin(a)}" y1="${280 - r1 * Math.cos(a)}" x2="${190 + 70 * Math.sin(a)}" y2="${280 - 70 * Math.cos(a)}" stroke="#2A241B" stroke-width="${sw}"/>`;
  }).join("");
  const bez = Array.from({ length: 12 }, (_, i) => {
    const a = i * Math.PI / 6;
    return `<line x1="${190 + 84 * Math.sin(a)}" y1="${280 - 84 * Math.cos(a)}" x2="${190 + 91 * Math.sin(a)}" y2="${280 - 91 * Math.cos(a)}" stroke="#EFE7D4" stroke-width="2.5"/>`;
  }).join("");
  return `<svg viewBox="0 0 380 570" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mechanical watch on a chestnut alug strap, hands at ten past ten">
    <circle cx="190" cy="280" r="172" fill="none" stroke="#DDD4C0" stroke-width="1"/>
    <ellipse cx="190" cy="556" rx="86" ry="8" fill="#2A241B" opacity="0.08"/>
    <rect x="154" y="-8" width="72" height="160" rx="10" fill="#8B5A2B"/>
    <line x1="161" y1="8" x2="161" y2="146" stroke="#EDE3D0" stroke-width="1.6" stroke-dasharray="5 4"/>
    <line x1="219" y1="8" x2="219" y2="146" stroke="#EDE3D0" stroke-width="1.6" stroke-dasharray="5 4"/>
    <rect x="150" y="58" width="80" height="14" rx="5" fill="#6E4522"/>
    <rect x="142" y="150" width="18" height="28" rx="5" fill="#8F887A"/>
    <rect x="220" y="150" width="18" height="28" rx="5" fill="#8F887A"/>
    <line x1="152" y1="158" x2="228" y2="158" stroke="#C8BCA2" stroke-width="3"/>
    <circle cx="148" cy="158" r="3" fill="#C4562A"/>
    <circle cx="232" cy="158" r="3" fill="#C4562A"/>
    <circle cx="190" cy="280" r="105" fill="#A29A88"/>
    <circle cx="190" cy="280" r="96" fill="#24423A"/>
    ${bez}
    <path d="M 184 190 L 196 190 L 190 200 Z" fill="#EFE7D4"/>
    <circle cx="190" cy="280" r="78" fill="#F3EDE1"/>
    <circle cx="190" cy="280" r="71" fill="none" stroke="#C8BCA2" stroke-width="1" stroke-dasharray="1.5 3.5"/>
    ${idx}
    <text x="190" y="252" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="13" letter-spacing="0.5"><tspan fill="#C4562A" font-weight="300">a</tspan><tspan fill="#2A241B" font-weight="600">1u9</tspan></text>
    <text x="190" y="322" text-anchor="middle" font-family="Inter Tight,sans-serif" font-size="7.5" letter-spacing="2" fill="#6C6252">HAND-WOUND · 21 JEWELS</text>
    <g id="hero-hour-hand" transform="rotate(0 190 280)">
      <line x1="190" y1="280" x2="190" y2="238" stroke="#2A241B" stroke-width="7" stroke-linecap="round"/>
    </g>
    <g id="hero-minute-hand" transform="rotate(0 190 280)">
      <line x1="190" y1="280" x2="190" y2="216" stroke="#2A241B" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g id="hero-second-hand" transform="rotate(0 190 280)">
      <line x1="190" y1="298" x2="190" y2="210" stroke="#C4562A" stroke-width="2" stroke-linecap="round"/>
      <circle cx="190" cy="298" r="4" fill="#C4562A"/>
    </g>
    <circle cx="190" cy="280" r="5.5" fill="#2A241B"/>
    <circle cx="190" cy="280" r="2.5" fill="#C4562A"/>
    <rect x="294" y="270" width="17" height="20" rx="5" fill="#A29A88"/>
    <line x1="299" y1="272" x2="299" y2="288" stroke="#7E7668" stroke-width="1.5"/>
    <line x1="304" y1="272" x2="304" y2="288" stroke="#7E7668" stroke-width="1.5"/>
    <rect x="142" y="382" width="18" height="28" rx="5" fill="#8F887A"/>
    <rect x="220" y="382" width="18" height="28" rx="5" fill="#8F887A"/>
    <line x1="152" y1="402" x2="228" y2="402" stroke="#C8BCA2" stroke-width="3"/>
    <circle cx="148" cy="402" r="3" fill="#C4562A"/>
    <circle cx="232" cy="402" r="3" fill="#C4562A"/>
    <path d="M 154 410 L 226 410 L 219 560 L 161 560 Z" fill="#8B5A2B"/>
    <line x1="162" y1="418" x2="167" y2="552" stroke="#EDE3D0" stroke-width="1.6" stroke-dasharray="5 4"/>
    <line x1="218" y1="418" x2="213" y2="552" stroke="#EDE3D0" stroke-width="1.6" stroke-dasharray="5 4"/>
    <circle cx="190" cy="474" r="4.5" fill="#5E3A1B"/>
    <circle cx="190" cy="500" r="4.5" fill="#5E3A1B"/>
    <circle cx="190" cy="526" r="4.5" fill="#5E3A1B"/>
  </svg>`;
}

/* ---------------- cards ---------------- */

const FAMILY_LABEL = { classic: "", curved: "curved end", prx: "PRX fit" };

function strapCard(s) {
  const widthPills = s.family === "prx"
    ? `<span class="pill">fitted</span>`
    : s.widths.map(w => `<span class="pill">${w}mm</span>`).join(" ");
  const tag = s.tag ? `<span class="pill brass tag-corner">${s.tag}</span>` : "";
  return `<a class="card" href="product.html?id=${s.id}">
    <div class="thumb">${tag}${strapSVG(s)}</div>
    <div class="body">
      <div class="name">${s.name}</div>
      <div class="sub">${s.material === "nato" ? "NATO / canvas" : s.material === "rubber" ? "rubber" : s.material} · ${s.colorName} · ${s.taper}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${widthPills}</div>
      <div class="price-row"><span class="price">${inr(s.price)}</span><span class="pill steel">quick release</span></div>
    </div>
  </a>`;
}

function watchCard(w) {
  const lugTxt = w.id === "prx" ? "integrated" : w.lug === 0 ? "proprietary" : w.lug + "mm";
  return `<div class="watch-card">
    <span class="brand">${w.brand}</span>
    <span class="model">${w.model}</span>
    <div class="specs">
      <span class="pill">${w.size}</span>
      <span class="pill ${w.lug === 21 || w.lug === 24 || w.lug === 0 ? "brass" : ""}">${lugTxt} lugs</span>
      <span class="pill steel">${w.badge}</span>
    </div>
    <p class="why">${w.why}</p>
    <div class="footer"><span class="price-band">${w.band}</span><a class="strap-link" href="watch.html?id=${w.id}">Curated for this watch →</a></div>
  </div>`;
}

function artCard(a) {
  return `<a class="card" href="artwork.html?id=${a.id}">
    <div class="thumb">${artSVG(a)}</div>
    <div class="body">
      <div class="name">${a.short}</div>
      <div class="sub">${a.series === "archive" ? "The archive, reimagined" : "alug original"} · ${a.styleTag}</div>
      <div class="price-row"><span class="price">${inr(a.price)}</span><span class="pill ${a.series === "archive" ? "brass" : "steel"}">${a.size}</span></div>
    </div>
  </a>`;
}

/* ---------------- pages ---------------- */

function initHome() {
  const ha = document.getElementById("hero-art");
  if (ha) ha.innerHTML = heroWatchSVG();
  // live watch time — smooth mechanical sweep
  const updateHeroHands = () => {
    const now = new Date();
    const ms = now.getMilliseconds();
    const s = now.getSeconds() + ms / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;

    const hh = document.getElementById("hero-hour-hand");
    const mh = document.getElementById("hero-minute-hand");
    const sh = document.getElementById("hero-second-hand");
    if (hh) hh.setAttribute("transform", `rotate(${h * 30} 190 280)`);
    if (mh) mh.setAttribute("transform", `rotate(${m * 6} 190 280)`);
    if (sh) sh.setAttribute("transform", `rotate(${s * 6} 190 280)`);

    requestAnimationFrame(updateHeroHands);
  };
  updateHeroHands();
  const featured = ["colaba-chestnut", "curve-sail-grey", "bond-stripe", "prx-rubber-black"].map(id => STRAPS.find(s => s.id === id));
  document.getElementById("featured-grid").innerHTML = featured.map(strapCard).join("");
  const picks = ["seamaster300", "speedmaster", "bb58", "hydroconquest", "prx", "spb143"].map(id => WATCHES.find(w => w.id === id));
  document.getElementById("watch-teaser").innerHTML = picks.map(watchCard).join("");
  document.getElementById("journal-teaser").innerHTML = ARTICLES.slice(0, 3).map(a => `
    <a class="article-card" href="article.html?id=${a.id}">
      <span class="ameta">${a.date} · ${a.minutes} min</span>
      <span class="atitle">${a.title}</span>
      <span class="adesc">${a.desc}</span>
    </a>`).join("");
  document.getElementById("art-teaser").innerHTML = ART.slice(0, 4).map(artCard).join("");
}

const FILTER_STATE = { lugs: new Set(), materials: new Set(), maxPrice: null, watch: null, family: null, sort: "featured" };

function initStraps() {
  if (qs.get("lug")) FILTER_STATE.lugs.add(Number(qs.get("lug")));
  if (qs.get("material")) FILTER_STATE.materials.add(qs.get("material"));
  if (qs.get("watch")) FILTER_STATE.watch = qs.get("watch");
  if (qs.get("tag")) FILTER_STATE.tag = qs.get("tag");
  if (qs.get("family")) FILTER_STATE.family = qs.get("family");
  buildFilters();
  applyFilters();
}

function buildFilters() {
  const fam = [["", "All"], ["classic", "Classic"], ["curved", "Curved end"], ["prx", "PRX fit"]];
  const famBox = document.getElementById("family-chips");
  if (famBox) famBox.innerHTML = fam.map(([v, l]) =>
    `<button class="chip ${(FILTER_STATE.family || "") === v ? "on" : ""}" onclick="setFamily('${v}')">${l}</button>`).join("");
  const lugs = [...new Set(STRAPS.filter(s => s.family !== "prx").flatMap(s => s.widths))].sort((a, b) => a - b);
  document.getElementById("lug-chips").innerHTML = lugs.map(l =>
    `<button class="chip ${FILTER_STATE.lugs.has(l) ? "on" : ""}" onclick="toggleLug(${l})">${l}mm</button>`).join("");
  const mats = [
    ["leather", "Leather"], ["suede", "Suede"], ["rubber", "Rubber (FKM & tropic)"],
    ["sailcloth", "Sailcloth"], ["nato", "NATO / canvas"]
  ];
  document.getElementById("mat-checks").innerHTML = mats.map(([v, l]) =>
    `<label><input type="checkbox" ${FILTER_STATE.materials.has(v) ? "checked" : ""} onchange="toggleMat('${v}')"> ${l}</label>`).join("");
}

function setFamily(f) { FILTER_STATE.family = f || null; buildFilters(); applyFilters(); }
function toggleLug(l) { FILTER_STATE.lugs.has(l) ? FILTER_STATE.lugs.delete(l) : FILTER_STATE.lugs.add(l); buildFilters(); applyFilters(); }
function toggleMat(m) { FILTER_STATE.materials.has(m) ? FILTER_STATE.materials.delete(m) : FILTER_STATE.materials.add(m); applyFilters(); }
function setMaxPrice(v) { FILTER_STATE.maxPrice = v ? Number(v) : null; applyFilters(); }
function setSort(v) { FILTER_STATE.sort = v; applyFilters(); }
function clearWatch() { FILTER_STATE.watch = null; FILTER_STATE.lugs.clear(); buildFilters(); applyFilters(); }

function strapFitsWatch(s, w) {
  if (s.fits) return s.fits.includes(w.id);
  if (w.lug === 0) return false;
  return s.widths.includes(w.lug) || s.pairs.includes(w.id);
}

function applyFilters() {
  let list = [...STRAPS];
  const st = FILTER_STATE;
  const note = document.getElementById("watch-note");
  if (st.watch) {
    const w = WATCHES.find(x => x.id === st.watch);
    if (w) {
      list = list.filter(s => strapFitsWatch(s, w));
      note.style.display = "flex";
      note.innerHTML = `<span>Straps that genuinely fit the <b>${w.brand} ${w.model}</b> — <a href="watch.html?id=${w.id}" style="text-decoration:underline">see its curated page</a></span>
        <button class="btn ghost sm" onclick="clearWatch()">Clear</button>`;
    }
  } else if (note) note.style.display = "none";
  if (st.family) list = list.filter(s => s.family === st.family);
  if (st.tag) list = list.filter(s => s.tag === st.tag);
  if (st.lugs.size) list = list.filter(s => s.widths.some(w => st.lugs.has(w)));
  if (st.materials.size) list = list.filter(s => st.materials.has(s.material));
  if (st.maxPrice) list = list.filter(s => s.price <= st.maxPrice);
  if (st.sort === "low") list.sort((a, b) => a.price - b.price);
  if (st.sort === "high") list.sort((a, b) => b.price - a.price);
  document.getElementById("strap-grid").innerHTML = list.length
    ? list.map(strapCard).join("")
    : `<div class="notice" style="grid-column:1/-1">Nothing fits that combination — loosen a filter. (If you need a width or fit we don't stock, write to us. Odd lugs are our love language.)</div>`;
  document.getElementById("result-count").textContent = `${list.length} strap${list.length === 1 ? "" : "s"}`;
}

function initWatches() {
  document.getElementById("watch-grid").innerHTML = WATCHES.map(watchCard).join("");
}

function initWatch() {
  const w = WATCHES.find(x => x.id === qs.get("id")) || WATCHES[0];
  document.title = `${w.brand} ${w.model} — curated by alug`;
  const heroStrap = STRAPS.find(s => s.id === (w.curation[0] && w.curation[0].strap)) || STRAPS[0];
  const lugTxt = w.id === "prx" ? "integrated case" : w.lug === 0 ? "proprietary fitting" : w.lug + "mm lug width";
  document.getElementById("watch-root").innerHTML = `
  <div class="crumbs"><a href="watches.html">Shop by watch</a> / ${w.brand} ${w.model}</div>
  <div class="pdp">
    <div class="visual">${watchSVG(w, heroStrap, true)}</div>
    <div>
      <p class="kicker">Curated for the wrist that wears one</p>
      <h1>${w.brand} ${w.model}</h1>
      <p class="blurb" style="margin-top:12px">${w.why}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 20px">
        <span class="pill">${w.size}</span><span class="pill brass">${lugTxt}</span><span class="pill">${w.movement}</span><span class="pill steel">${w.band}</span>
      </div>
      <h4 style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:var(--faint);margin-bottom:8px">Know your reference</h4>
      <table class="spec-table">
        ${w.variants.map(v => `<tr><td>${v.ref}</td><td>${v.note}</td></tr>`).join("")}
      </table>
      <p style="font-size:13px;color:var(--faint)">Pairings below are distilled from r/Watches, WatchUSeek and OmegaForums threads — and our own wrists. Your ${w.model.split(" ")[0]} above is wearing the first one.</p>
      <div style="margin-top:18px;display:flex;gap:12px;flex-wrap:wrap">
        ${w.lug > 0 ? `<a class="btn" href="straps.html?watch=${w.id}">Everything that fits →</a>` : ""}
        <a class="btn ghost" href="watches.html">All 21 watches</a>
      </div>
    </div>
  </div>
  <div class="section-tight">
    <p class="kicker">The alug prescription</p>
    <h2 style="margin-bottom:22px">Your ${w.model}, on our straps</h2>
    <div class="grid grid-3" id="curation-grid"></div>
  </div>`;
  document.getElementById("curation-grid").innerHTML = w.curation.map(c => {
    const s = STRAPS.find(x => x.id === c.strap);
    if (!s) return "";
    return `<div class="card">
      <a class="thumb" href="product.html?id=${s.id}">${watchSVG(w, s)}</a>
      <div class="body">
        <div class="name">${s.name}</div>
        <div class="sub">${c.why}</div>
        <div class="price-row"><span class="price">${inr(s.price)}</span>
          <span style="display:flex;gap:8px">
            <a class="btn ghost sm" href="product.html?id=${s.id}">Details</a>
            <button class="btn sm" onclick="addToCart('strap','${s.id}','${s.widths[0]}')">Add</button>
          </span>
        </div>
      </div>
    </div>`;
  }).join("");
}

function initProduct() {
  const s = STRAPS.find(x => x.id === qs.get("id")) || STRAPS[0];
  document.title = `${s.name} — alug`;
  let width = s.widths[0];
  const fitNote = s.fits
    ? `<div class="notice" style="margin:14px 0">Made exclusively for: ${s.fits.map(fid => { const w = WATCHES.find(x => x.id === fid); return w ? `<a href="watch.html?id=${w.id}" style="text-decoration:underline">${w.brand} ${w.model}</a>` : ""; }).join(" · ")}. Fitted ends don't fit anything else — that's the point.</div>` : "";
  document.getElementById("pdp-root").innerHTML = `
  <div class="crumbs"><a href="straps.html">Straps</a> / ${s.name}</div>
  <div class="pdp">
    <div class="visual">${strapSVG(s, true)}</div>
    <div>
      ${s.tag ? `<span class="pill brass">${s.tag}</span>` : ""}
      <h1 style="margin-top:10px">${s.name}</h1>
      <div class="price">${inr(s.price)}</div>
      <p class="blurb">${s.blurb}</p>
      ${fitNote}
      <h4 style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:var(--faint)">${s.family === "prx" ? "Case size" : "Lug width"}</h4>
      <div class="width-picker" id="width-picker">
        ${s.family === "prx" ? `<button class="chip on" data-w="40">40mm</button><button class="chip" data-w="35">35mm</button>` : s.widths.map(w => `<button class="chip ${w === width ? "on" : ""}" data-w="${w}">${w}mm</button>`).join("")}
      </div>
      <div class="qty-row">
        <input type="number" id="pdp-qty" value="1" min="1" max="9" aria-label="Quantity">
        <button class="btn brass" id="pdp-add">Add to cart</button>
      </div>
      <table class="spec-table">
        <tr><td>Material</td><td>${s.material === "nato" ? "Ballistic nylon / waxed canvas" : s.tex === "tropic" ? "Natural rubber, tropic weave" : s.material === "rubber" ? "FKM fluoroelastomer" : s.tex === "suede" ? "Full-grain suede" : "Full-grain leather" + (s.tex === "croc" ? ", croc-embossed" : s.tex === "perf" ? ", racing perforated" : s.tex === "rivet" ? ", pilot riveted" : "")}</td></tr>
        <tr><td>Colour</td><td>${s.colorName}</td></tr>
        <tr><td>End type</td><td>${s.end === "curved" ? "Fitted curved end" : s.end === "integrated" ? "Integrated fit" : "Straight, standard spring bars"}</td></tr>
        <tr><td>Taper</td><td>${s.taper}</td></tr>
        <tr><td>Thickness</td><td>${s.thickness}</td></tr>
        <tr><td>Spring bars</td><td>Quick-release, double-shouldered 316L (spare pair included)</td></tr>
        <tr><td>Buckle</td><td>Brushed 316L pin buckle</td></tr>
        <tr><td>Length</td><td>115/75mm — fits 15–20cm wrists</td></tr>
      </table>
      <div class="pairs">
        <h4>Wears beautifully on</h4>
        <div class="chiprow">
          ${s.pairs.map(pid => { const w = WATCHES.find(x => x.id === pid); return w ? `<a class="chip" href="watch.html?id=${w.id}">${w.brand} ${w.model}</a>` : ""; }).join("")}
        </div>
      </div>
    </div>
  </div>
  <div class="section-tight">
    <h2 style="margin-bottom:20px">Complete the rotation</h2>
    <div class="grid grid-4" id="pdp-related"></div>
  </div>`;
  document.querySelectorAll("#width-picker .chip").forEach(c => c.addEventListener("click", () => {
    width = Number(c.dataset.w);
    document.querySelectorAll("#width-picker .chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on");
  }));
  document.getElementById("pdp-add").addEventListener("click", () => {
    const q = Math.max(1, Number(document.getElementById("pdp-qty").value) || 1);
    addToCart("strap", s.id, width, q);
  });
  const related = STRAPS.filter(x => x.id !== s.id && (x.material === s.material || x.pairs.some(p => s.pairs.includes(p)))).slice(0, 4);
  document.getElementById("pdp-related").innerHTML = related.map(strapCard).join("");
}

function initArt() {
  const archive = ART.filter(a => a.series === "archive");
  const originals = ART.filter(a => a.series === "original");
  document.getElementById("archive-grid").innerHTML = archive.map(artCard).join("");
  document.getElementById("original-grid").innerHTML = originals.map(artCard).join("");
  document.getElementById("paper-grid").innerHTML = NOTEBOOKS.map(nb => `
    <div class="card">
      <div class="thumb">${notebookSVG(nb)}</div>
      <div class="body">
        <div class="name">${nb.title}</div>
        <div class="sub">${nb.detail}</div>
        <div class="sub">${nb.blurb}</div>
        <div class="price-row"><span class="price">${inr(nb.price)}</span>
          <button class="btn sm" onclick="addToCart('notebook','${nb.id}')">Add</button></div>
      </div>
    </div>`).join("");
}

function initArtwork() {
  const a = ART.find(x => x.id === qs.get("id")) || ART[0];
  document.title = `${a.short} — alug atelier`;
  const isArchive = a.series === "archive";
  const related = ART.filter(x => x.id !== a.id && x.series === a.series).slice(0, 3);
  document.getElementById("artwork-root").innerHTML = `
  <div class="crumbs"><a href="art.html">Art &amp; paper</a> / ${a.short}</div>
  <div class="pdp">
    <div class="visual" style="background:var(--paper-deep)">${artSVG(a, true)}</div>
    <div>
      <p class="kicker">${isArchive ? "The archive, reimagined" : "alug originals"}</p>
      <h1>${a.short}</h1>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 4px">
        <span class="pill brass">${a.styleTag}</span><span class="pill">${a.size}</span><span class="pill steel">edition of 50</span>
      </div>
      <div class="price">${inr(a.price)}</div>
      <p class="blurb">${a.story}</p>
      <div class="qty-row">
        <input type="number" id="art-qty" value="1" min="1" max="5" aria-label="Quantity">
        <button class="btn brass" id="art-add">Add to cart</button>
      </div>
      <table class="spec-table">
        <tr><td>Full title</td><td>${a.title}</td></tr>
        <tr><td>Print</td><td>Giclée on 310gsm cotton rag</td></tr>
        <tr><td>Frame</td><td>Solid walnut, museum-grade acrylic</td></tr>
        <tr><td>Edition</td><td>50, numbered and embossed with the a. roundel</td></tr>
        <tr><td>Shipping</td><td>Boxed flat, insured, across India</td></tr>
      </table>
      ${isArchive ? `<p style="font-size:12px;color:var(--faint);margin-top:8px">An unlicensed homage created by alug atelier. Not affiliated with, sponsored or endorsed by the brand referenced. Sold as original interpretive artwork.</p>` : ""}
    </div>
  </div>
  <div class="section-tight">
    <h2 style="margin-bottom:20px">From the same series</h2>
    <div class="grid grid-3" id="art-related"></div>
  </div>`;
  document.getElementById("art-add").addEventListener("click", () => {
    const q = Math.max(1, Number(document.getElementById("art-qty").value) || 1);
    addToCart("art", a.id, "", q);
  });
  document.getElementById("art-related").innerHTML = related.map(artCard).join("");
}

function initJournal() {
  document.getElementById("journal-grid").innerHTML = ARTICLES.map(a => `
    <a class="article-card" href="article.html?id=${a.id}">
      <span class="ameta">${a.date} · ${a.minutes} min read</span>
      <span class="atitle">${a.title}</span>
      <span class="adesc">${a.desc}</span>
      <span class="read-more">Read →</span>
    </a>`).join("");
}

function initArticle() {
  const a = ARTICLES.find(x => x.id === qs.get("id")) || ARTICLES[0];
  document.title = `${a.title} — alug journal`;
  document.getElementById("article-root").innerHTML = `
    <div class="crumbs"><a href="journal.html">Journal</a> / ${a.title}</div>
    <article class="article-body">
      <h1 class="serif">${a.title}</h1>
      <div class="ameta">${a.date} · ${a.minutes} min read · alug journal</div>
      ${a.body}
      <div style="margin-top:44px;padding-top:24px;border-top:1px solid var(--line)">
        <a class="btn ghost" href="journal.html">← All journal entries</a>
      </div>
    </article>`;
}

/* ---------------- boot ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  mountChrome();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "straps") initStraps();
  if (page === "watches") initWatches();
  if (page === "watch") initWatch();
  if (page === "product") initProduct();
  if (page === "art") initArt();
  if (page === "artwork") initArtwork();
  if (page === "journal") initJournal();
  if (page === "article") initArticle();
});
