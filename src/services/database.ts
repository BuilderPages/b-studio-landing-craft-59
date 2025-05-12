export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  date?: string;
  subject?: string;
  device?: string;
  browser?: string;
  ip?: string;
  privacyConsent?: boolean;
}

export interface PageView {
  id: string;
  path: string;
  date: string;
  timestamp: string;
  device: string;
  browser?: string;
  ip?: string;
}

export interface SiteContent {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    whatsapp?: string;
  };
  homePage: {
    heroTitle: string;
    heroSubtitle: string;
    aboutUsTitle: string;
    aboutUsDescription: string;
  };
  // New fields for expanded functionality
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroBackgroundImage: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  videoUrl: string;
  galleryTitle: string;
  galleryDescription: string;
  galleryCtaText: string;
  galleryCtaLink: string;
  aboutTitle: string;
  aboutText: string;
  footerText: string;
  logoUrl?: string;
  logoLink?: string; // Added logoLink property
  servicesTitle?: string;
  servicesDescription?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  mapSettings: {
    showMap: boolean;
    latitude: string;
    longitude: string;
  };
}

export interface FooterContent {
  description: string;
  quickLinksTitle: string;
  quickLinks: Array<{label: string, url: string}>;
  servicesTitle: string;
  serviceLinks: Array<{label: string, url: string}>;
  contactTitle: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  copyrightText: string;
  socialLinks: Array<{name: string, url: string, icon: string}>;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  highlight?: boolean;
}

export interface Navigation {
  items: NavigationItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  order?: number;
}

// Helper function to get browser information
function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else if (userAgent.match(/msie|trident/i)) {
    browserName = "Internet Explorer";
  }
  
  return browserName;
}

// Initial data setup (if localStorage is empty)
if (!localStorage.getItem('contacts')) {
  localStorage.setItem('contacts', JSON.stringify([]));
}

if (!localStorage.getItem('pageViews')) {
  localStorage.setItem('pageViews', JSON.stringify([]));
}

if (!localStorage.getItem('galleryItems')) {
  localStorage.setItem('galleryItems', JSON.stringify([]));
}

if (!localStorage.getItem('homeGalleryItems')) {
  localStorage.setItem('homeGalleryItems', JSON.stringify([]));
}

if (!localStorage.getItem('navigation')) {
  const defaultNav: Navigation = {
    items: [
      { id: '1', label: 'דף בית', url: '/' },
      { id: '2', label: 'שירותים', url: '/services' },
      { id: '3', label: 'גלריה', url: '/gallery' },
      { id: '4', label: 'אודות', url: '/about' },
    ]
  };
  localStorage.setItem('navigation', JSON.stringify(defaultNav));
}

if (!localStorage.getItem('footerContent')) {
  const defaultFooter: FooterContent = {
    description: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
    quickLinksTitle: 'קישורים מהירים',
    quickLinks: [
      { label: 'דף בית', url: '/' },
      { label: 'אודות', url: '/about' },
      { label: 'גלריה', url: '/gallery' },
    ],
    servicesTitle: 'שירותים',
    serviceLinks: [
      { label: 'עיצוב גרפי', url: '/services#graphic' },
      { label: 'בניית אתרים', url: '/services#web' },
      { label: 'מיתוג עסקי', url: '/services#branding' },
    ],
    contactTitle: 'צור קשר',
    contactInfo: {
      phone: '050-1234567',
      email: 'info@bstudio.com',
      address: 'רחוב המרכבה 50, תל אביב',
    },
    copyrightText: '© {year} B Studio. כל הזכויות שמורות.',
    socialLinks: [
      {
        name: 'פייסבוק',
        url: 'https://facebook.com',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>'
      },
      {
        name: 'אינסטגרם',
        url: 'https://instagram.com',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
      },
    ]
  };
  localStorage.setItem('footerContent', JSON.stringify(defaultFooter));
}

if (!localStorage.getItem('siteContent')) {
  const defaultContent: SiteContent = {
    contactInfo: {
      phone: '050-1234567',
      email: 'info@bstudio.com',
      address: 'רחוב המרכבה 50, תל אביב',
      whatsapp: '972501234567', // Added WhatsApp
    },
    homePage: {
      heroTitle: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
      heroSubtitle: 'אנחנו עוזרים לעסקים לבנות מותג חזק ולספר את הסיפור שלהם בדיגיטל',
      aboutUsTitle: 'קצת עלינו',
      aboutUsDescription: 'אנחנו סטודיו בוטיק המתמחה במיתוג, עיצוב גרפי ובניית אתרים. הסטודיו הוקם מתוך אהבה ליצירה ורצון לעזור לעסקים לצמוח ולגדול בעזרת כלים דיגיטליים. הניסיון והידע שלנו מאפשרים לנו להעניק ללקוחותינו פתרונות מותאמים אישית, תוך הקפדה על איכות, חדשנות ויצירתיות.',
    },
    // New expanded fields
    heroTitle: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
    heroSubtitle: 'אנחנו עוזרים לעסקים לבנות מותג חזק ולספר את הסיפור שלהם בדיגיטל',
    heroCtaText: 'צור קשר',
    heroCtaLink: '/contact',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    ctaTitle: 'מוכנים לקחת את העסק שלכם לשלב הבא?',
    ctaDescription: 'צרו איתנו קשר היום לקבלת ייעוץ ראשוני ללא עלות ותגלו איך אנחנו יכולים לעזור לעסק שלכם לבלוט בשוק התחרותי.',
    ctaButtonText: 'צור קשר עכשיו',
    ctaButtonLink: '/contact',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    galleryTitle: 'העבודות שלנו',
    galleryDescription: 'הצצה לפרויקטים האחרונים שלנו',
    galleryCtaText: 'צפה בכל העבודות',
    galleryCtaLink: '/gallery',
    aboutTitle: 'קצת עלינו',
    aboutText: 'אנחנו סטודיו בוטיק המתמחה במיתוג, עיצוב גרפי ובניית אתרים.',
    footerText: '© {year} B Studio. כל הזכויות שמורות.',
    logoUrl: '',
    servicesTitle: 'השירותים שלנו',
    servicesDescription: 'אנו מציעים מגוון שירותים מקצועיים בתחומי העיצוב והדיגיטל',
    primaryColor: '#9b87f5',
    secondaryColor: '#7E69AB',
    accentColor: '#6E59A5',
    // Add mapSettings
    mapSettings: {
      showMap: true,
      latitude: "32.07373882655249",
      longitude: "34.77084541524799"
    }
  };
  localStorage.setItem('siteContent', JSON.stringify(defaultContent));
}

// Contacts
export function getContacts(): Contact[] {
  const contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
}

export function saveContact(contact: Omit<Contact, "id">): Contact {
  const contacts = getContacts();
  const browserInfo = getBrowserInfo();
  
  const newContact = {
    id: crypto.randomUUID(),
    ...contact,
    date: new Date().toISOString(),
    browser: browserInfo,
  };
  
  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  return newContact;
}

export function deleteContact(id: string): void {
  let contacts = getContacts();
  contacts = contacts.filter(contact => contact.id !== id);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Page Views
export function getPageViews(): PageView[] {
  const pageViews = localStorage.getItem('pageViews');
  return pageViews ? JSON.parse(pageViews) : [];
}

// Record page views with browser and IP info
export function recordPageView(path: string = window.location.pathname): void {
  const pageViews = getPageViews();
  const browserInfo = getBrowserInfo();
  
  // Mock IP for demo purposes - in a real app you'd use a service to get the IP
  const mockIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  
  const newPageView: PageView = {
    id: crypto.randomUUID(),
    path: path,
    date: new Date().toLocaleDateString(),
    timestamp: new Date().toISOString(),
    device: /Mobile|iPhone|Android|IEMobile|BlackBerry|Opera Mini/.test(navigator.userAgent)
      ? "Mobile"
      : "Desktop",
    browser: browserInfo,
    ip: mockIP,
  };
  pageViews.push(newPageView);
  localStorage.setItem('pageViews', JSON.stringify(pageViews));
}

// Site Content
export function getSiteContent(): SiteContent {
  const content = localStorage.getItem('siteContent');
  return content ? JSON.parse(content) : {
    contactInfo: {
      phone: '050-1234567',
      email: 'info@bstudio.com',
      address: 'רחוב המרכבה 50, תל אביב',
      whatsapp: '972501234567',
    },
    homePage: {
      heroTitle: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
      heroSubtitle: 'אנחנו עוזרים לעסקים לבנות מותג חזק ולספר את הסיפור שלהם בדיגיטל',
      aboutUsTitle: 'קצת עלינו',
      aboutUsDescription: 'אנחנו סטודיו בוטיק המתמחה במיתוג, עיצוב גרפי ובניית אתרים. הסטודיו הוקם מתוך אהבה ליצירה ורצון לעזור לעסקים לצמוח ולגדול בעזרת כלים דיגיטליים. הניסיון והידע שלנו מאפשרים לנו להעניק ללקוחותינו פתרונות מותאמים אישית, תוך הקפדה על איכות, חדשנות ויצירתיות.',
    },
    // Default expanded fields
    heroTitle: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
    heroSubtitle: 'אנחנו עוזרים לעסקים לבנות מותג חזק ולספר את הסיפור שלהם בדיגיטל',
    heroCtaText: 'צור קשר',
    heroCtaLink: '/contact',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    ctaTitle: 'מוכנים לקחת את העסק שלכם לשלב הבא?',
    ctaDescription: 'צרו איתנו קשר היום לקבלת ייעוץ ראשוני ללא עלות ותגלו איך אנחנו יכולים לעזור לעסק שלכם לבלוט בשוק התחרותי.',
    ctaButtonText: 'צור קשר עכשיו',
    ctaButtonLink: '/contact',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    galleryTitle: 'העבודות שלנו',
    galleryDescription: 'הצצה לפרויקטים האחרונים שלנו',
    galleryCtaText: 'צפה בכל העבודות',
    galleryCtaLink: '/gallery',
    aboutTitle: 'קצת עלינו',
    aboutText: 'אנחנו סטודיו בוטיק המתמחה במיתוג, עיצוב גרפי ובניית אתרים.',
    footerText: '© {year} B Studio. כל הזכויות שמורות.',
    logoUrl: '',
    logoLink: '/', // Added default value for logoLink
    servicesTitle: 'השירותים שלנו',
    servicesDescription: 'אנו מציעים מגוון שירותים מקצועיים',
    primaryColor: '#9b87f5',
    secondaryColor: '#7E69AB',
    accentColor: '#6E59A5',
    // Add default mapSettings
    mapSettings: {
      showMap: true,
      latitude: "32.07373882655249",
      longitude: "34.77084541524799"
    }
  };
}

export function saveSiteContent(content: SiteContent): void {
  localStorage.setItem('siteContent', JSON.stringify(content));
}

// Navigation
export function getNavigation(): Navigation {
  const navigation = localStorage.getItem('navigation');
  return navigation ? JSON.parse(navigation) : {
    items: [
      { id: '1', label: 'דף בית', url: '/' },
      { id: '2', label: 'שירותים', url: '/services' },
      { id: '3', label: 'גלריה', url: '/gallery' },
      { id: '4', label: 'אודות', url: '/about' },
    ]
  };
}

export function updateNavigation(navigation: Navigation): void {
  localStorage.setItem('navigation', JSON.stringify(navigation));
}

// Footer
export function getFooterContent(): FooterContent {
  const footerContent = localStorage.getItem('footerContent');
  return footerContent ? JSON.parse(footerContent) : {
    description: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
    quickLinksTitle: 'קישורים מהירים',
    quickLinks: [
      { label: 'דף בית', url: '/' },
      { label: 'אודות', url: '/about' },
      { label: 'גלריה', url: '/about' },
    ],
    servicesTitle: 'שירותים',
    serviceLinks: [
      { label: 'עיצוב גרפי', url: '/services#graphic' },
      { label: 'בניית אתרים', url: '/services#web' },
      { label: 'מיתוג עסקי', url: '/services#branding' },
    ],
    contactTitle: 'צור קשר',
    contactInfo: {
      phone: '050-1234567',
      email: 'info@bstudio.com',
      address: 'רחוב המרכבה 50, תל אביב',
    },
    copyrightText: '© {year} B Studio. כל הזכויות שמורות.',
    socialLinks: [
      {
        name: 'פייסבוק',
        url: 'https://facebook.com',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>'
      },
      {
        name: 'אינסטגרם',
        url: 'https://instagram.com',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
      },
    ]
  };
}

export function updateFooterContent(footerContent: FooterContent): void {
  localStorage.setItem('footerContent', JSON.stringify(footerContent));
}

// Gallery Items
export function getGalleryItems(): GalleryItem[] {
  const items = localStorage.getItem('galleryItems');
  return items ? JSON.parse(items) : [];
}

export function saveGalleryItem(item: GalleryItem): GalleryItem {
  const items = getGalleryItems();
  
  if (item.id) {
    // Update existing item
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items[index] = { ...items[index], ...item };
    }
  } else {
    // Add new item
    item.id = crypto.randomUUID();
    items.push(item);
  }
  
  localStorage.setItem('galleryItems', JSON.stringify(items));
  return item;
}

export function deleteGalleryItem(id: string): void {
  let items = getGalleryItems();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem('galleryItems', JSON.stringify(items));
}

// Home Gallery Items
export function getHomeGalleryItems(): GalleryItem[] {
  const items = localStorage.getItem('homeGalleryItems');
  return items ? JSON.parse(items) : [];
}

export function saveHomeGalleryItem(item: GalleryItem): GalleryItem {
  const items = getHomeGalleryItems();
  
  if (item.id) {
    // Update existing item
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items[index] = { ...items[index], ...item };
    }
  } else {
    // Add new item
    item.id = crypto.randomUUID();
    items.push(item);
  }
  
  localStorage.setItem('homeGalleryItems', JSON.stringify(items));
  return item;
}

export function deleteHomeGalleryItem(id: string): void {
  let items = getHomeGalleryItems();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem('homeGalleryItems', JSON.stringify(items));
}
