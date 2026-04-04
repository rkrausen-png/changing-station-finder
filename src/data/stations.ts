export interface ChangingStation {
  id: string;
  name: string;
  storeName: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  isSponsored: boolean;
  hours: string;
  imageUrl?: string;
}

export const SAMPLE_STATIONS: ChangingStation[] = [
  {
    id: "1",
    name: "Target - Family Restroom",
    storeName: "Target",
    address: "1234 Main St, Anytown, USA",
    lat: 40.7580,
    lng: -73.9855,
    rating: 4.5,
    reviewCount: 128,
    amenities: ["Warm Water", "Wipes", "Clean", "Spacious"],
    isSponsored: true,
    hours: "8am - 10pm",
  },
  {
    id: "2",
    name: "Walmart Supercenter",
    storeName: "Walmart",
    address: "5678 Oak Ave, Anytown, USA",
    lat: 40.7614,
    lng: -73.9776,
    rating: 3.8,
    reviewCount: 87,
    amenities: ["Clean", "Accessible"],
    isSponsored: false,
    hours: "6am - 11pm",
  },
  {
    id: "3",
    name: "Starbucks - Downtown",
    storeName: "Starbucks",
    address: "910 Elm St, Anytown, USA",
    lat: 40.7549,
    lng: -73.9840,
    rating: 4.2,
    reviewCount: 45,
    amenities: ["Clean", "Compact"],
    isSponsored: false,
    hours: "5am - 9pm",
  },
  {
    id: "4",
    name: "Buy Buy Baby",
    storeName: "Buy Buy Baby",
    address: "222 Baby Blvd, Anytown, USA",
    lat: 40.7600,
    lng: -73.9900,
    rating: 4.9,
    reviewCount: 203,
    amenities: ["Warm Water", "Wipes", "Nursing Room", "Spacious", "Diaper Vending"],
    isSponsored: true,
    hours: "9am - 9pm",
  },
  {
    id: "5",
    name: "Whole Foods Market",
    storeName: "Whole Foods",
    address: "333 Green Way, Anytown, USA",
    lat: 40.7565,
    lng: -73.9910,
    rating: 4.0,
    reviewCount: 62,
    amenities: ["Clean", "Accessible", "Spacious"],
    isSponsored: false,
    hours: "7am - 10pm",
  },
];
