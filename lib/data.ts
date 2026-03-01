import type { Trainer, PricingPlan, GalleryImage } from "@/types";

// ─── Site Config ───────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "ELITE GAINS",
  tagline: "PUSH BEYOND YOUR LIMITS",
  subTagline:
    "Experience the pinnacle of high-performance training in a luxury environment designed for elite results.",
  phone: "+91 98765 43210",
  email: "info@elitegainsgym.com",
  address: "123 Iron District, Fitness Hub, Mumbai 400001",
  whatsappNumber: "919876543210", // no + sign for wa.me
  whatsappMessage: "I%20want%20to%20join%20your%20gym",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609808862!2d72.74109!3d19.0820!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
  openingHours: {
    weekdays: "5:00 AM – 11:00 PM",
    saturday: "6:00 AM – 10:00 PM",
    sunday: "7:00 AM – 8:00 PM",
  },
  socialLinks: {
    instagram: "https://instagram.com/elitegainsgym",
    facebook: "https://facebook.com/elitegainsgym",
    youtube: "https://youtube.com/@elitegainsgym",
    twitter: "https://twitter.com/elitegainsgym",
  },
};

// ─── Stats ─────────────────────────────────────────────────────
export const STATS = [
  { label: "Years of Experience", value: 12, suffix: "+" },
  { label: "Active Members", value: 3500, suffix: "+" },
  { label: "Certified Trainers", value: 25, suffix: "+" },
  { label: "Equipment Count", value: 300, suffix: "+" },
];

// ─── Pricing Plans ────────────────────────────────────────────
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "BASIC",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Perfect for beginners starting their fitness journey",
    features: [
      "24/7 Gym Access",
      "Locker Room Access",
      "2 Personal Training Sessions",
      "3 Fitness Classes/month",
      "Basic Equipment Access",
      "Mobile App Access",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "PRO",
    monthlyPrice: 89,
    yearlyPrice: 69,
    description: "Our most popular plan for serious fitness enthusiasts",
    features: [
      "All Basic Features",
      "Unlimited Fitness Classes",
      "4 Personal Training Sessions",
      "Nutrition Consultation",
      "Sauna & Steam Room Access",
      "Priority Equipment Booking",
      "Fitness Progress Tracking",
    ],
    popular: true,
    cta: "Join Most Popular",
  },
  {
    id: "elite",
    name: "ELITE",
    monthlyPrice: 149,
    yearlyPrice: 119,
    description: "The ultimate VIP experience for peak performers",
    features: [
      "All Pro Features",
      "Unlimited Personal Training",
      "Private Locker Assignment",
      "Dedicated Nutritionist",
      "Recovery Suite Access",
      "Towel & Amenity Service",
      "Guest Passes (4/month)",
      "Exclusive Elite Events",
    ],
    cta: "Go Elite",
  },
];

// ─── Trainers ─────────────────────────────────────────────────
export const TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "Alex Rivers",
    specialty: "Strength & Conditioning",
    experience: "10 Years",
    price: "$120/session",
    bio: "Former competitive powerlifter turned elite coach. Alex has helped hundreds of clients achieve record-breaking strength gains using his science-backed methodology.",
    certifications: ["NSCA-CSCS", "ACE Certified", "Olympic Lifting L2"],
    image: "/images/trainers/trainer-1.jpg",
  },
  {
    id: 2,
    name: "Sarah Chen",
    specialty: "Yoga & Functional Fitness",
    experience: "8 Years",
    price: "$100/session",
    bio: "International yoga instructor and functional movement specialist. Sarah's holistic approach combines mobility, strength, and mindfulness for total body transformation.",
    certifications: ["RYT-500", "FMS Certified", "NASM-CPT"],
    image: "/images/trainers/trainer-2.jpg",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    specialty: "Athletic Performance",
    experience: "12 Years",
    price: "$140/session",
    bio: "Ex-professional footballer and sports performance coach. Marcus specializes in explosive athletic development, speed training, and elite sports conditioning.",
    certifications: ["EXOS Performance", "CSCS", "Sports Nutrition Cert"],
    image: "/images/trainers/trainer-3.jpg",
  },
  {
    id: 4,
    name: "Priya Sharma",
    specialty: "Weight Loss & Nutrition",
    experience: "7 Years",
    price: "$95/session",
    bio: "Registered dietitian and certified personal trainer specializing in sustainable fat loss and metabolic optimization through individualized programs.",
    certifications: ["RD", "NASM-CNC", "Precision Nutrition L2"],
    image: "/images/trainers/trainer-4.jpg",
  },
];

// ─── Gallery Images ───────────────────────────────────────────
// Add your actual images to /public/images/gallery/
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: "/images/gallery/gym-1.jpg", alt: "Free Weights Area", span: "tall" },
  { id: 2, src: "/images/gallery/gym-2.jpg", alt: "Cardio Zone", span: "normal" },
  { id: 3, src: "/images/gallery/gym-3.jpg", alt: "Olympic Lifting Platform", span: "normal" },
  { id: 4, src: "/images/gallery/gym-4.jpg", alt: "Battle Ropes", span: "wide" },
  { id: 5, src: "/images/gallery/gym-5.jpg", alt: "Functional Training Area", span: "normal" },
  { id: 6, src: "/images/gallery/gym-6.jpg", alt: "Spinning Studio", span: "tall" },
  { id: 7, src: "/images/gallery/gym-7.jpg", alt: "Recovery Suite", span: "normal" },
  { id: 8, src: "/images/gallery/gym-8.jpg", alt: "Yoga Studio", span: "normal" },
  { id: 9, src: "/images/gallery/gym-9.jpg", alt: "Lounge Area", span: "wide" },
];

// ─── Nav Links ─────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Programs", href: "#about" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
];
