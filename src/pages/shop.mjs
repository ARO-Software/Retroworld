import { site, products, categories, extraCategories } from '../data.mjs';
import { layout, productCard } from '../components.mjs';

export const file = 'shop.html';

export default function render() {
  const filters = [{ id: 'all', name: 'All' }, ...categories, ...extraCategories, { id: 'new', name: 'New in' }, { id: 'sale', name: 'Sale' }];
  const ordered = [...products].sort((a, b) => (a.order.featured || 99) - (b.order.featured || 99));

  const body = `
<section class="page-hero container">
  <p class="eyebrow" data-reveal><span class="eyebrow__rule"></span>${site.drop} / ${site.city}</p>
  <h1 class="display page-hero__title" data-reveal style="--d:80ms"><span data-shop-title>Shop the drop</span> <sup data-shop-count>${String(products.length).padStart(2, '0')}</sup></h1>
  <p class="page-hero__lede" data-reveal style="--d:160ms">Every piece is hand-picked in Irbid, cleaned and checked before it drops. When it is gone, it is gone.</p>
</section>

<div class="shopbar" data-shopbar>
  <div class="container shopbar__inner">
    <div class="filters" role="toolbar" aria-label="Filter products" data-lenis-prevent>
      ${filters.map((f, i) => `<button type="button" class="chip ${i === 0 ? 'is-active' : ''}" data-filter="${f.id}" aria-pressed="${i === 0}">${f.name}</button>`).join('')}
    </div>
    <label class="sort">
      <span class="label">Sort</span>
      <select data-sort aria-label="Sort products">
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </label>
  </div>
</div>

<section class="section section--shop container" aria-label="Products">
  <div class="grid grid--shop" data-shop-grid>
    ${ordered.map((p, i) => productCard(p, i % 4)).join('')}
  </div>
  <div class="empty" data-empty hidden>
    <p class="display">Nothing here — yet.</p>
    <p>This one sold out fast. Join the list below to hear about the next drop first.</p>
    <button type="button" class="btn btn--ghost" data-filter="all">See everything</button>
  </div>
</section>`;

  return layout({ title: `Shop — ${site.name}`, page: 'shop', active: 'shop', body });
}
