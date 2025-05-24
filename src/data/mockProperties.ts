type PropertyType = 'residential' | 'commercial' | 'pre-rented';

export interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  type: PropertyType;
  imageUrls: string[];
  sqft: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  contactInfo: string;
}


const mockResidentialProperties: Property[] = [
  {
    id: 'res1',
    name: 'Sunnyvale Family Home',
    description: 'A beautiful 4-bedroom, 3-bathroom family home in the heart of Sunnyvale. Features a large backyard, modern kitchen, and spacious living areas. Perfect for growing families.',
    price: 1200000,
    location: 'Sunnyvale, CA',
    type: 'residential',
    imageUrls: ['https://placehold.co/600x400.png?text=Sunnyvale+Home+1', 'https://placehold.co/600x400.png?text=Sunnyvale+Home+2'],
    sqft: 2200,
    bedrooms: 4,
    bathrooms: 3,
    contactInfo: 'agent@higgsestate.com',
    amenities: ['Large Backyard', 'Modern Kitchen', 'Two-car Garage']
  },
  {
    id: 'res2',
    name: 'Sunnyvale Family Home1111',
    description: 'A beautiful 4-bedroom, 3-bathroom family home in the heart of Sunnyvale. Features a large backyard, modern kitchen, and spacious living areas. Perfect for growing families.',
    price: 1200000,
    location: 'Sunnyvale, CA',
    type: 'residential',
    imageUrls: ['https://placehold.co/600x400.png?text=Sunnyvale+Home+1', 'https://placehold.co/600x400.png?text=Sunnyvale+Home+2'],
    sqft: 2200,
    bedrooms: 4,
    bathrooms: 3,
    contactInfo: 'agent@higgsestate.com',
    amenities: ['Large Backyard', 'Modern Kitchen', 'Two-car Garage']
  },
  {
    id: 'res3',
    name: 'Sunnyvale Family Home222',
    description: 'A beautiful 4-bedroom, 3-bathroom family home in the heart of Sunnyvale. Features a large backyard, modern kitchen, and spacious living areas. Perfect for growing families.',
    price: 1200000,
    location: 'Sunnyvale, CA',
    type: 'residential',
    imageUrls: ['https://placehold.co/600x400.png?text=Sunnyvale+Home+1', 'https://placehold.co/600x400.png?text=Sunnyvale+Home+2'],
    sqft: 2200,
    bedrooms: 4,
    bathrooms: 3,
    contactInfo: 'agent@higgsestate.com',
    amenities: ['Large Backyard', 'Modern Kitchen', 'Two-car Garage']
  },
  {
    id: 'res4',
    name: 'Downtown Loft Apartment',
    description: 'Chic 2-bedroom loft in a vibrant downtown location. Open concept living, exposed brick, and stunning city views. Close to restaurants, shops, and public transport.',
    price: 750000,
    location: 'City Center, USA',
    type: 'residential',
    imageUrls: ['https://placehold.co/600x400.png?text=Downtown+Loft+1', 'https://placehold.co/600x400.png?text=Downtown+Loft+2'],
    sqft: 1200,
    bedrooms: 2,
    bathrooms: 2,
    contactInfo: 'agent@higgsestate.com',
    amenities: ['City Views', 'Exposed Brick', 'Gym Access']
  },
  {
    id: 'res5',
    name: 'Cozy Suburban Cottage',
    description: 'Charming 3-bedroom cottage with a lovely garden. Quiet neighborhood, recently renovated, and move-in ready. Ideal for first-time homebuyers or those looking to downsize.',
    price: 450000,
    location: 'Greenwood, Suburbia',
    type: 'residential',
    imageUrls: ['https://placehold.co/600x400.png?text=Suburban+Cottage+1'],
    sqft: 1500,
    bedrooms: 3,
    bathrooms: 2,
    contactInfo: 'agent@higgsestate.com',
    amenities: ['Garden', 'Renovated Kitchen', 'Quiet Street']
  },
];

const mockCommercialProperties: Property[] = [
  {
    id: 'com1',
    name: 'Prime Retail Space',
    description: 'High-traffic retail space in a bustling commercial district. Large storefront windows, open floor plan, and ample parking. Suitable for various retail businesses.',
    price: 2500000, // Or lease price
    location: 'Main Street, Business City',
    type: 'commercial',
    imageUrls: ['https://placehold.co/600x400.png?text=Retail+Space+1', 'https://placehold.co/600x400.png?text=Retail+Space+2'],
    sqft: 3000,
    contactInfo: 'commercial@higgsestate.com',
    amenities: ['High Traffic Area', 'Ample Parking', 'Storefront Windows']
  },
  {
    id: 'com2',
    name: 'Modern Office Building',
    description: 'Class A office building with multiple floors available. State-of-the-art facilities, conference rooms, and easy access to major highways. Flexible lease terms.',
    price: 10000000, // Or lease price
    location: 'Tech Park, Innovation City',
    type: 'commercial',
    imageUrls: ['https://placehold.co/600x400.png?text=Office+Building+1'],
    sqft: 25000,
    contactInfo: 'commercial@higgsestate.com',
    amenities: ['Conference Rooms', 'High-Speed Internet', 'Covered Parking']
  },
  {
    id: 'com3',
    name: 'Warehouse & Logistics Hub',
    description: 'Large warehouse with loading docks and excellent logistics access. High ceilings, ample storage space, and office area. Ideal for distribution or manufacturing.',
    price: 5000000, // Or lease price
    location: 'Industrial Zone, Port City',
    type: 'commercial',
    imageUrls: ['https://placehold.co/600x400.png?text=Warehouse+1', 'https://placehold.co/600x400.png?text=Warehouse+2'],
    sqft: 50000,
    contactInfo: 'commercial@higgsestate.com',
    amenities: ['Loading Docks', 'High Ceilings', 'Office Space']
  },
  {
    id: 'com4',
    name: 'Warehouse & Logistics Hub010101010',
    description: 'Large warehouse with loading docks and excellent logistics access. High ceilings, ample storage space, and office area. Ideal for distribution or manufacturing.',
    price: 5000000, // Or lease price
    location: 'Industrial Zone, Port City',
    type: 'commercial',
    imageUrls: ['https://placehold.co/600x400.png?text=Warehouse+1', 'https://placehold.co/600x400.png?text=Warehouse+2'],
    sqft: 50000,
    contactInfo: 'commercial@higgsestate.com',
    amenities: ['Loading Docks', 'High Ceilings', 'Office Space']
  },
];

// Simulate async data fetching
export const getResidentialProperties = async (): Promise<Property[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockResidentialProperties), 200));
};

export const getCommercialProperties = async (): Promise<Property[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockCommercialProperties), 200));
};

export const getPreRentedProperties = async (): Promise<Property[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockPreRentedProperties), 200));
};

export const getAllProperties = async (): Promise<Property[]> => {
  const residential = await getResidentialProperties();
  const commercial = await getCommercialProperties();
  const preRented = await getPreRentedProperties();
  return [...residential, ...commercial, ...preRented];
};


const mockPreRentedProperties: Property[] = [
  {
    id: 'pre1',
    name: 'Pre-Rented IT Office',
    description: 'Fully leased IT office with MNC tenant. Located in a prime tech park with excellent connectivity.',
    price: 22000000,
    location: 'Tech Park, Bengaluru',
    type: 'pre-rented',
    imageUrls: ['https://placehold.co/600x400.png?text=Pre-Rented+Office+1'],
    sqft: 6000,
    contactInfo: 'invest@higgsestate.com',
    amenities: ['MNC Tenant', 'Prime Location', 'High Rental Yield']
  },
  {
    id: 'pre2',
    name: 'Retail Space with Franchise Tenant',
    description: 'Leased to a well-known food franchise with 7 years lock-in. Located on a high-footfall street.',
    price: 18000000,
    location: 'High Street, Mumbai',
    type: 'pre-rented',
    imageUrls: ['https://placehold.co/600x400.png?text=Pre-Rented+Retail'],
    sqft: 2500,
    contactInfo: 'invest@higgsestate.com',
    amenities: ['Franchise Lease', '7-Year Lock-in', 'High Footfall']
  },
  {
    id: 'pre3',
    name: 'Warehouse with Corporate Lease',
    description: '10-year leased warehouse for a logistics company. Located near national highway with excellent truck access.',
    price: 30000000,
    location: 'NH8, Jaipur',
    type: 'pre-rented',
    imageUrls: ['https://placehold.co/600x400.png?text=Pre-Rented+Warehouse'],
    sqft: 15000,
    contactInfo: 'invest@higgsestate.com',
    amenities: ['10-Year Lease', 'Corporate Tenant', 'High Access Road']
  },
  {
    id: 'pre4',
    name: 'Warehouse with Corporate Lease010101',
    description: '10-year leased warehouse for a logistics company. Located near national highway with excellent truck access.',
    price: 30000000,
    location: 'NH8, Jaipur',
    type: 'pre-rented',
    imageUrls: ['https://placehold.co/600x400.png?text=Pre-Rented+Warehouse'],
    sqft: 15000,
    contactInfo: 'invest@higgsestate.com',
    amenities: ['10-Year Lease', 'Corporate Tenant', 'High Access Road']
  }
];
