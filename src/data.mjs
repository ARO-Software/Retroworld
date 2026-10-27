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
    alt: 'Olive puffer jacket with a black yoke on an illustrated model in front of sandstone arches',
    blurb:
      'A boxy, cloud-soft puffer in washed olive with a contrast black yoke. Warm enough for January nights in Irbid, light enough to throw on every day.',
    details: ['Boxy fit, sits at the hip', 'Stand collar with full zip', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-18',
    order: { hero: 1, featured: 6 },
  },
  {
    id: 'red-training-top',
    name: 'Red training top',
    category: 'tops',
    price: 32,
    was: 40,
    badge: 'Sale',
    colour: 'Club red',
    sizes: ['S', 'M', 'L', 'XL'],
    img: { w: 579, h: 799 },
    bg: '#e1ddd4',
    alt: 'Red football training top with a sponsor print on an illustrated model over a lilac retro grid',
    blurb:
      'An early-2000s football training top in loud club red, padded through the body with the original sponsor print. Terrace energy, every day.',
    details: ['Relaxed fit', 'Padded body, ribbed cuffs and hem', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-12',
    order: { hero: 4, featured: 1, arrivals: 1 },
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
    img: { w: 595, h: 802 },
    bg: '#e1ddd4',
    alt: 'Camel cable-knit quarter-zip sweater on an illustrated model in front of retro stripes and a court',
    blurb:
      'Chunky cable-knit quarter-zip in warm camel, still carrying its original tag. The kind of knit that only gets better with every winter.',
    details: ['Regular fit', 'Quarter zip with a high collar', 'New with tags'],
    arrived: '2026-10-08',
    order: { hero: 2, featured: 2 },
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
    img: { w: 594, h: 799 },
    bg: '#e1ddd4',
    alt: 'Heather grey half-zip fleece sweatshirt on an illustrated model against a yellow wall',
    blurb:
      'Brushed-back heather grey fleece with a half zip and stand collar. Soft, heavy and easy to live in — the piece you will reach for first.',
    details: ['Relaxed fit', 'Half zip, stand collar, ribbed hem', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-22',
    order: { hero: 3, featured: 3, arrivals: 3 },
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
    img: { w: 592, h: 799 },
    bg: '#e1ddd4',
    alt: 'Grey fleece joggers styled with a white tee on an illustrated model with colourful geometric shapes',
    blurb:
      'Classic heather grey fleece joggers with a drawcord waist and cuffed ankles. Pair with anything in the drop — or the half-zip for the full set.',
    details: ['Tapered fit with cuffed ankles', 'Drawcord waist, side pockets', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-05',
    order: { featured: 4, arrivals: 4 },
  },
  {
    id: 'sage-quarter-zip',
    name: 'Sage quarter-zip top',
    category: 'tops',
    price: 34,
    was: null,
    badge: 'New',
    colour: 'Sage',
    sizes: ['S', 'M', 'L', 'XL'],
    img: { w: 558, h: 703 },
    bg: '#e1ddd4',
    alt: 'Sage green quarter-zip training top on an illustrated model in front of a sunset city skyline',
    blurb:
      'A lightweight sage quarter-zip training top with a clean, athletic cut. Layer it under the puffer or wear it on its own.',
    details: ['Athletic fit', 'Quarter zip, thumb-friendly cuffs', 'Hand-picked vintage, cleaned and checked'],
    arrived: '2026-10-24',
    order: { featured: 5, arrivals: 2 },
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
