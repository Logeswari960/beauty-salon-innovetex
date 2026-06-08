export type Service = {
  id: string;
  name: string;
  category: "Hair" | "Skin" | "Makeup" | "Spa" | "Nails" | "Bridal" | "Grooming";
  price: number;
  duration: number; // minutes
  description?: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type Salon = {
  id: string;
  name: string;
  tagline: string;
  area: string; // T Nagar, Anna Nagar, ...
  address: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3 | 4; // ₹ to ₹₹₹₹
  image: string;
  gallery: string[];
  services: Service[];
  reviews: Review[];
  trustScore: number; // 0-100
  tags: string[]; // "Bridal", "Womens", "Unisex", "Student-friendly", "Women-owned"
  concerns: string[]; // "oily skin", "hair fall", "anti-aging", ...
  occasions: string[]; // "Wedding", "Party", "Interview", ...
  womenOwned: boolean;
  openHours: string;
  aiSummary: string;
};

export type Booking = {
  id: string;
  salonId: string;
  salonName: string;
  serviceName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
