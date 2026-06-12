/**
 * Career journey milestones for the homepage timeline + impact map.
 *
 * Reach values are ISO 3166-1 alpha-2 country codes, or 'worldwide'.
 * `users` is the map-footer legend line for the chapter.
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
    base?: string | string[];
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
    title: 'Startups, and Product Management',
    role: 'Product Manager & Visual Design',
    description:
      'Spent three years inside India’s early-stage ecosystem, across 150+ startup teams at incubation stage, watching the same mistakes repeat: building before validating, designing before understanding. Started doing the product and design work myself, interfaces, visual, experience, interactions, because no one else was doing it systematically.',
    workSlugs: [],
    geo: {
      base: 'vizag',
      hq: 'kochi',
      reach: ['IN'],
      users: '150+ startups · 500+ builders',
    },
  },
  {
    id: 'agency',
    years: '2017–2019',
    title: 'Product Agency & founding teams',
    role: 'Founder, Coalition House',
    description:
      'Founded a product agency. Helped cab drivers recover taxes with Cabdost, built bite-sized founder learning with Station91, a data-collection PWA for a medical NGO, and design systems for fintech clients.',
    workSlugs: ['cabdost', 'station91'],
    highlight: '5,000 drivers · ~$175K recovered · 35x business growth',
    geo: {
      base: 'bangalore',
      locations: ['mumbai', 'delhi', 'newyork', 'brisbane'],
      reach: ['IN', 'AU', 'US'],
      users: '100k+ users',
    },
  },
  {
    id: 'imux',
    years: '2018–2019',
    title: 'Founding Imux',
    role: 'Co-founder',
    description:
      'Co-founded Imux, a natural-language interface to databases (NLiDB) SaaS. Raised seed funding and learned what zero-to-one really costs.',
    workSlugs: ['imux'],
    highlight: 'Seed funded',
    geo: {
      base: 'bangalore',
      locations: ['mumbai', 'seoul', 'bangkok'],
      reach: ['IN', 'KR', 'TH'],
      users: '$150k seed fund · 5 paying customers',
    },
  },
  {
    id: 'oneplus',
    years: '2019–2025',
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
      base: ['hyderabad', 'bangalore'],
      hq: 'shenzhen',
      locations: ['noida', 'gurgaon', 'bangkok', 'singapore', 'jakarta', 'newyork', 'seattle', 'london', 'stockholm'],
      reach: 'worldwide',
      users: '200Mn+ users · 10+ products',
    },
  },
  {
    id: 'builder',
    years: '2025–present',
    title: 'Independent builder & AI',
    role: 'Product Consultant · AI Builder',
    description:
      'Building with AI end-to-end: Product f(), an AI operating system for product teams; Labh, a SEBI-certified investment platform; Petfolk luxury pet care; Pro Studio for film pre-production; Itihasa Collective for screenwriters.',
    workSlugs: ['product-f', 'labh', 'petfolk', 'pro-studio-space', 'itihasa-collective', 'reporting-hub'],
    highlight: 'Currently building Product f()',
    geo: {
      base: 'calgary',
      locations: ['bangalore', 'hyderabad', 'mumbai', 'vizag'],
      reach: ['CA', 'IN', 'US'],
      users: '100k+ users',
    },
  },
];
