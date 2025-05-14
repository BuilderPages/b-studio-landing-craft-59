export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp?: string;
}

export interface MapSettings {
  showMap: boolean;
  latitude: string;
  longitude: string;
}

export interface SiteContent {
  // Site-wide settings
  siteName: string;
  siteDescription: string;
  heroOverlayColor: string;
  heroOverlayOpacity: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  
  // About section
  aboutTitle: string;
  aboutText: string;
  
  // Services section
  servicesTitle: string;
  servicesText?: string;
  servicesDescription?: string;
  
  // Contact information
  contactInfo: ContactInfo;
  social?: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  mapSettings: MapSettings;
  
  // Home page specific fields
  homePage: {
    heroTitle: string;
    heroSubtitle: string;
    aboutUsTitle: string;
    aboutUsDescription: string;
  };
  
  // Banner and hero section
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroBackgroundImage: string;
  
  // CTA section
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  videoUrl: string;
  
  // Gallery section
  galleryTitle: string;
  galleryDescription: string;
  galleryCtaText: string;
  galleryCtaLink: string;
  
  // Other content
  footerText: string;
  logoUrl?: string;
  logoLink?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  device?: string;
}

export function getSiteContent(): SiteContent;
export function saveSiteContent(content: SiteContent): void;
export function getGalleryItems(): GalleryItem[];
export function saveGalleryItem(item: GalleryItem): void;
export function deleteGalleryItem(id: string): void;
export function saveContact(contact: ContactFormData): Promise<void>;
export function recordPageView(): void;
