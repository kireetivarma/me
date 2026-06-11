/**
 * Testimonials from LinkedIn recommendations (verbatim, lightly excerpted).
 * `short` appears on homepage project cards; `quote` on /work/ case pages.
 * `projects` maps a testimonial to work collection slugs.
 */
export interface Testimonial {
  quote: string;
  short: string;
  author: string;
  role: string;
  relation: string;
  projects: string[];
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'As Lead Product Strategy for Global Partnerships, Kireeti didn’t just manage relationships – he architected an ecosystem strategy that fundamentally expanded our platform’s value proposition. His partnership framework with Zomato, Swiggy, Spotify, Snapchat & others generated measurable business impact, driving significant user acquisition across North American and European markets while establishing OnePlus’ features as an industry benchmark for OS-level integrations.',
    short: 'Architected an ecosystem strategy that fundamentally expanded our platform’s value proposition.',
    author: 'Ramagopala Reddy Palukuru',
    role: 'Vice President, OnePlus India',
    relation: 'Managed Kireeti directly',
    projects: ['spotify-on-shelf', 'zomato-blinkit-shelf'],
  },
  {
    quote:
      'Kireeti is a great UI/UX designer with a strong focus on product improvement. Would recommend him!',
    short: 'A great UI/UX designer with a strong focus on product improvement. Would recommend him!',
    author: 'Brian DeLuca',
    role: 'Tech Founder & CEO, Reporting Hub',
    relation: 'Client',
    projects: ['reporting-hub'],
  },
  {
    quote:
      'Worked with Kireeti during Shelf and Sports apps development in OnePlus. It was an amazing experience working with him. He came up with really great ideas for futuristic products. He understood the technical challenges well faced during some features development and came up with the alternatives.',
    short: 'He came up with really great ideas for futuristic products.',
    author: 'Puneet Kumar Gupta',
    role: 'Principal Engineer, OnePlus',
    relation: 'Worked on the same team',
    projects: ['oneplus-shelf'],
  },
  {
    quote:
      'Kireeti is an enthusiastic product manager with good design skills. He loves to observe and make his own inspiring opinions. He gets strong faith in what he believes for making a good product and conquers difficulties to make things happen. It’s my pleasure to work with him, what a fruitful journey.',
    short: 'Strong faith in what he believes for making a good product, and conquers difficulties to make things happen.',
    author: 'Zach Lin',
    role: 'Sr. Product Designer, OnePlus',
    relation: 'Managed Kireeti directly',
    projects: ['food-delivery-aod'],
  },
  {
    quote:
      'Kireeti is a valued asset at OnePlus with his outstanding product management and design skills. He’s been integral in global product launches, operational growth, and product partnership. His strategic collaborations, entrepreneurial spirit, and innovation make him an excellent team member.',
    short: 'Integral in global product launches, operational growth, and product partnership.',
    author: 'Crayon Hsieh',
    role: 'Product Design Leader, OnePlus',
    relation: 'Managed Kireeti directly',
    projects: ['oneplus-scout', 'nearby-charging-stations'],
  },
];

export const testimonialsFor = (slug: string) => testimonials.filter((t) => t.projects.includes(slug));
