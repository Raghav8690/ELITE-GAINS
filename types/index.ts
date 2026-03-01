// ─── Trainer Types ──────────────────────────────────────────────
export interface Trainer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  price: string;
  bio: string;
  certifications: string[];
  image: string; // path under /images/trainers/
}

// ─── Pricing Types ──────────────────────────────────────────────
export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

// ─── Gallery Types ──────────────────────────────────────────────
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
}
