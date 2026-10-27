// Single source of truth for the store. Edit products, copy and links here,
// then run `npm run build`. Prices are in Jordanian dinar (JD).

export const site = {
  name: 'RetroWindd',
  tagline: 'Vintage & retro streetwear, hand-picked in Irbid.',
  description:
    'RetroWindd is a vintage and retro streetwear label from Irbid, Jordan. Hand-picked jackets, fleeces, knitwear and joggers, dropped in small batches.',
  drop: 'Drop 01 — Cold Season',
  city: 'Irbid, Jordan',
  currency: 'JD',
  freeDeliveryOver: 50,
  // Social + ordering links. Leave whatsapp empty to keep checkout in "coming soon" mode;
  // set it to an international number (e.g. '9627XXXXXXXX') to send orders to WhatsApp.
  links: {
    instagram: '#',
    tiktok: '#',
    whatsapp: '',
  },
  announcements: [
    'Free delivery across Jordan over JD 50',
    'Drop 01 — Cold Season is live now',
    'Hand-picked · Cleaned · Shipped from Irbid',
  ],
};

export const categories = [
  { id: 'jackets', name: 'Jackets', image: 'olive-puffer-jacket' },
  { id: 'fleece', name: 'Fleece & Hoodies', image: 'grey-half-zip' },
  { id: 'knitwear', name: 'Knitwear', image: 'cable-knit-sweater' },
  { id: 'joggers', name: 'Joggers', image: 'grey-fleece-joggers' },
];

// Extra filter that is not one of the four homepage collections.
export const extraCategories = [{ id: 'tops', name: 'Tops' }];

// `shot: 'model'` marks real on-model photography; those lead the hero and the reels.
// img.md is the optional 720px middle size; `wide` is a landscape lookbook banner.
export const products = [
  {
    id: 'olive-puffer-jacket',
    name: 'Olive puffer jacket',
    category: 'jackets',
    price: 89,
    was: null,
    badge: null,
    colour: 'Washed olive / black',
    sizes: ['S', 'M', 'L', 'XL'],
    img: { w: 1000, h: 1257 },
    bg: '#e1ddd4',
    alt: 'Olive puffer jacket with a black yoke on an illustrated figure',
    blurb:
      'A boxy, cloud-soft puffer in washed olive with a contrast black yoke. Warm enough for January nights in Irbid, light enough to throw on every day.',
    details: ['Boxy fit, sits at the hip', 'Stand collar with full zip', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-18',
    order: { featured: 6 },
  },
  {
    id: 'red-training-top',
    name: 'Red training top',
    category: 'tops',
    price: 32,
    was: 40,
    badge: 'Sale',
    colour: 'Club red / navy',
    sizes: ['S', 'M', 'L', 'XL'],
    shot: 'model',
    img: { w: 1100, h: 1366, md: 720 },
    bg: '#d8d3c9',
    alt: 'Model in a red long-sleeve football training top with navy panels and a white sponsor print, on a stone-lined street',
    blurb:
      'A 2000s football training top in loud club red, with navy side panels, ribbed navy cuffs and the original sponsor print. Terrace energy, every day.',
    details: ['Regular fit, long sleeves', 'Navy side panels and ribbed cuffs', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-12',
    order: { hero: 1, featured: 1, arrivals: 1 },
  },
  {
    id: 'cable-knit-sweater',
    name: 'Cable-knit sweater',
    category: 'knitwear',
    price: 54,
    was: null,
    badge: null,
    colour: 'Camel',
    sizes: ['S', 'M', 'L', 'XL'],
    shot: 'model',
    img: { w: 470, h: 578 },
    wide: { w: 2000, h: 578, md: 1000 },
    bg: '#d8d3c9',
    alt: 'Model in a camel cable-knit quarter-zip sweater in a sandstone alley',
    blurb:
      'Chunky cable-knit quarter-zip in warm camel with a high zip collar. The kind of knit that only gets better with every winter.',
    details: ['Regular fit', 'Quarter zip with a high collar', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-08',
    order: { featured: 2, look: 1 },
  },
  {
    id: 'grey-half-zip',
    name: 'Grey half-zip sweatshirt',
    category: 'fleece',
    price: 39,
    was: null,
    badge: 'New',
    colour: 'Heather grey',
    sizes: ['S', 'M', 'L', 'XL'],
    shot: 'model',
    img: { w: 1100, h: 1474, md: 720 },
    bg: '#d8d3c9',
    alt: 'Model in a heather grey half-zip sweatshirt with navy sleeve stripes and navy trousers on a city street',
    blurb:
      'Heavyweight heather grey fleece with a half zip, stand collar and navy-and-charcoal sleeve stripes. Boxy, soft and made for layering.',
    details: ['Relaxed, dropped-shoulder fit', 'Half zip with a stand collar', 'Striped sleeves, ribbed cuffs and hem'],
    arrived: '2026-10-22',
    order: { hero: 2, featured: 3, arrivals: 3 },
  },
  {
    id: 'grey-fleece-joggers',
    name: 'Grey fleece joggers',
    category: 'joggers',
    price: 36,
    was: 45,
    badge: 'Sale',
    colour: 'Heather grey',
    sizes: ['S', 'M', 'L', 'XL'],
    shot: 'model',
    img: { w: 1100, h: 1474, md: 720 },
    bg: '#d8d3c9',
    alt: 'Model in heather grey fleece joggers, a white tee and white trainers',
    blurb:
      'Classic heather grey fleece joggers with a drawcord waist and cuffed ankles. Pair with anything in the drop — or the half-zip for the full set.',
    details: ['Tapered fit with cuffed ankles', 'Drawcord waist, side pockets', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-05',
    order: { hero: 3, featured: 4, arrivals: 4 },
  },
  {
    id: 'sage-quarter-zip',
    name: 'Sage quarter-zip top',
    category: 'tops',
    price: 34,
    was: null,
    badge: 'New',
    colour: 'Deep green',
    sizes: ['S', 'M', 'L', 'XL'],
    shot: 'model',
    img: { w: 470, h: 578 },
    wide: { w: 2000, h: 578, md: 1000 },
    bg: '#d8d3c9',
    alt: 'Model sitting on stone steps in a deep green quarter-zip sweatshirt and beige chinos',
    blurb:
      'A soft, brushed quarter-zip in deep green with a relaxed, dropped-shoulder cut. Layer it under the puffer or wear it on its own.',
    details: ['Relaxed fit', 'Quarter zip with a stand collar', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-24',
    order: { featured: 5, arrivals: 2, look: 2 },
  },
];

export const info = [
  {
    title: 'Delivery',
    text: 'Next-day in Irbid, 1–3 working days across Jordan. Free on orders over JD 50, otherwise a flat JD 3.',
  },
  {
    title: 'Returns',
    text: 'Exchange or store credit within 7 days on unworn pieces with the tags still attached.',
  },
  {
    title: 'Sizing',
    text: 'Vintage fits vary from label to label. Check the size guide or message us before you order.',
  },
];
