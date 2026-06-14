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
  /** `led` = directly owned/managed; `collaborators` = cross-functional partners and stakeholders. */
  team?: { led?: string; collaborators?: string };
  geo: {
    base?: string | string[];
    hq?: string | string[];
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
    role: 'Product Manager, Program & Operations',
    description:
      'Spent three years at Startup Village, India’s early-stage ecosystem, across 150+ startup teams at incubation stage, watching the same mistakes repeat: building before validating, designing before understanding. Started doing the product and design work myself, interfaces, visual, experience, interactions, because no one else was doing it systematically.',
    workSlugs: [],
    team: {
      collaborators:
        'Operations, program & product management · worked with dev, founder leadership, under the CTO, ops and content · 150+ startups, 500+ founders in the program',
    },
    geo: {
      base: 'bangalore',
      hq: 'kochi',
      locations: ['vizag'],
      reach: ['IN'],
      users: '150+ startups · 500+ founders',
    },
  },
  {
    id: 'agency',
    years: '2017–2019',
    title: 'Product & Design Agency',
    role: 'Founder · Product & Design Consultant',
    description:
      'Founded a product agency. Helped cab drivers recover taxes with Cabdost, built bite-sized founder learning with Station91 and Tymline for short-form blogging, designed Leucine’s CLEEN OS and Instoried, Incola (an Australian rental advance pay-later subscription), plus a data-collection PWA for a medical NGO.',
    workSlugs: ['cabdost', 'station91'],
    highlight: '5,000 drivers · ~$175K recovered · 35x business growth',
    team: { led: '5 devs, 1 QA, 1 ops, 1 marketing', collaborators: '10 founder teams served' },
    geo: {
      base: 'bangalore',
      locations: ['mumbai', 'newyork', 'brisbane'],
      reach: ['IN', 'AU', 'US'],
      users: '100k users · 4 fundraised',
    },
  },
  {
    id: 'imux',
    years: '2018–2019',
    title: 'Founding Imux',
    role: 'Cofounder, Product & Design',
    description:
      'Co-founded Imux, a natural-language interface to databases (NLiDB) SaaS. Raised seed funding and learned what zero-to-one really costs.',
    workSlugs: ['imux'],
    highlight: 'Seed funded',
    team: { collaborators: '5-person founding team' },
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
    role: 'Senior PM · Lead Product Strategy',
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
    team: {
      led: '5 pods owned · 20 devs, 5 designers, 5 QA, 3 ops',
      collaborators: 'legal, marketing, BD, leadership · 6 partner PMs, 15 partner devs',
    },
    geo: {
      base: ['hyderabad', 'bangalore'],
      hq: ['shenzhen', 'newyork'],
      locations: ['noida', 'gurgaon', 'bangkok', 'singapore', 'jakarta', 'seattle', 'london', 'stockholm'],
      // NA · EU · SEA · India: the four OnePlus regions these products served
      reach: ['US', 'CA', 'GB', 'IE', 'FR', 'DE', 'IT', 'ES', 'PT', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'GR', 'HR', 'SI', 'LT', 'LV', 'EE', 'TH', 'SG', 'MY', 'ID', 'PH', 'VN', 'IN'],
      users: '200Mn+ users · NA · EU · SEA · India',
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
    team: { collaborators: '5 founders, 5 devs, 5 ops, 3 designers across these ventures' },
    geo: {
      base: 'calgary',
      locations: ['hyderabad'],
      reach: ['CA', 'IN', 'US'],
      users: '100k+ users',
    },
  },
];
