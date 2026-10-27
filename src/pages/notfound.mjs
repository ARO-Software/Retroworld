import { site } from '../data.mjs';
import { layout, picture, byId } from '../components.mjs';

export const file = '404.html';

// GitHub Pages serves this for any unknown path, so it needs a <base> pointing at the site root.
export default function render({ basePath }) {
  const p = byId('grey-half-zip');
  const body = `
<section class="notfound container">
  <div class="notfound__copy">
    <p class="eyebrow"><span class="eyebrow__rule"></span>Error 404</p>
    <h1 class="display page-hero__title">Lost in the souk.</h1>
    <p class="page-hero__lede">This page sold out — or never existed. The good stuff is this way.</p>
    <div class="hero__actions">
      <a class="btn btn--solid" href="shop.html"><span>Shop the drop</span></a>
      <a class="btn btn--ghost" href="index.html"><span>Back home</span></a>
    </div>
  </div>
  <div class="notfound__media" style="--bg:${p.bg}">${picture(p, { sizes: '(max-width: 760px) 80vw, 30vw', eager: true })}</div>
</section>`;
  return layout({ title: `Page not found — ${site.name}`, page: 'notfound', body, base: basePath, withNewsletter: false });
}
