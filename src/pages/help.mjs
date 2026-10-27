import { site } from '../data.mjs';
import { layout, money, icon } from '../components.mjs';

export const file = 'help.html';

export default function render() {
  const sizes = [
    ['S', '52–54', '68–70', '46–48'],
    ['M', '55–57', '70–72', '49–51'],
    ['L', '58–61', '72–74', '52–54'],
    ['XL', '62–65', '74–76', '55–58'],
  ];

  const body = `
<section class="page-hero container">
  <p class="eyebrow" data-reveal><span class="eyebrow__rule"></span>Help / ${site.city}</p>
  <h1 class="display page-hero__title" data-reveal style="--d:80ms">Need a hand?</h1>
  <p class="page-hero__lede" data-reveal style="--d:160ms">Everything you need to know about delivery, returns and finding your fit. Still stuck? Message us — a real person from the crew will reply.</p>
  <nav class="help-nav" aria-label="Help topics" data-reveal style="--d:220ms">
    <a class="chip" href="#delivery">Delivery</a><a class="chip" href="#returns">Returns</a><a class="chip" href="#sizing">Size guide</a><a class="chip" href="#contact">Contact</a>
  </nav>
</section>

<div class="container help">
  <section id="delivery" class="help__block" data-reveal>
    <p class="info__num">01</p>
    <h2 class="display">Delivery</h2>
    <div class="help__body">
      <p>We ship from Irbid to every governorate in Jordan.</p>
      <ul class="help__list">
        <li><span>Irbid</span><span>Next working day</span></li>
        <li><span>Amman, Zarqa &amp; the north</span><span>1–2 working days</span></li>
        <li><span>Rest of Jordan</span><span>2–3 working days</span></li>
        <li><span>Delivery fee</span><span>${money(3)} — free over ${money(site.freeDeliveryOver)}</span></li>
      </ul>
      <p>Cash on delivery is available everywhere we ship. You will get a message from the courier on the day your order goes out.</p>
    </div>
  </section>

  <section id="returns" class="help__block" data-reveal>
    <p class="info__num">02</p>
    <h2 class="display">Returns</h2>
    <div class="help__body">
      <p>Changed your mind? You have 7 days from delivery to exchange a piece or swap it for store credit.</p>
      <ul class="help__list">
        <li><span>Condition</span><span>Unworn, unwashed, tags attached</span></li>
        <li><span>Window</span><span>7 days from delivery</span></li>
        <li><span>Options</span><span>Exchange or store credit</span></li>
      </ul>
      <p>Because most pieces are one-offs, an exchange depends on what is still on the rail. Sale items are final.</p>
    </div>
  </section>

  <section id="sizing" class="help__block" data-reveal>
    <p class="info__num">03</p>
    <h2 class="display">Size guide</h2>
    <div class="help__body">
      <p>Vintage sizing changes from label to label and decade to decade, so we go by measurements. All measurements are taken flat, in centimetres.</p>
      <div class="table-wrap" data-lenis-prevent>
        <table class="size-table">
          <thead><tr><th scope="col">Size</th><th scope="col">Pit to pit</th><th scope="col">Length</th><th scope="col">Waist (joggers)</th></tr></thead>
          <tbody>${sizes.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
      <p class="help__tip">${icon.star} Between sizes? Size up for the relaxed, boxy fit we style everything in.</p>
    </div>
  </section>

  <section id="contact" class="help__block" data-reveal>
    <p class="info__num">04</p>
    <h2 class="display">Contact</h2>
    <div class="help__body">
      <p>The fastest way to reach us is a DM. We usually reply within a few hours, every day except Friday.</p>
      <div class="help__contact">
        <a class="btn btn--solid" href="${site.links.instagram}" target="_blank" rel="noopener" data-social>${icon.instagram}<span>Instagram</span></a>
        <a class="btn btn--ghost" href="${site.links.tiktok}" target="_blank" rel="noopener" data-social>${icon.tiktok}<span>TikTok</span></a>
      </div>
    </div>
  </section>
</div>`;

  return layout({ title: `Help — ${site.name}`, page: 'help', body });
}
