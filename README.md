# RetroWindd

Storefront site for **RetroWindd** — vintage & retro streetwear from Irbid, Jordan. Built from the homepage mockup, as a fast static site with no runtime dependencies.

## What's in it

- **Home** — hero slider, a draggable auto-scrolling featured strip, shop by category, new arrivals, our story, delivery/returns/sizing, newsletter.
- **Shop** — every piece with category / new / sale filters and sorting (`shop.html?c=jackets`, `?f=new`, `?f=sale`).
- **About** and **Help** (delivery, returns, size guide, contact) pages, plus a custom 404.
- **Bag** drawer (saved in the browser) with a free-delivery progress bar, **search**, **quick view** with size picker, and a story-style **reels** viewer.
- Smooth scrolling ([Lenis](https://github.com/darkroomengineering/lenis)), reveal animations, and full `prefers-reduced-motion` support.

## Editing content

Everything lives in [`src/data.mjs`](src/data.mjs): products, prices, copy, announcement bar messages and social links.

- **Add a product:** add an entry to `products` and drop two images in `public/assets/img/products/` named `<id>.webp` (~600px wide) and `<id>-sm.webp` (420px wide).
- **Social links:** set `links.instagram` / `links.tiktok`.
- **Checkout:** set `links.whatsapp` to an international number (e.g. `9627XXXXXXXX`) and the bag's checkout button sends the order to WhatsApp. Leave it empty to show a "checkout coming soon" message.
- **Newsletter:** the form validates and confirms on the page but does not send emails anywhere yet. Connect it to Mailchimp, Klaviyo or Formspree before launch.

## Develop

Requires Node 20+. No packages to install.

```bash
npm run dev     # builds to dist/ and serves http://localhost:4173
npm run build   # just build
```

## Deploy

Every push to `main` (or the working branch) runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repo settings, **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**.
