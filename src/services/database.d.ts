
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface MapSettings {
  showMap: boolean;
  latitude: string;
  longitude: string;
}

export interface SiteContent {
  siteName: string;
  siteDescription: string;
  aboutTitle: string;
  aboutText: string;
  servicesTitle: string;
  servicesText: string;
  contactInfo: ContactInfo;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  mapSettings?: MapSettings;
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
