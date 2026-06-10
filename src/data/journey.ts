/**
 * Career journey milestones for the homepage timeline + impact map.
 *
 * NOTE: geo data (cities, reach) is drafted from verified public facts and
 * reasonable inference — flagged for Kireeti's review. Reach values are ISO
 * 3166-1 alpha-2 country codes, or 'worldwide'.
 */
export interface Milestone {
  id: string;
  years: string;
  title: string;
  role: string;
  description: string;
  workSlugs: string[];
  highlight?: string;
  geo: {
    base?: string;
    hq?: string;
    locations?: string[];
    reach: 'worldwide' | string[];
    users?: string;
  };
}

export const journey: Milestone[] = [
  {
    id: 'design-roots',
    years: '2014–2017',
    title: 'Design roots',
    role: 'Product & Visual Designer',
    description:
      'Started in design — interfaces, identities and interaction. Built Tymline for short-form blogging and shipped the first client products that turned craft into a career.',
    workSlugs: [],
    geo: {
      base: 'hyderabad',
      reach: ['IN'],
    },
  },
  {
    id: 'agency',
    years: '2017–2019',
    title: 'Design consulting & founding teams',
    role: 'Co-founder, Design Agency',
    description:
      'Co-founded a product design agency. Helped cab drivers recover taxes with Cabdost, built bite-sized founder learning with Station91, a data-collection PWA for a medical NGO, and design systems for fintech clients.',
    workSlugs: ['cabdost', 'station91'],
    highlight: '5,000 drivers · ~$175K recovered · 35x business growth',
    geo: {
      base: 'hyderabad',
      locations: ['chennai', 'bangalore'],
      reach: ['IN'],
      users: '100K+',
    },
  },
  {
    id: 'imux',
    years: '2019–2020',
    title: 'Founding Imux',
    role: 'Co-founder',
    description:
      'Co-founded Imux — a natural-language interface to databases (NLiDB) SaaS. Raised seed funding and learned what zero-to-one really costs.',
    workSlugs: ['imux'],
    highlight: 'Seed funded',
    geo: {
      base: 'hyderabad',
      locations: ['sanfrancisco'],
      reach: ['IN', 'US'],
    },
  },
  {
    id: 'oneplus',
    years: '2020–2024',
    title: 'OnePlus at global scale',
    role: 'Senior PM & Lead, Product Strategy',
    description:
      'Led OnePlus Shelf ground-up redesign (4x MAU), scaled Scout to 50+ countries, shipped India’s first food-delivery tracking on Always-on Display, and drove partnerships with Spotify, Netflix, Snapchat, Zomato, Swiggy, Blinkit and Grab.',
    workSlugs: [
      'oneplus-shelf',
      'oneplus-scout',
      'food-delivery-aod',
      'spotify-on-shelf',
      'zomato-blinkit-shelf',
      'nearby-charging-stations',
    ],
    highlight: 'Employee of the Year 2021 · 200M+ users',
    geo: {
      base: 'hyderabad',
      hq: 'shenzhen',
      locations: ['bangalore', 'gurgaon', 'stockholm'],
      reach: 'worldwide',
      users: '200M+',
    },
  },
  {
    id: 'builder',
    years: '2024–present',
    title: 'Independent builder & AI',
    role: 'Founder · AI Builder',
    description:
      'Building with AI end-to-end: Product f() — an AI operating system for product teams; Labh, a SEBI-certified investment platform; Petfolk luxury pet care; Pro Studio for film pre-production; Itihasa Collective for screenwriters.',
    workSlugs: ['product-f', 'labh', 'petfolk', 'pro-studio-space', 'itihasa-collective', 'reporting-hub'],
    highlight: 'Currently building Product f()',
    geo: {
      base: 'calgary',
      locations: ['hyderabad', 'mumbai'],
      reach: ['CA', 'IN', 'US'],
    },
  },
];
