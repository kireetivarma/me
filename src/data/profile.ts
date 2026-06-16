export const profile = {
  name: 'Kireeti Varma',
  title: 'Product Leader · 0-to-1 & Scale',
  tagline: 'Product leader shipping 0-to-1 to 200M+ across OS platforms, partnerships and AI',
  description:
    'Product leader with 12+ years shipping OS products end-to-end, from 0-to-1 to 200M+ users across 50+ countries. Ex-OnePlus: owned the partnership strategy that opened Shelf to developers and grew partner engagement across the OS, and shipped India\'s first food-delivery tracking on Always-on Display. Now building AI-native products and advising on product strategy.',
  email: 'mail@kireetivarma.me',
  location: 'Calgary, Canada 🇨🇦',
  availability: {
    company: 'Coalition House Products Inc',
    url: 'https://www.coalition.house',
  },
  social: {
    linkedin: 'https://linkedin.com/in/kireetivarma',
    x: 'https://x.com/kireetivarma',
    calendly: 'https://calendly.com/kireeti/25',
  },
  stats: [
    { value: '200M+', label: 'Users Reached' },
    { value: '20+', label: 'Products Built & Shipped' },
    { value: '25+', label: 'Teams Globally' },
    { value: '12+', label: 'Years Experience' },
  ],
  /**
   * Brand grid entries. `icon` is a simple-icons export name (rendered as the
   * real SVG logo); entries without one render as a color-styled wordmark.
   */
  brands: [
    { name: 'OnePlus', icon: 'siOneplus', slug: 'oneplus-shelf' },
    { name: 'Spotify', icon: 'siSpotify', slug: 'spotify-on-shelf' },
    { name: 'Snapchat', icon: 'siSnapchat', slug: 'oneplus-shelf' },
    { name: 'Netflix', icon: 'siNetflix', slug: 'oneplus-shelf' },
    { name: 'Zomato', icon: 'siZomato', slug: 'food-delivery-aod' },
    { name: 'Grab', icon: 'siGrab', slug: 'oneplus-scout' },
    { name: 'Swiggy', icon: 'siSwiggy', slug: 'food-delivery-aod' },
    { name: 'Blinkit', color: '#F9D100', slug: 'zomato-blinkit-shelf' },
    { name: 'Google', icon: 'siGoogle', slug: 'oneplus-scout' },
    { name: 'Oppo', icon: 'siOppo', slug: 'oneplus-shelf' },
    { name: 'Dvara Money', color: '#0E7C66', slug: 'cabdost' },
    { name: 'Leucine', color: '#4F46E5', externalUrl: 'https://leucine.ai/cleen/' },
    { name: 'Station91', color: '#7C3AED', slug: 'station91' },
    { name: 'Labh', color: '#10B981', slug: 'labh' },
    { name: 'Itihasa', color: '#F472B6', slug: 'itihasa-collective' },
    { name: 'Imux', color: '#38BDF8', slug: 'imux' },
    { name: 'Reporting Hub', color: '#F59E0B', slug: 'reporting-hub' },
  ],
} as const;
