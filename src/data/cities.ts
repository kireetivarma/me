/**
 * City coordinates for the impact map. [lat, lng].
 * Projection to SVG x/y happens in ImpactMap (equirectangular).
 */
export const cities: Record<string, { name: string; lat: number; lng: number }> = {
  hyderabad: { name: 'Hyderabad', lat: 17.385, lng: 78.4867 },
  calgary: { name: 'Calgary', lat: 51.0447, lng: -114.0719 },
  shenzhen: { name: 'Shenzhen', lat: 22.5431, lng: 114.0579 },
  bangalore: { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  chennai: { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  mumbai: { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  delhi: { name: 'New Delhi', lat: 28.6139, lng: 77.209 },
  gurgaon: { name: 'Gurugram', lat: 28.4595, lng: 77.0266 },
  stockholm: { name: 'Stockholm', lat: 59.3293, lng: 18.0686 },
  losangeles: { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  sanfrancisco: { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  london: { name: 'London', lat: 51.5074, lng: -0.1278 },
  singapore: { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  kochi: { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
  toronto: { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
  vancouver: { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
};

export type CityKey = keyof typeof cities;
