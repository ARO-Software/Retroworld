import { site, products, categories } from './data.mjs';

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const money = (n) => `${site.currency} ${Number(n).toFixed(2)}`;

export const byId = (id) => products.find((p) => p.id === id);

export const sortedBy = (key) =>
  products.filter((p) => p.order?.[key]).sort((a, b) => a.order[key] - b.order[key]);

export const fromPrice = (catId) => Math.min(...products.filter((p) => p.category === catId).map((p) => p.price));

const img = (p) => `assets/img/products/${p.id}`;

export const icon = {
  arrow: '<svg class="i i-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12h18m-6-6.5L21 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  search: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="1.6"/></svg>',
  bag: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8h15l-1 12.5h-13zM8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  close: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="1.6"/></svg>',
  menu: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h18M3 16h18" stroke="currentColor" stroke-width="1.6"/></svg>',
  plus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.6"/></svg>',
  minus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="1.6"/></svg>',
  play: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  pause: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5.5h3v13h-3zM13.5 5.5h3v13h-3z" fill="currentColor"/></svg>',
  chevL: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  chevR: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  instagram: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
  tiktok: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3.5v11.2a3.7 3.7 0 1 1-3.7-3.7M14 3.5c.4 2.6 2.2 4.3 5 4.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  star: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.6 5.6 3.9 8.9 9.5 9.5-5.6.6-8.9 3.9-9.5 9.5-.6-5.6-3.9-8.9-9.5-9.5 5.6-.6 8.9-3.9 9.5-9.5z" fill="currentColor"/></svg>',
};

export const priceHtml = (p) =>
  p.was
    ? `<span class="price"><s aria-label="Was ${money(p.was)}">${money(p.was)}</s> <span class="price__now">${money(p.price)}</span></span>`
    : `<span class="price"><span class="price__now">${money(p.price)}</span></span>`;

export const picture = (p, { sizes = '(max-width: 760px) 50vw, 25vw', eager = false, cls = '' } = {}) => {
  const srcset = [`${img(p)}-sm.webp 420w`, p.img.md && `${img(p)}-md.webp ${p.img.md}w`, `${img(p)}.webp ${p.img.w}w`].filter(Boolean).join(', ');
  return `<img class="${cls}" src="${img(p)}-sm.webp" srcset="${srcset}" sizes="${sizes}" width="${p.img.w}" height="${p.img.h}" alt="${esc(p.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};

// Landscape lookbook banner (only for products with a `wide` shot).
export const widePicture = (p) =>
  `<img src="${img(p)}-wide-md.webp" srcset="${img(p)}-wide-md.webp ${p.wide.md}w, ${img(p)}-wide.webp ${p.wide.w}w" sizes="100vw" width="${p.wide.w}" height="${p.wide.h}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`;

export const sizesHtml = (p) =>
  `<div class="sizes" role="radiogroup" aria-label="Size for ${esc(p.name)}">${p.sizes
    .map((s) => `<button type="button" role="radio" aria-checked="false" data-size="${s}">${s}</button>`)
    .join('<span aria-hidden="true">/</span>')}</div>`;

export const productCard = (p, i = 0) => `
<article class="card" data-product="${p.id}" data-category="${p.category}" data-price="${p.price}" data-arrived="${p.arrived}" data-badge="${(p.badge || '').toLowerCase()}" data-new="${Boolean(p.order?.arrivals)}" data-reveal style="--d:${i * 70}ms">
  <button type="button" class="card__media" data-quickview="${p.id}" style="--bg:${p.bg}" aria-label="Quick view: ${esc(p.name)}">
    ${picture(p)}
    ${p.badge ? `<span class="tag">${p.badge}</span>` : ''}
    <span class="card__quick">Quick view ${icon.arrow}</span>
  </button>
  <div class="card__info">
    <h3 class="card__name">${esc(p.name)}</h3>
    ${priceHtml(p)}
  </div>
  ${sizesHtml(p)}
  <button type="button" class="cta-link" data-add="${p.id}"><span>Add to bag</span> ${icon.arrow}</button>
</article>`;

const navLinks = [
  ['shop', 'Shop', 'shop.html'],
  ['new', 'New in', 'shop.html?f=new'],
  ['collections', 'Collections', 'index.html#collections'],
  ['about', 'About', 'about.html'],
];

export const header = (active) => `
<a class="skip" href="#main">Skip to content</a>
<div class="announce" role="region" aria-label="Announcements">
  <div class="announce__track" data-announce>
    ${site.announcements.map((t, i) => `<p class="${i === 0 ? 'is-active' : ''}" ${i ? 'aria-hidden="true"' : ''}>${esc(t)}</p>`).join('')}
  </div>
</div>
<header class="header" data-header>
  <div class="header__inner">
    <button type="button" class="header__icon header__menu" data-menu-open aria-label="Open menu" aria-expanded="false" aria-controls="menu">${icon.menu}</button>
    <a class="logo" href="index.html" aria-label="${site.name} — home">
      <img src="assets/img/brand/crew-128.webp" width="36" height="36" alt="">
      <span>${site.name}</span>
    </a>
    <nav class="nav" aria-label="Primary">
      ${navLinks.map(([k, label, href]) => `<a href="${href}" ${active === k ? 'aria-current="page"' : ''}><span data-text="${label}">${label}</span></a>`).join('')}
    </nav>
    <div class="header__actions">
      <button type="button" class="header__btn" data-search-open aria-label="Search"><span class="hide-sm">Search</span><span class="show-sm">${icon.search}</span></button>
      <button type="button" class="header__btn" data-bag-open aria-label="Bag, 0 items"><span class="hide-sm">Bag</span><span class="show-sm">${icon.bag}</span> <span class="bag-count">(<span data-bag-count>0</span>)</span></button>
    </div>
  </div>
</header>`;

export const newsletter = () => `
<section class="newsletter" aria-labelledby="nl-title">
  <div class="container newsletter__inner">
    <div data-reveal>
      <h2 id="nl-title" class="display h-section">First access to every drop</h2>
      <p class="newsletter__sub">Join the list for new releases and restocks.</p>
    </div>
    <form class="newsletter__form" data-newsletter novalidate data-reveal style="--d:120ms">
      <label for="nl-email" class="label">Email address</label>
      <div class="newsletter__row">
        <input id="nl-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" required>
        <button class="btn btn--solid" type="submit">Subscribe</button>
      </div>
      <p class="newsletter__msg" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;

export const footer = () => `
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <a class="logo" href="index.html" aria-label="${site.name} — home">
        <img src="assets/img/brand/crew-128.webp" width="36" height="36" alt="" loading="lazy">
        <span>${site.name}</span>
      </a>
      <p>${esc(site.tagline)}</p>
      <p class="ar" lang="ar" dir="rtl">من شوارع إربد</p>
    </div>
    <nav class="footer__col" aria-label="Shop">
      <h2 class="label">Shop</h2>
      ${categories.map((c) => `<a href="shop.html?c=${c.id}">${esc(c.name.replace('Hoodies', 'hoodies'))}</a>`).join('')}
    </nav>
    <nav class="footer__col" aria-label="Help">
      <h2 class="label">Help</h2>
      <a href="help.html#delivery">Delivery</a>
      <a href="help.html#returns">Returns</a>
      <a href="help.html#sizing">Size guide</a>
      <a href="help.html#contact">Contact</a>
    </nav>
    <nav class="footer__col" aria-label="Follow">
      <h2 class="label">Follow</h2>
      <a href="${site.links.instagram}" target="_blank" rel="noopener" data-social>Instagram</a>
      <a href="${site.links.tiktok}" target="_blank" rel="noopener" data-social>TikTok</a>
    </nav>
  </div>
  <div class="container footer__bottom">
    <p>© <span data-year>2026</span> ${site.name}. All rights reserved.</p>
    <p>${esc(site.city)}</p>
  </div>
  <div class="footer__mark" aria-hidden="true" data-reveal>
    ${[...site.name.toUpperCase()].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('')}
  </div>
</footer>`;

// Overlays shared by every page: menu, search, bag, quick view, reels, toast.
export const overlays = () => `
<div class="scrim" data-scrim hidden></div>

<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" data-menu hidden>
  <div class="menu__top">
    <a class="logo" href="index.html"><img src="assets/img/brand/crew-128.webp" width="36" height="36" alt=""><span>${site.name}</span></a>
    <button type="button" class="header__icon" data-close aria-label="Close menu">${icon.close}</button>
  </div>
  <nav class="menu__nav" aria-label="Mobile">
    ${navLinks.map(([, label, href], i) => `<a href="${href}" style="--i:${i}"><span class="menu__num">0${i + 1}</span>${label}</a>`).join('')}
  </nav>
  <div class="menu__foot">
    <a href="help.html">Help</a><a href="${site.links.instagram}" data-social>Instagram</a><a href="${site.links.tiktok}" data-social>TikTok</a>
  </div>
</div>

<div class="search" role="dialog" aria-modal="true" aria-label="Search" data-search hidden>
  <div class="search__panel">
    <div class="container">
      <div class="search__bar">
        ${icon.search}
        <input type="search" placeholder="Search the drop" aria-label="Search products" autocomplete="off" data-search-input>
        <button type="button" class="header__icon" data-close aria-label="Close search">${icon.close}</button>
      </div>
      <div class="search__chips" data-search-chips>
        <span class="label">Popular</span>
        ${['Puffer', 'Fleece', 'Knit', 'Joggers', 'Sale'].map((t) => `<button type="button" class="chip" data-chip="${t}">${t}</button>`).join('')}
      </div>
      <p class="search__count label" data-search-count aria-live="polite"></p>
      <div class="search__results" data-search-results data-lenis-prevent></div>
    </div>
  </div>
</div>

<aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title" data-bag hidden>
  <div class="drawer__head">
    <h2 id="bag-title" class="display">Your bag <span data-bag-count-title></span></h2>
    <button type="button" class="header__icon" data-close aria-label="Close bag">${icon.close}</button>
  </div>
  <div class="drawer__ship" data-ship>
    <p data-ship-text></p>
    <div class="meter"><span data-ship-bar></span></div>
  </div>
  <div class="drawer__body" data-bag-items data-lenis-prevent></div>
  <div class="drawer__foot">
    <div class="drawer__row"><span class="label">Subtotal</span><strong data-bag-subtotal>${money(0)}</strong></div>
    <p class="drawer__note">Delivery and payment are confirmed at checkout.</p>
    <button type="button" class="btn btn--solid btn--block" data-checkout>Checkout</button>
    <button type="button" class="btn btn--ghost btn--block" data-close>Keep shopping</button>
  </div>
</aside>

<div class="qv" role="dialog" aria-modal="true" aria-labelledby="qv-title" data-qv hidden>
  <div class="qv__panel" data-lenis-prevent>
    <button type="button" class="header__icon qv__close" data-close aria-label="Close">${icon.close}</button>
    <div class="qv__media" data-qv-media></div>
    <div class="qv__info">
      <p class="label" data-qv-cat></p>
      <h2 id="qv-title" class="display" data-qv-name></h2>
      <p class="qv__price" data-qv-price></p>
      <p class="qv__blurb" data-qv-blurb></p>
      <div class="qv__sizes">
        <div class="qv__sizes-head"><span class="label">Size</span><a class="label link" href="help.html#sizing">Size guide</a></div>
        <div class="size-grid" role="radiogroup" aria-label="Size" data-qv-sizes></div>
      </div>
      <button type="button" class="btn btn--solid btn--block" data-qv-add>Add to bag</button>
      <details class="acc" open><summary>Details</summary><ul data-qv-details></ul></details>
      <details class="acc"><summary>Delivery &amp; returns</summary><p>Next-day in Irbid, 1–3 working days across Jordan. Free over ${money(site.freeDeliveryOver)}. Exchange or store credit within 7 days.</p></details>
    </div>
  </div>
</div>

<div class="reels" role="dialog" aria-modal="true" aria-label="${site.name} reels" data-reels hidden>
  <div class="reels__stage">
    <div class="reels__frame" data-reels-frame>
      <div class="reels__bars" data-reels-bars></div>
      <div class="reels__head">
        <img src="assets/img/brand/crew-128.webp" width="32" height="32" alt="">
        <span><b>${site.name.toLowerCase()}</b><small>${esc(site.drop)}</small></span>
        <button type="button" class="reels__btn" data-reels-toggle aria-label="Pause">${icon.pause}</button>
        <button type="button" class="reels__btn" data-close aria-label="Close reels">${icon.close}</button>
      </div>
      <div class="reels__slides" data-reels-slides></div>
      <button type="button" class="reels__nav reels__nav--prev" data-reels-prev aria-label="Previous">${icon.chevL}</button>
      <button type="button" class="reels__nav reels__nav--next" data-reels-next aria-label="Next">${icon.chevR}</button>
    </div>
    <p class="reels__follow">More on <a href="${site.links.instagram}" data-social>Instagram</a> &amp; <a href="${site.links.tiktok}" data-social>TikTok</a></p>
  </div>
</div>

<div class="toast" role="status" aria-live="polite" data-toast></div>
<div class="cursor" aria-hidden="true" data-cursor><span>Drag</span></div>`;

export const layout = ({ title, description = site.description, active = '', body, page, base = '', withNewsletter = true }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${base ? `<base href="${base}">` : ''}
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#141519">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="assets/img/brand/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/brand/icon-32.png" type="image/png">
<link rel="apple-touch-icon" href="assets/img/brand/icon-180.png">
<link rel="preload" href="assets/fonts/archivo-latin-wdth-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/vendor/lenis.css">
<link rel="stylesheet" href="assets/css/style.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body data-page="${page}">
${header(active)}
<main id="main">
${body}
${withNewsletter ? newsletter() : ''}
</main>
${footer()}
${overlays()}
<script src="assets/vendor/lenis.min.js" defer></script>
<script type="module" src="assets/js/main.js"></script>
</body>
</html>
`;
