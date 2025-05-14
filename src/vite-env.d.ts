
/// <reference types="vite/client" />

// Ensure that structured data can be parsed by search engines
interface Window {
  dataLayer?: any[];
}

// Add proper metadata for SEO
interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}
