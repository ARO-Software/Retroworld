import { site, categories, info, products } from '../data.mjs';
import { layout, esc, money, icon, picture, widePicture, sortedBy, fromPrice, productCard, byId } from '../components.mjs';

export const file = 'index.html';

export default function render() {
  const hero = sortedBy('hero');
  const featured = sortedBy('featured');
  const arrivals = sortedBy('arrivals');
  const looks = sortedBy('look').filter((p) => p.wide);

  const body = `
<section class="hero" aria-label="${esc(site.drop)}">
  <div class="hero__copy">
    <p class="eyebrow" data-hero-in style="--d:0ms"><span class="eyebrow__rule"></span>${esc(site.drop)} / ${esc(site.city)}</p>
    <h1 class="display hero__title">
      <span class="line"><span data-hero-in style="--d:80ms">Built on the</span></span>
      <span class="line"><span data-hero-in style="--d:160ms">streets of</span></span>
      <span class="line"><span data-hero-in style="--d:240ms">Irbid<em>.</em></span></span>
    </h1>
    <p class="hero__lede" data-hero-in style="--d:360ms">Hand-picked vintage and retro streetwear — puffers, fleeces, knits and joggers — for the ones who would rather dress different.</p>
    <div class="hero__actions" data-hero-in style="--d:440ms">
      <a class="btn btn--solid" href="shop.html"><span>Shop the drop</span></a>
      <button type="button" class="btn btn--ghost" data-reels-open><span class="btn__play">${icon.play}</span><span>Watch the reels</span></button>
    </div>
    <dl class="hero__facts" data-hero-in style="--d:520ms">
      <div><dt>Pieces in drop</dt><dd>${String(products.length).padStart(2, '0')}</dd></div>
      <div><dt>Ships</dt><dd>Across Jordan</dd></div>
      <div><dt lang="ar" dir="rtl" class="ar">إربد</dt><dd>32.55°N 35.85°E</dd></div>
    </dl>
  </div>

  <div class="hero__visual" data-hero-in style="--d:200ms">
    <div class="hero__frame" data-slider aria-roledescription="carousel" aria-label="Featured drop pieces">
      ${hero
        .map(
          (p, i) => `<figure class="hero__slide ${i === 0 ? 'is-active' : ''}" style="--bg:${p.bg}" aria-roledescription="slide" aria-label="${i + 1} of ${hero.length}: ${esc(p.name)}" ${i ? 'aria-hidden="true"' : ''}>
        ${picture(p, { sizes: '(max-width: 900px) 92vw, 40vw', eager: i === 0 })}
      </figure>`
        )
        .join('')}
      <button type="button" class="hero__tag" data-hero-tag data-quickview="${hero[0].id}">
        <span class="hero__tag-inner" data-hero-tag-inner>
          <span>01 / ${esc(hero[0].name)}</span><span>${money(hero[0].price)}</span>
        </span>
      </button>
      <div class="spin-badge" aria-hidden="true">
        <svg viewBox="0 0 120 120"><defs><path id="badge-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"/></defs>
          <text><textPath href="#badge-circle" textLength="292">HAND-PICKED IN IRBID ✦ VINTAGE &amp; STREET ✦ </textPath></text></svg>
        <img src="assets/img/brand/crew-128.webp" alt="" width="56" height="56">
      </div>
    </div>
    <div class="hero__bars" role="tablist" aria-label="Choose slide" style="--n:${hero.length}">
      ${hero.map((p, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="Show ${esc(p.name)}" data-slide-to="${i}"><span></span></button>`).join('')}
    </div>
    <script type="application/json" data-hero-data>${JSON.stringify(hero.map((p) => ({ id: p.id, name: p.name, price: money(p.price) })))}</script>
  </div>
</section>

<section class="featured" aria-labelledby="featured-title">
  <div class="bar container">
    <h2 id="featured-title" class="label">Featured pieces</h2>
    <a class="label link" href="shop.html">View all</a>
  </div>
  <div class="marquee" data-marquee>
    <div class="marquee__track" data-marquee-track>
      ${featured
        .map(
          (p) => `<button type="button" class="tile" data-quickview="${p.id}" style="--bg:${p.bg}" aria-label="Quick view: ${esc(p.name)}, ${money(p.price)}">
        ${picture(p, { sizes: '(max-width: 760px) 62vw, 22vw' })}
        <span class="tile__tag"><span>${esc(p.name)}</span><span>${money(p.price)}</span></span>
      </button>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section" id="collections" aria-labelledby="cat-title">
  <div class="container">
    <div class="section__head">
      <h2 id="cat-title" class="display h-section" data-reveal>Shop by category</h2>
      <p class="label" data-reveal>${String(categories.length).padStart(2, '0')} Collections</p>
    </div>
    <div class="cats">
      ${categories
        .map((c, i) => {
          const p = byId(c.image);
          return `<a class="cat" href="shop.html?c=${c.id}" data-reveal style="--d:${i * 80}ms; --bg:${p.bg}">
        <span class="cat__media">${picture(p, { sizes: '(max-width: 760px) 50vw, 25vw' })}</span>
        <span class="cat__tag">
          <span><b class="display">${esc(c.name)}</b><small>From ${money(fromPrice(c.id))}</small></span>
          ${icon.arrow}
        </span>
      </a>`;
        })
        .join('')}
    </div>
  </div>
</section>

<section class="section section--tight" aria-labelledby="new-title">
  <div class="container">
    <div class="section__head">
      <h2 id="new-title" class="display h-section" data-reveal>New arrivals</h2>
      <a class="label link" href="shop.html?f=new" data-reveal>View all</a>
    </div>
    <div class="grid">
      ${arrivals.map((p, i) => productCard(p, i)).join('')}
    </div>
  </div>
</section>

<section class="lookbook" aria-labelledby="look-title">
  <div class="bar container">
    <h2 id="look-title" class="label">Lookbook</h2>
    <p class="label">${esc(site.drop)}</p>
  </div>
  ${looks
    .map(
      (p, i) => `<button type="button" class="look" data-quickview="${p.id}" data-reveal aria-label="Shop the look: ${esc(p.name)}, ${money(p.price)}">
    ${widePicture(p)}
    <span class="look__tag">
      <span class="look__num">${String(i + 1).padStart(2, '0')}</span>
      <span class="look__name">${esc(p.name)}</span>
      <span>${money(p.price)}</span>
      <span class="look__cta">Shop the look ${icon.arrow}</span>
    </span>
  </button>`
    )
    .join('')}
</section>

<section class="story" aria-labelledby="story-title">
  <div class="story__art">
    <div class="orbit" data-reveal>
      <span class="orbit__ring"></span>
      <span class="orbit__spin"><span class="orbit__dot"></span></span>
      <img src="assets/img/brand/crew.webp" width="552" height="552" alt="Illustration of the three RetroWindd friends in vintage jackets and flannel" loading="lazy">
    </div>
  </div>
  <div class="story__copy">
    <p class="label" data-reveal>Our story</p>
    <h2 id="story-title" class="display h-section" data-reveal style="--d:80ms">Good clothes deserve a second life.</h2>
    <p data-reveal style="--d:160ms">RetroWindd is a small crew from Irbid, Jordan, digging through bales and back rooms for the vintage pieces worth keeping. Every jacket, knit and fleece is hand-picked, cleaned and checked before it drops — one-of-a-kind streetwear without the fast-fashion price tag.</p>
    <a class="btn btn--solid" href="about.html" data-reveal style="--d:240ms"><span>Read our story</span></a>
  </div>
</section>

<section class="info container" aria-label="Delivery, returns and sizing">
  ${info
    .map(
      (it, i) => `<div class="info__item" data-reveal style="--d:${i * 90}ms">
    <p class="info__num">0${i + 1}</p>
    <h3 class="display">${it.title}</h3>
    <p>${esc(it.text)}</p>
    <a class="label link" href="help.html#${it.title === 'Sizing' ? 'sizing' : it.title.toLowerCase()}">Learn more</a>
  </div>`
    )
    .join('')}
</section>`;

  return layout({
    title: `${site.name} — Vintage streetwear from ${site.city}`,
    page: 'home',
    body,
  });
}
