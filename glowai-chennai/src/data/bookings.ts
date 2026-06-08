import type { Booking } from "@/types";

export const sampleBookings: Booking[] = [
  { id: "b1", salonId: "bloom-velachery", salonName: "Bloom Beauty Studio", serviceName: "Hydrating Facial", date: "2025-06-12", time: "11:00 AM", status: "upcoming", price: 1500 },
  { id: "b2", salonId: "lakme-tnagar", salonName: "Lakmé Salon Signature", serviceName: "Bridal Makeup Trial", date: "2025-06-20", time: "4:00 PM", status: "upcoming", price: 4500 },
  { id: "b3", salonId: "naturals-anna", salonName: "Naturals Lounge", serviceName: "Hair Spa & Treatment", date: "2025-05-18", time: "2:00 PM", status: "completed", price: 1800 },
  { id: "b4", salonId: "jawed-adyar", salonName: "Jawed Habib Hair Studio", serviceName: "Classic Haircut", date: "2025-04-22", time: "5:30 PM", status: "completed", price: 600 },
  { id: "b5", salonId: "blush-mylapore", salonName: "Blush by Shreya", serviceName: "Party Makeup", date: "2025-03-10", time: "6:00 PM", status: "completed", price: 3500 },
];

export const trendingServices = [
  { name: "Glass Skin Facial", icon: "✨", growth: "+128%", color: "from-rose-400 to-pink-300" },
  { name: "Korean Hair Botox", icon: "💆‍♀️", growth: "+94%", color: "from-purple-400 to-pink-300" },
  { name: "Bridal HD Makeup", icon: "👰", growth: "+76%", color: "from-amber-300 to-rose-400" },
  { name: "Gel Nail Art", icon: "💅", growth: "+62%", color: "from-pink-300 to-purple-300" },
  { name: "Scalp Detox", icon: "🌿", growth: "+58%", color: "from-emerald-300 to-teal-300" },
  { name: "Vampire Facial", icon: "🩸", growth: "+44%", color: "from-rose-500 to-amber-300" },
];

export const testimonials = [
  { name: "Aishwarya R.", role: "Bride • T Nagar", text: "GlowAI matched me with the perfect bridal salon in 30 seconds. Saved me weeks of research.", avatar: "AR" },
  { name: "Karthik V.", role: "Software Engineer", text: "The AI Beauty Advisor helped me build a 5-min daily routine that actually works.", avatar: "KV" },
  { name: "Priya S.", role: "College Student", text: "Found a student-friendly studio with 20% off. Booking took two taps.", avatar: "PS" },
  { name: "Divya M.", role: "Working Mom", text: "Trust scores helped me skip the bad reviews — booked Bloom and loved it.", avatar: "DM" },
];

export const stats = [
  { value: "500+", label: "Verified Salons" },
  { value: "50K+", label: "Happy Clients" },
  { value: "4.8★", label: "Avg. Rating" },
  { value: "12+", label: "Chennai Areas" },
];
