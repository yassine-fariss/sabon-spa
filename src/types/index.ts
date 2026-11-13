export type Language = 'fr' | 'en';

export interface ServiceItem {
  id: string;
  category: 'massages' | 'hammam' | 'beauty' | 'hydro';
  title: { fr: string; en: string };
  duration: string;
  price: string;
  description: { fr: string; en: string };
  features: { fr: string[]; en: string[] };
  image: string;
  popular?: boolean;
}

export interface PackItem {
  id: string;
  tier: 'bronze' | 'silver' | 'gold';
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  duration: string;
  price: string;
  badge?: { fr: string; en: string };
  inclusions: { fr: string[]; en: string[] };
  popular?: boolean;
}

export interface TeamMember {
  name: string;
  role: { fr: string; en: string };
  specialties: { fr: string[]; en: string[] };
  bio: { fr: string; en: string };
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  meta: string;
  isLocalGuide?: boolean;
  text: string;
  source: string;
  avatarInitials: string;
  highlight?: boolean;
}

export interface FAQItem {
  question: { fr: string; en: string };
  answer: { fr: string; en: string };
}
