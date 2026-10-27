import { site, products } from '../data.mjs';
import { layout, picture, byId } from '../components.mjs';

export const file = 'about.html';

export default function render() {
  const strip = ['red-training-top', 'cable-knit-sweater', 'grey-half-zip', 'grey-fleece-joggers', 'green-quarter-zip', 'olive-puffer-jacket'].map(byId);
  const values = [
    ['Hand-picked', 'We go through hundreds of pieces to find the few worth wearing. Brands, fabrics, fits — nothing makes the cut by accident.'],
    ['Cleaned & checked', 'Every item is washed, steamed and inspected for flaws before it is photographed. If something is not perfect, we tell you.'],
    ['Small drops', 'We release in small batches, so the rail is always fresh. Most pieces are one-offs — when they are gone, they are gone.'],
  ];

  const body = `
<section class="about-hero">
  <div class="container about-hero__inner">
    <div>
      <p class="eyebrow" data-reveal><span class="eyebrow__rule"></span>Our story / ${site.city}</p>
      <h1 class="display about-hero__title" data-reveal style="--d:80ms">Good clothes deserve a second life.</h1>
    </div>
    <div class="orbit orbit--sm" data-reveal style="--d:160ms">
      <span class="orbit__ring"></span>
      <span class="orbit__spin"><span class="orbit__dot"></span></span>
      <img src="assets/img/brand/crew.webp" width="552" height="552" alt="Illustration of the three RetroWindd friends in vintage jackets and flannel">
    </div>
  </div>
</section>

<section class="about-strip" aria-hidden="true">
  <div class="about-strip__track">
    ${[...strip, ...strip].map((p) => `<span class="about-strip__item" style="--bg:${p.bg}">${picture(p, { sizes: '220px' })}</span>`).join('')}
  </div>
</section>

<section class="section container prose-grid">
  <p class="label" data-reveal>How it started</p>
  <div class="prose">
    <p class="prose__lead" data-reveal>RetroWindd started the way most good things in Irbid do — three friends, too much time, and a habit of digging through the bales at the souk for the jacket nobody else spotted.</p>
    <p data-reveal>What began as dressing ourselves turned into dressing our friends, then their friends. People kept asking where the pieces came from. So we built a home for them: a label that finds the best vintage and retro streetwear, gives it a proper clean, and puts it back on the street where it belongs.</p>
    <p data-reveal>We believe the most interesting clothes have already lived a little. Buying them again is better for your wardrobe, your wallet, and for everyone tired of fast fashion piling up.</p>
  </div>
</section>

<section class="values container" aria-label="What we stand for">
  ${values
    .map(
      ([t, d], i) => `<div class="values__item" data-reveal style="--d:${i * 90}ms">
    <p class="info__num">0${i + 1}</p>
    <h2 class="display">${t}</h2>
    <p>${d}</p>
  </div>`
    )
    .join('')}
</section>

<section class="cta-band">
  <div class="container cta-band__inner">
    <h2 class="display h-section" data-reveal>${String(products.length).padStart(2, '0')} pieces. One drop.<br>No restocks.</h2>
    <a class="btn btn--solid" href="shop.html" data-reveal style="--d:100ms"><span>Shop the drop</span></a>
  </div>
</section>`;

  return layout({ title: `Our story — ${site.name}`, page: 'about', active: 'about', body });
}
