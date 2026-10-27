import data from './data.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const fmt = (n) => `${data.site.currency} ${Number(n).toFixed(2)}`;
const P = Object.fromEntries(data.products.map((p) => [p.id, p]));
const src = (p, small) => `assets/img/products/${p.id}${small ? '-sm' : ''}.webp`;
const pad = (n) => String(n).padStart(2, '0');
const el = (tag, props = {}, html = '') => Object.assign(document.createElement(tag), props, html ? { innerHTML: html } : {});
const ICON = {
  plus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.6"/></svg>',
  minus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="1.6"/></svg>',
  play: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  pause: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5.5h3v13h-3zM13.5 5.5h3v13h-3z" fill="currentColor"/></svg>',
};

/* ---------------------------------------------------------------- smooth scroll */
const lenis = !reduced && window.Lenis ? new window.Lenis({ autoRaf: true, lerp: 0.11 }) : null;
const headerOffset = () => -($('[data-header]')?.offsetHeight || 0) - 12;

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href*="#"]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
  const url = new URL(a.href, location.href);
  const samePage = url.pathname === location.pathname || (url.pathname.endsWith('/index.html') && location.pathname.endsWith('/'));
  const target = samePage && url.hash.length > 1 && document.getElementById(url.hash.slice(1));
  if (!target) return;
  e.preventDefault();
  closeAll();
  if (lenis) lenis.scrollTo(target, { offset: headerOffset(), duration: 1.4 });
  else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  history.replaceState(null, '', url.hash);
});

/* ---------------------------------------------------------------- layers (dialogs) */
const scrim = $('[data-scrim]');
const stack = [];
let lockCount = 0;
const lock = () => { if (lockCount++ === 0) { lenis?.stop(); root.classList.add('is-locked'); } };
const unlock = () => { if (--lockCount <= 0) { lockCount = 0; lenis?.start(); root.classList.remove('is-locked'); } };
const focusables = (node) => $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', node).filter((n) => n.offsetParent !== null || n === document.activeElement);

function openLayer(node, { useScrim = true, focus, onClose } = {}) {
  if (!node || stack.some((l) => l.node === node)) return;
  stack.push({ node, useScrim, onClose, returnTo: document.activeElement });
  clearTimeout(node._hideTimer);
  node.hidden = false;
  if (useScrim) { clearTimeout(scrim._hideTimer); scrim.hidden = false; }
  lock();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    node.classList.add('is-open');
    if (useScrim) scrim.classList.add('is-open');
  }));
  setTimeout(() => (focus ? $(focus, node) : focusables(node)[0])?.focus({ preventScroll: true }), 80);
}

function closeLayer(node) {
  const i = stack.findIndex((l) => l.node === node);
  if (i < 0) return;
  const [layer] = stack.splice(i, 1);
  node.classList.remove('is-open');
  node._hideTimer = setTimeout(() => (node.hidden = true), 700);
  if (layer.useScrim && !stack.some((l) => l.useScrim)) {
    scrim.classList.remove('is-open');
    scrim._hideTimer = setTimeout(() => (scrim.hidden = true), 500);
  }
  unlock();
  layer.onClose?.();
  if (layer.returnTo && document.contains(layer.returnTo)) layer.returnTo.focus({ preventScroll: true });
}
const closeTop = () => stack.length && closeLayer(stack[stack.length - 1].node);
function closeAll() { while (stack.length) closeTop(); }

scrim?.addEventListener('click', () => {
  for (let i = stack.length - 1; i >= 0; i--) if (stack[i].useScrim) return closeLayer(stack[i].node);
});
document.addEventListener('keydown', (e) => {
  if (!stack.length) return;
  const top = stack[stack.length - 1].node;
  if (e.key === 'Escape') { e.preventDefault(); closeTop(); }
  if (e.key === 'Tab') {
    const f = focusables(top);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    else if (!top.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  }
});

/* ---------------------------------------------------------------- header + announcements */
const header = $('[data-header]');
let lastY = 0;
function onScroll(y) {
  if (!stack.length) {
    const dy = y - lastY;
    if (y > 420 && dy > 3) header.classList.add('is-hidden');
    else if (dy < -3 || y < 420) header.classList.remove('is-hidden');
  }
  lastY = y;
}
if (lenis) lenis.on('scroll', (l) => onScroll(l.scroll));
else addEventListener('scroll', () => onScroll(scrollY), { passive: true });
header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));

const notes = $$('[data-announce] p');
if (notes.length > 1 && !reduced) {
  let n = 0;
  setInterval(() => {
    if (document.hidden) return;
    const cur = notes[n];
    n = (n + 1) % notes.length;
    const next = notes[n];
    cur.classList.replace('is-active', 'is-out');
    cur.setAttribute('aria-hidden', 'true');
    next.classList.remove('is-out');
    next.classList.add('is-active');
    next.removeAttribute('aria-hidden');
    setTimeout(() => cur.classList.remove('is-out'), 750);
  }, 4200);
}

/* ---------------------------------------------------------------- reveal on scroll */
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }),
  { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
);
$$('[data-reveal]').forEach((n) => io.observe(n));
const ready = () => root.classList.add('is-ready');
Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 900))]).then(() => requestAnimationFrame(ready));

/* ---------------------------------------------------------------- toast */
const toastEl = $('[data-toast]');
let toastTimer;
function toast(html, ms = 3400) {
  toastEl.innerHTML = html;
  toastEl.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), ms);
}

/* ---------------------------------------------------------------- bag */
const BAG_KEY = 'retrowindd-bag-v1';
const storage = {
  read() { try { return JSON.parse(localStorage.getItem(BAG_KEY)) || []; } catch { return []; } },
  write(v) { try { localStorage.setItem(BAG_KEY, JSON.stringify(v)); } catch { /* private mode: bag lives for this page only */ } },
};
let bag = storage.read().filter((l) => P[l.id] && l.qty > 0);
const bagEl = $('[data-bag]');

function addToBag(id, size) {
  const line = bag.find((l) => l.id === id && l.size === size);
  if (line) line.qty = Math.min(9, line.qty + 1);
  else bag.unshift({ id, size, qty: 1 });
  saveBag();
  $$('.bag-count').forEach((c) => { c.classList.remove('is-bump'); void c.offsetWidth; c.classList.add('is-bump'); });
}
function saveBag() { storage.write(bag); renderBag(); }

function renderBag() {
  const count = bag.reduce((n, l) => n + l.qty, 0);
  const subtotal = bag.reduce((s, l) => s + P[l.id].price * l.qty, 0);
  const goal = data.site.freeDeliveryOver;
  $$('[data-bag-count]').forEach((n) => (n.textContent = count));
  $$('[data-bag-open]').forEach((b) => b.matches('.header__btn') && b.setAttribute('aria-label', `Bag, ${count} item${count === 1 ? '' : 's'}`));
  if (!bagEl) return;
  $('[data-bag-count-title]', bagEl).textContent = count ? `(${count})` : '';
  $('[data-bag-subtotal]', bagEl).textContent = fmt(subtotal);
  const ship = $('[data-ship]', bagEl);
  ship.classList.toggle('is-free', subtotal >= goal);
  $('[data-ship-text]', bagEl).innerHTML = !count
    ? `Free delivery across Jordan on orders over <strong>${fmt(goal)}</strong>`
    : subtotal >= goal
      ? '<strong>You’ve unlocked free delivery.</strong> Nice.'
      : `You’re <strong>${fmt(goal - subtotal)}</strong> away from free delivery`;
  $('[data-ship-bar]', bagEl).style.transform = `scaleX(${Math.min(1, subtotal / goal)})`;
  $('[data-checkout]', bagEl).disabled = !count;

  const list = $('[data-bag-items]', bagEl);
  if (!count) {
    list.innerHTML = `<div class="drawer__empty">
      <img src="assets/img/brand/crew-128.webp" alt="" width="96" height="96">
      <p class="display" style="color:var(--ink);font-size:18px">Your bag is empty</p>
      <p>The good stuff goes fast. Start with the drop.</p>
      <a class="btn btn--solid" href="shop.html"><span>Shop the drop</span></a></div>`;
    return;
  }
  list.innerHTML = bag
    .map((l, i) => {
      const p = P[l.id];
      return `<div class="line-item" style="animation-delay:${i * 40}ms">
        <button type="button" class="line-item__img" data-quickview="${p.id}" style="background-color:${p.bg}" aria-label="View ${p.name}"><img src="${src(p, true)}" alt="" width="84" height="105"></button>
        <div>
          <h3>${p.name}</h3>
          <p class="line-item__meta">Size ${l.size} · ${p.colour}</p>
          <div class="qty" role="group" aria-label="Quantity for ${p.name}">
            <button type="button" data-dec="${i}" aria-label="Decrease quantity">${ICON.minus}</button>
            <output aria-live="polite">${l.qty}</output>
            <button type="button" data-inc="${i}" aria-label="Increase quantity">${ICON.plus}</button>
          </div>
        </div>
        <div class="line-item__right">
          <span>${fmt(p.price * l.qty)}</span>
          <button type="button" class="line-item__remove" data-remove="${i}">Remove</button>
        </div>
      </div>`;
    })
    .join('');
}

bagEl?.addEventListener('click', (e) => {
  const t = e.target.closest('[data-inc],[data-dec],[data-remove]');
  if (!t) return;
  const i = Number(t.dataset.inc ?? t.dataset.dec ?? t.dataset.remove);
  if ('inc' in t.dataset) bag[i].qty = Math.min(9, bag[i].qty + 1);
  if ('dec' in t.dataset) bag[i].qty -= 1;
  if ('remove' in t.dataset) bag[i].qty = 0;
  bag = bag.filter((l) => l.qty > 0);
  saveBag();
  const again = $(`[data-${Object.keys(t.dataset)[0]}="${i}"]`, bagEl);
  (again || $('[data-close]', bagEl))?.focus();
});

$('[data-checkout]')?.addEventListener('click', () => {
  const wa = (data.site.links.whatsapp || '').replace(/\D/g, '');
  if (wa) {
    const total = bag.reduce((s, l) => s + P[l.id].price * l.qty, 0);
    const lines = bag.map((l) => `• ${P[l.id].name} — size ${l.size} × ${l.qty} (${fmt(P[l.id].price * l.qty)})`);
    const msg = `Hi ${data.site.name}! I'd like to order:\n${lines.join('\n')}\nSubtotal: ${fmt(total)}`;
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  } else {
    toast('Online checkout opens with the next drop. Message us on Instagram to reserve your pieces.', 4800);
  }
});

/* ---------------------------------------------------------------- size pickers */
function selectSize(btn) {
  const group = btn.closest('[role="radiogroup"]');
  $$('[role="radio"]', group).forEach((b) => { b.setAttribute('aria-checked', String(b === btn)); b.tabIndex = b === btn ? 0 : -1; });
  group.classList.remove('is-shake');
}
function initRadioGroups(scope = document) {
  $$('[role="radiogroup"]', scope).forEach((g) => $$('[role="radio"]', g).forEach((b, i) => (b.tabIndex = i === 0 ? 0 : -1)));
}
document.addEventListener('keydown', (e) => {
  const btn = e.target.closest?.('[role="radio"]');
  if (!btn || !['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
  e.preventDefault();
  const all = $$('[role="radio"]', btn.closest('[role="radiogroup"]'));
  const next = all[(all.indexOf(btn) + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + all.length) % all.length];
  selectSize(next);
  next.focus();
});
function nudge(group, cta) {
  group.classList.remove('is-shake'); void group.offsetWidth; group.classList.add('is-shake');
  $('[role="radio"]', group)?.focus({ preventScroll: true });
  if (cta) {
    const label = $('span', cta);
    cta.classList.add('is-warn');
    label.textContent = 'Select a size';
    clearTimeout(cta._t);
    cta._t = setTimeout(() => { cta.classList.remove('is-warn'); label.textContent = 'Add to bag'; }, 1800);
  }
}
function addedToast(p, size) {
  toast(`<img src="${src(p, true)}" alt=""><span><b>${p.name}</b> (${size}) added to your bag</span><button type="button" data-bag-open>View bag</button>`);
}

/* ---------------------------------------------------------------- quick view */
const qv = $('[data-qv]');
function openQuickView(id) {
  const p = P[id];
  if (!p || !qv) return;
  qv.dataset.id = id;
  const media = $('[data-qv-media]', qv);
  media.replaceChildren(el('img', { src: src(p), alt: p.alt, width: p.img.w, height: p.img.h }));
  media.style.backgroundColor = p.bg;
  if (p.badge) media.append(el('span', { className: 'tag', textContent: p.badge }));
  $('[data-qv-cat]', qv).textContent = `${data.categories[p.category]} · ${p.colour}`;
  $('[data-qv-name]', qv).textContent = p.name;
  $('[data-qv-price]', qv).innerHTML = p.was
    ? `<s>${fmt(p.was)}</s>${fmt(p.price)}<span class="save">Save ${Math.round((1 - p.price / p.was) * 100)}%</span>`
    : fmt(p.price);
  $('[data-qv-blurb]', qv).textContent = p.blurb;
  const sizes = $('[data-qv-sizes]', qv);
  sizes.innerHTML = p.sizes.map((s) => `<button type="button" role="radio" aria-checked="false" data-size="${s}">${s}</button>`).join('');
  initRadioGroups(qv);
  $('[data-qv-details]', qv).innerHTML = p.details.map((d) => `<li>${d}</li>`).join('');
  $('.qv__panel', qv).scrollTop = 0;
  const add = $('[data-qv-add]', qv);
  add.textContent = `Add to bag — ${fmt(p.price)}`;
  openLayer(qv, { focus: '[data-qv-sizes] [role="radio"]' });
}
$('[data-qv-add]')?.addEventListener('click', () => {
  const p = P[qv.dataset.id];
  const group = $('[data-qv-sizes]', qv);
  const sel = $('[aria-checked="true"]', group);
  if (!sel) return nudge(group);
  addToBag(p.id, sel.dataset.size);
  closeLayer(qv);
  setTimeout(() => openLayer(bagEl, { focus: '[data-close]' }), 250);
});

/* ---------------------------------------------------------------- search */
const searchEl = $('[data-search]');
const searchInput = $('[data-search-input]');
const index = data.products.map((p) => ({ p, hay: `${p.name} ${data.categories[p.category]} ${p.colour} ${p.badge || ''} ${p.blurb}`.toLowerCase() }));
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function runSearch() {
  const q = searchInput.value.trim();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = terms.length ? index.filter((x) => terms.every((t) => x.hay.includes(t))).map((x) => x.p) : data.products;
  const mark = (s) => (terms.length ? s.replace(new RegExp(`(${terms.map(escapeRe).join('|')})`, 'gi'), '<mark>$1</mark>') : s);
  $('[data-search-count]').textContent = terms.length ? `${hits.length} result${hits.length === 1 ? '' : 's'} for “${q}”` : `Everything in the drop — ${pad(hits.length)} pieces`;
  $('[data-search-results]').innerHTML = hits.length
    ? hits.map((p, i) => `<button type="button" class="result" data-quickview="${p.id}" style="--i:${i}">
        <span class="result__img" style="background-color:${p.bg};display:block"><img src="${src(p, true)}" alt="" width="420" height="525" loading="lazy"></span>
        <p><span>${mark(p.name)}</span><span>${fmt(p.price)}</span></p></button>`).join('')
    : `<p style="grid-column:1/-1;color:var(--muted)">Nothing matches that — try “fleece” or “jacket”.</p>`;
}
searchInput?.addEventListener('input', runSearch);
searchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { const first = $('[data-search-results] [data-quickview]'); first && openQuickView(first.dataset.quickview); }
});

/* ---------------------------------------------------------------- global clicks */
document.addEventListener('click', (e) => {
  const t = e.target;
  const sizeBtn = t.closest('[role="radio"][data-size]');
  if (sizeBtn) return selectSize(sizeBtn);

  const add = t.closest('[data-add]');
  if (add) {
    const card = add.closest('.card');
    const group = $('.sizes', card);
    const sel = $('[aria-checked="true"]', group);
    if (!sel) return nudge(group, add);
    const p = P[add.dataset.add];
    addToBag(p.id, sel.dataset.size);
    const label = $('span', add);
    add.classList.add('is-added');
    label.textContent = 'Added';
    clearTimeout(add._t);
    add._t = setTimeout(() => { add.classList.remove('is-added'); label.textContent = 'Add to bag'; }, 1800);
    return addedToast(p, sel.dataset.size);
  }

  const quick = t.closest('[data-quickview]');
  if (quick && !quick.closest('[data-marquee].was-dragged')) {
    if (quick.closest('[data-bag]')) closeLayer(bagEl);
    return openQuickView(quick.dataset.quickview);
  }

  if (t.closest('[data-bag-open]')) {
    toastEl.classList.remove('is-show');
    if (qv && stack.some((l) => l.node === qv)) closeLayer(qv);
    return openLayer(bagEl, { focus: '[data-close]' });
  }
  if (t.closest('[data-search-open]')) {
    openLayer(searchEl, { focus: '[data-search-input]' });
    return runSearch();
  }
  const chip = t.closest('[data-chip]');
  if (chip) { searchInput.value = chip.dataset.chip; runSearch(); return searchInput.focus(); }
  if (t.closest('[data-menu-open]')) {
    const btn = $('[data-menu-open]');
    btn.setAttribute('aria-expanded', 'true');
    return openLayer($('[data-menu]'), { useScrim: false, onClose: () => btn.setAttribute('aria-expanded', 'false') });
  }
  if (t.closest('[data-reels-open]')) return reels.open();

  const close = t.closest('[data-close]');
  if (close) { const layer = stack.find((l) => l.node.contains(close)); if (layer) return closeLayer(layer.node); }

  const social = t.closest('[data-social]');
  if (social && social.getAttribute('href') === '#') {
    e.preventDefault();
    return toast('Our socials are launching with the drop — stay tuned.');
  }
  if (t.closest('.menu__nav a')) closeLayer($('[data-menu]'));
});

/* ---------------------------------------------------------------- hero slider */
(function hero() {
  const frame = $('[data-slider]');
  if (!frame) return;
  const visual = frame.closest('.hero__visual');
  const slides = $$('.hero__slide', frame);
  const bars = $$('[data-slide-to]', visual);
  const tag = $('[data-hero-tag]', frame);
  const inner = $('[data-hero-tag-inner]', frame);
  const info = JSON.parse($('[data-hero-data]').textContent);
  let i = 0;
  visual.style.setProperty('--dur', '6.5s');

  function paintBars() {
    bars.forEach((b, k) => {
      b.classList.toggle('is-done', k < i || (reduced && k === i));
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', String(k === i));
    });
    if (!reduced) { void bars[i].offsetWidth; bars[i].classList.add('is-active'); }
  }
  function go(n) {
    n = (n + slides.length) % slides.length;
    if (n === i) return;
    const prev = slides[i];
    const next = slides[n];
    slides.forEach((s) => s !== prev && s.classList.remove('is-prev'));
    void next.offsetWidth;
    prev.classList.replace('is-active', 'is-prev');
    prev.setAttribute('aria-hidden', 'true');
    next.classList.add('is-active');
    next.removeAttribute('aria-hidden');
    clearTimeout(prev._t);
    prev._t = setTimeout(() => prev.classList.remove('is-prev'), 1300);
    i = n;
    paintBars();
    tag.classList.add('is-swapping');
    clearTimeout(tag._t);
    tag._t = setTimeout(() => {
      const d = info[i];
      inner.innerHTML = `<span>${pad(i + 1)} / ${d.name}</span><span>${d.price}</span>`;
      tag.dataset.quickview = d.id;
      tag.classList.replace('is-swapping', 'is-entering');
      void inner.offsetWidth;
      tag.classList.remove('is-entering');
    }, 380);
  }
  bars.forEach((b, k) => {
    b.addEventListener('click', () => go(k));
    $('span', b).addEventListener('animationend', () => go(i + 1));
  });
  // swipe
  let sx = null;
  frame.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') sx = e.clientX; });
  frame.addEventListener('pointerup', (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
  });
  // pause when off-screen or tab hidden
  new IntersectionObserver(([en]) => visual.classList.toggle('is-paused', !en.isIntersecting)).observe(visual);
  document.addEventListener('visibilitychange', () => visual.classList.toggle('is-paused', document.hidden));
  paintBars();
})();

/* ---------------------------------------------------------------- featured marquee (auto-scroll + drag) */
(function marquee() {
  const wrap = $('[data-marquee]');
  if (!wrap) return;
  const track = $('[data-marquee-track]', wrap);
  const originals = [...track.children];
  let setW = 0;
  let x = 0, v = 0;
  const base = reduced ? 0 : -0.035; // px per ms
  let hovering = false, dragging = false, visible = true;
  let startX = 0, lastX = 0, lastT = 0, moved = 0;

  function build() {
    $$('[data-clone]', track).forEach((n) => n.remove());
    setW = originals.reduce((w, n) => w + n.getBoundingClientRect().width, 0);
    const copies = Math.max(1, Math.ceil((innerWidth * 2) / setW));
    for (let c = 0; c < copies; c++)
      originals.forEach((n) => {
        const k = n.cloneNode(true);
        k.dataset.clone = '';
        k.setAttribute('aria-hidden', 'true');
        k.tabIndex = -1;
        track.append(k);
      });
  }
  build();
  let rw;
  addEventListener('resize', () => { clearTimeout(rw); rw = setTimeout(build, 200); });

  let prev = performance.now();
  function tick(now) {
    const dt = Math.min(48, now - prev);
    prev = now;
    if (!dragging) {
      const target = hovering ? 0 : base;
      v += (target - v) * Math.min(1, dt * 0.004);
      x += v * dt;
    }
    if (setW) x = ((x % setW) - setW) % setW; // keep x in (-setW, 0]
    track.style.transform = `translate3d(${x}px,0,0)`;
    if (visible) requestAnimationFrame(tick);
  }
  new IntersectionObserver(([en]) => {
    const was = visible;
    visible = en.isIntersecting;
    if (visible && !was) { prev = performance.now(); requestAnimationFrame(tick); }
  }).observe(wrap);
  requestAnimationFrame(tick);

  wrap.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    moved = 0;
    startX = lastX = e.clientX;
    lastT = performance.now();
    v = 0;
    wrap.classList.add('is-dragging');
    cursor?.classList.add('is-down');
  });
  addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    x += dx;
    moved = Math.max(moved, Math.abs(e.clientX - startX));
    v = dx / Math.max(1, now - lastT);
    lastX = e.clientX;
    lastT = now;
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    wrap.classList.remove('is-dragging');
    cursor?.classList.remove('is-down');
    if (moved > 6) { wrap.classList.add('was-dragged'); setTimeout(() => wrap.classList.remove('was-dragged'), 50); }
  };
  addEventListener('pointerup', end);
  addEventListener('pointercancel', end);
  wrap.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); x -= e.deltaX; v = 0; }
  }, { passive: false });
  wrap.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hovering = true; });
  wrap.addEventListener('pointerleave', () => (hovering = false));
  wrap.addEventListener('focusin', () => (hovering = true));
  wrap.addEventListener('focusout', () => (hovering = false));

  // custom "drag" cursor
  const cursor = finePointer ? $('[data-cursor]') : null;
  if (cursor) {
    wrap.addEventListener('pointermove', (e) => {
      cursor.style.setProperty('--x', `${e.clientX}px`);
      cursor.style.setProperty('--y', `${e.clientY}px`);
      cursor.classList.add('is-on');
    });
    wrap.addEventListener('pointerleave', () => cursor.classList.remove('is-on', 'is-down'));
  }
})();

/* ---------------------------------------------------------------- reels (story-style viewer) */
const reels = (function () {
  const node = $('[data-reels]');
  if (!node) return { open() {} };
  const slidesWrap = $('[data-reels-slides]', node);
  const barsWrap = $('[data-reels-bars]', node);
  const toggle = $('[data-reels-toggle]', node);
  const items = [...data.products].sort((a, b) => (a.order.featured || 99) - (b.order.featured || 99));
  const DUR = 5200;
  let k = 0, built = false, paused = false, held = false;

  function build() {
    node.style.setProperty('--dur', `${DUR}ms`);
    slidesWrap.innerHTML = items.map((p, n) => `<div class="reel" style="--bg-c:${p.bg}" aria-hidden="true">
      <img src="${src(p)}" alt="${p.alt}" width="${p.img.w}" height="${p.img.h}" ${n > 1 ? 'loading="lazy"' : ''}>
      <div class="reel__shade"></div>
      <div class="reel__cap">
        <p class="label">${pad(n + 1)} / ${data.categories[p.category]}</p>
        <h3 class="display">${p.name}</h3>
        <p>${p.was ? `<s style="opacity:.7">${fmt(p.was)}</s> ` : ''}${fmt(p.price)}</p>
        <button type="button" class="btn btn--solid" data-reel-shop="${p.id}"><span>Shop this</span></button>
      </div></div>`).join('');
    barsWrap.innerHTML = items.map(() => '<span><i></i></span>').join('');
    $$('i', barsWrap).forEach((bar) => bar.addEventListener('animationend', () => show(k + 1)));
    built = true;
  }
  function show(n) {
    k = (n + items.length) % items.length;
    $$('.reel', slidesWrap).forEach((r, j) => { r.classList.toggle('is-active', j === k); r.setAttribute('aria-hidden', String(j !== k)); });
    $$('span', barsWrap).forEach((b, j) => {
      b.classList.remove('is-active');
      b.classList.toggle('is-done', j < k || (reduced && j === k));
    });
    const img = $('.reel.is-active img', slidesWrap);
    if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
    if (!reduced) { const bar = $$('span', barsWrap)[k]; void bar.offsetWidth; bar.classList.add('is-active'); }
  }
  function setPaused(v) {
    paused = v;
    node.classList.toggle('is-paused', paused || held);
    toggle.innerHTML = paused ? ICON.play : ICON.pause;
    toggle.setAttribute('aria-label', paused ? 'Play' : 'Pause');
  }
  $('[data-reels-prev]', node).addEventListener('click', () => show(k - 1));
  $('[data-reels-next]', node).addEventListener('click', () => show(k + 1));
  toggle.addEventListener('click', () => setPaused(!paused));
  const frame = $('[data-reels-frame]', node);
  frame.addEventListener('pointerdown', (e) => { if (!e.target.closest('button')) { held = true; node.classList.add('is-paused'); } });
  const release = () => { held = false; node.classList.toggle('is-paused', paused); };
  frame.addEventListener('pointerup', release);
  frame.addEventListener('pointerleave', release);
  node.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(k + 1);
    if (e.key === 'ArrowLeft') show(k - 1);
  });
  node.addEventListener('click', (e) => {
    const shop = e.target.closest('[data-reel-shop]');
    if (shop) { closeLayer(node); setTimeout(() => openQuickView(shop.dataset.reelShop), 300); }
  });
  // close when clicking the dark backdrop around the frame
  node.addEventListener('click', (e) => { if (e.target === node || e.target.classList.contains('reels__stage')) closeLayer(node); });
  return {
    open() {
      if (!built) build();
      setPaused(false);
      openLayer(node, { useScrim: false, focus: '[data-reels-next]' });
      show(0);
    },
  };
})();

/* ---------------------------------------------------------------- newsletter */
$$('[data-newsletter]').forEach((form) =>
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('input', form);
    const msg = $('.newsletter__msg', form);
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.classList.add('is-error');
      input.setAttribute('aria-invalid', 'true');
      return input.focus();
    }
    input.removeAttribute('aria-invalid');
    msg.classList.remove('is-error');
    msg.textContent = 'You’re on the list ✦ First access to the next drop is yours.';
    form.classList.add('is-done');
  })
);

/* ---------------------------------------------------------------- shop filters */
(function shop() {
  const grid = $('[data-shop-grid]');
  if (!grid) return;
  const cards = $$('.card', grid);
  const chips = $$('.filters [data-filter]');
  const select = $('[data-sort]');
  const empty = $('[data-empty]');
  const titleEl = $('[data-shop-title]');
  const countEl = $('[data-shop-count]');
  const ids = chips.map((c) => c.dataset.filter);
  const params = new URLSearchParams(location.search);
  let filter = params.get('c') || params.get('f') || 'all';
  if (!ids.includes(filter)) filter = 'all';
  let sort = params.get('sort') || (filter === 'new' ? 'newest' : 'featured');
  const featuredOrder = new Map(cards.map((c, i) => [c, i]));
  const titles = Object.fromEntries(chips.map((c) => [c.dataset.filter, c.textContent]));
  titles.all = 'Shop the drop';

  const match = (c) =>
    filter === 'all' || c.dataset.category === filter || (filter === 'new' && c.dataset.new === 'true') || (filter === 'sale' && c.dataset.badge === 'sale');

  function apply(updateUrl) {
    chips.forEach((c) => { const on = c.dataset.filter === filter; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
    select.value = sort;
    const sorted = [...cards].sort((a, b) => {
      if (sort === 'price-asc') return a.dataset.price - b.dataset.price;
      if (sort === 'price-desc') return b.dataset.price - a.dataset.price;
      if (sort === 'newest') return b.dataset.arrived.localeCompare(a.dataset.arrived);
      return featuredOrder.get(a) - featuredOrder.get(b);
    });
    grid.append(...sorted);
    let n = 0;
    sorted.forEach((c) => {
      const on = match(c);
      c.classList.toggle('is-hidden', !on);
      if (on) { c.style.setProperty('--d', `${(n++ % 4) * 60}ms`); if (updateUrl) { c.classList.remove('is-in'); void c.offsetWidth; c.classList.add('is-in'); } }
    });
    empty.hidden = n > 0;
    titleEl.textContent = titles[filter];
    countEl.textContent = pad(n);
    document.title = `${filter === 'all' ? 'Shop' : titles[filter]} — ${data.site.name}`;
    if (updateUrl) {
      const q = new URLSearchParams();
      if (filter !== 'all') q.set(['new', 'sale'].includes(filter) ? 'f' : 'c', filter);
      if (sort !== 'featured') q.set('sort', sort);
      history.replaceState(null, '', `${location.pathname}${q.size ? `?${q}` : ''}`);
    }
  }
  document.addEventListener('click', (e) => {
    const f = e.target.closest('[data-filter]');
    if (!f) return;
    filter = f.dataset.filter;
    apply(true);
  });
  select.addEventListener('change', () => { sort = select.value; apply(true); });
  apply(false);
})();

/* ---------------------------------------------------------------- boot */
initRadioGroups();
renderBag();
$$('[data-year]').forEach((n) => (n.textContent = new Date().getFullYear()));
