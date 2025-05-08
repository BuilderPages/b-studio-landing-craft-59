import { v4 as uuidv4 } from "uuid";

// Type definitions
export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  date?: string;
  subject?: string;
  device?: string;
}

export interface PageView {
  id: string;
  path: string;
  date: string;
  timestamp: string;
  device: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface SocialLinkItem {
  name: string;
  url: string;
  icon: string;
}

export interface FooterContent {
  description: string;
  quickLinksTitle: string;
  quickLinks: FooterLinkItem[];
  servicesTitle: string;
  serviceLinks: FooterLinkItem[];
  contactTitle: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  copyrightText: string;
  socialLinks: SocialLinkItem[];
}

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  highlight?: boolean;
}

interface Navigation {
  items: NavigationItem[];
}

interface SiteContent {
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
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    whatsapp?: string;
  };
  footerText: string;
  [key: string]: any;
}

// Local storage keys
const CONTACTS_KEY = "b-studio-contacts";
const PAGE_VIEWS_KEY = "b-studio-page-views";
const GALLERY_ITEMS_KEY = "b-studio-gallery-items";
const SITE_CONTENT_KEY = "b-studio-site-content";
const NAVIGATION_KEY = "b-studio-navigation";
const FOOTER_CONTENT_KEY = "b-studio-footer-content";

// Helper functions for local storage
const getFromStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Contacts
export const getContacts = (): Contact[] => {
  return getFromStorage(CONTACTS_KEY) || getSampleContacts();
};

export const saveContact = (contact: Omit<Contact, "id" | "date">) => {
  const contacts = getContacts();
  const newContact = {
    id: uuidv4(),
    ...contact,
    date: new Date().toISOString(),
    device: getBrowserInfo()
  };
  contacts.unshift(newContact); // Add to the beginning of array
  setToStorage(CONTACTS_KEY, contacts);
  return newContact;
};

// Page views
export const getPageViews = (): PageView[] => {
  return getFromStorage(PAGE_VIEWS_KEY) || getSamplePageViews();
};

export const recordPageView = () => {
  const pageViews = getPageViews();
  const newPageView = {
    id: uuidv4(),
    path: window.location.pathname,
    date: new Date().toISOString().split("T")[0],
    timestamp: new Date().toISOString(),
    device: getBrowserInfo()
  };
  pageViews.unshift(newPageView);
  // Keep only last 500 page views
  const trimmedPageViews = pageViews.slice(0, 500);
  setToStorage(PAGE_VIEWS_KEY, trimmedPageViews);
  return newPageView;
};

// Gallery
export const getGalleryItems = (): GalleryItem[] => {
  return getFromStorage(GALLERY_ITEMS_KEY) || getSampleGalleryItems();
};

export const saveGalleryItem = (item: GalleryItem) => {
  const items = getGalleryItems();
  
  if (!item.id) {
    // New item
    const newItem = {
      ...item,
      id: uuidv4()
    };
    items.push(newItem);
  } else {
    // Update existing item
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
    } else {
      items.push(item);
    }
  }
  
  setToStorage(GALLERY_ITEMS_KEY, items);
};

export const deleteGalleryItem = (id: string) => {
  const items = getGalleryItems();
  const filteredItems = items.filter((item) => item.id !== id);
  setToStorage(GALLERY_ITEMS_KEY, filteredItems);
};

// Site content
export const getSiteContent = (): SiteContent => {
  return getFromStorage(SITE_CONTENT_KEY) || getSampleSiteContent();
};

export const updateSiteContent = (content: SiteContent) => {
  setToStorage(SITE_CONTENT_KEY, content);
};

// Navigation
export const getNavigation = (): Navigation => {
  return getFromStorage(NAVIGATION_KEY) || getSampleNavigation();
};

export const updateNavigation = (navigation: Navigation) => {
  setToStorage(NAVIGATION_KEY, navigation);
};

// Footer content
export const getFooterContent = (): FooterContent => {
  return getFromStorage(FOOTER_CONTENT_KEY) || getSampleFooterContent();
};

export const updateFooterContent = (content: FooterContent) => {
  setToStorage(FOOTER_CONTENT_KEY, content);
};

// Helper functions
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType = "Unknown";
  
  if (/mobile/i.test(userAgent)) {
    deviceType = "Mobile";
  } else if (/tablet/i.test(userAgent)) {
    deviceType = "Tablet";
  } else {
    deviceType = "Desktop";
  }
  
  return deviceType;
};

// Sample data
const getSampleContacts = (): Contact[] => {
  return [
    {
      id: "1",
      name: "ישראל ישראלי",
      email: "israel@example.com",
      message: "אני מעוניין לשמוע עוד על השירותים שלכם.",
      date: "2023-06-15T10:30:00Z",
      subject: "שאלה כללית",
      device: "Desktop"
    },
    {
      id: "2",
      name: "שרה כהן",
      email: "sara@example.com",
      message: "אשמח לקבל הצעת מחיר לפרויקט עיצוב אתר חדש.",
      date: "2023-06-12T14:45:00Z",
      subject: "הצעת מחיר",
      device: "Mobile"
    },
    {
      id: "3",
      name: "יוסף לוי",
      email: "yossi@example.com",
      message: "האם אתם מציעים שירותי אחסון וניהול שרתים?",
      date: "2023-06-10T09:15:00Z",
      subject: "שירותי אחסון",
      device: "Desktop"
    }
  ];
};

const getSamplePageViews = (): PageView[] => {
  return [
    {
      id: "1",
      path: "/",
      date: "2023-06-15",
      timestamp: "2023-06-15T10:30:00Z",
      device: "Desktop"
    },
    {
      id: "2",
      path: "/services",
      date: "2023-06-15",
      timestamp: "2023-06-15T10:35:00Z",
      device: "Desktop"
    },
    {
      id: "3",
      path: "/gallery",
      date: "2023-06-15",
      timestamp: "2023-06-15T10:40:00Z",
      device: "Desktop"
    },
    {
      id: "4",
      path: "/contact",
      date: "2023-06-15",
      timestamp: "2023-06-15T10:45:00Z",
      device: "Desktop"
    },
    {
      id: "5",
      path: "/",
      date: "2023-06-14",
      timestamp: "2023-06-14T09:30:00Z",
      device: "Mobile"
    },
    {
      id: "6",
      path: "/gallery",
      date: "2023-06-14",
      timestamp: "2023-06-14T09:35:00Z",
      device: "Mobile"
    }
  ];
};

const getSampleGalleryItems = (): GalleryItem[] => {
  return [
    {
      id: "1",
      title: "עיצוב לוגו לחברת טכנולוגיה",
      category: "לוגואים",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      description: "עיצוב לוגו מודרני שמשקף את הערכים והחזון של החברה."
    },
    {
      id: "2",
      title: "דף נחיתה לאפליקציה",
      category: "דפי נחיתה",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      description: "עיצוב ופיתוח דף נחיתה לאפליקציה חדשה בשוק."
    },
    {
      id: "3",
      title: "מערכת ניהול תוכן",
      category: "ניהול תוכן",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      description: "בניית מערכת ניהול תוכן מתקדמת שמאפשרת גמישות מלאה."
    },
    {
      id: "4",
      title: "מיתוג חברה חדשה",
      category: "מיתוג",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      description: "פרויקט מיתוג מקיף שכלל לוגו, כרטיסי ביקור, ניירת משרדית ועוד."
    },
    {
      id: "5",
      title: "אתר תדמית לחברת נדל\"ן",
      category: "אתרי תדמית",
      imageUrl: "https://images.unsplash.com/photo-1447758902204-9a8371e0e1b4",
      description: "עיצוב ופיתוח אתר תדמית מודרני לחברת נדל\"ן מובילה."
    },
    {
      id: "6",
      title: "חנות אינטרנט לאופנה",
      category: "חנויות מקוונות",
      imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040",
      description: "הקמת חנות מקוונת מתקדמת עם מערכת תשלומים ומלאי."
    }
  ];
};

const getSampleSiteContent = (): SiteContent => {
  return {
    heroTitle: "פתרונות עיצוב ופיתוח יצירתיים",
    heroSubtitle: "אנחנו מתמחים בהפיכת רעיונות מופשטים למציאות דיגיטלית מרהיבה. בואו יחד נעביר את המותג שלכם לשלב הבא.",
    heroCtaText: "ליצירת קשר",
    heroCtaLink: "/contact",
    heroBackgroundImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    ctaTitle: "מוכנים לקחת את העסק שלכם לשלב הבא?",
    ctaDescription: "צרו איתנו קשר היום לקבלת ייעוץ ראשוני ללא עלות ותגלו איך אנחנו יכולים לעזור לעסק שלכם לבלוט בשוק התחרותי.",
    ctaButtonText: "צרו קשר עכשיו",
    ctaButtonLink: "/contact",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    galleryTitle: "העבודות שלנו",
    galleryDescription: "הצצה לפרויקטים האחרונים שביצענו",
    galleryCtaText: "צפה בכל העבודות",
    galleryCtaLink: "/gallery",
    aboutTitle: "קצת עלינו",
    aboutText: "B Studio הוא סטודיו בוטיק לעיצוב ופיתוח אתרים ואפליקציות. אנחנו מתמחים ביצירת חוויות דיגיטליות מרהיבות שמשלבות עיצוב מרהיב עם פונקציונליות מתקדמת.",
    contactInfo: {
      phone: "050-123-4567",
      email: "info@bstudio.co.il",
      address: "רחוב הראשי 123, תל אביב",
      whatsapp: "972501234567"
    },
    footerText: "© {year} B Studio. כל הזכויות שמורות."
  };
};

const getSampleNavigation = (): Navigation => {
  return {
    items: [
      {
        id: "1",
        label: "דף בית",
        url: "/",
        highlight: false
      },
      {
        id: "2",
        label: "שירותים",
        url: "/services",
        highlight: false
      },
      {
        id: "3",
        label: "גלריה",
        url: "/gallery",
        highlight: false
      },
      {
        id: "4",
        label: "אודות",
        url: "/about",
        highlight: false
      }
    ]
  };
};

const getSampleFooterContent = (): FooterContent => {
  return {
    description: "B Studio הוא סטודיו בוטיק לעיצוב ופיתוח אתרים ואפליקציות, המתמחה ביצירת חוויות דיגיטליות יוצאות דופן.",
    quickLinksTitle: "קישורים מהירים",
    quickLinks: [
      { label: "דף הבית", url: "/" },
      { label: "אודות", url: "/about" },
      { label: "שירותים", url: "/services" },
      { label: "גלריה", url: "/gallery" },
      { label: "צור קשר", url: "/contact" }
    ],
    servicesTitle: "שירותים",
    serviceLinks: [
      { label: "עיצוב אתרים", url: "/services" },
      { label: "פיתוח אפליקציות", url: "/services" },
      { label: "מיתוג", url: "/services" },
      { label: "UX/UI", url: "/services" },
      { label: "ניהול תוכן", url: "/services" }
    ],
    contactTitle: "פרטי קשר",
    contactInfo: {
      phone: "050-123-4567",
      email: "info@bstudio.co.il",
      address: "רחוב הראשי 123, תל אביב"
    },
    copyrightText: "© {year} B Studio. כל הזכויות שמורות.",
    socialLinks: [
      { 
        name: "פייסבוק", 
        url: "https://facebook.com", 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>`
      },
      { 
        name: "אינסטגרם", 
        url: "https://instagram.com", 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
      },
      { 
        name: "לינקדאין", 
        url: "https://linkedin.com", 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>`
      }
    ]
  };
};
