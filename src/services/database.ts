
import { ContactFormData } from "@/components/ContactForm";

// Store data in localStorage as a simple database
const CONTACTS_KEY = "bstudio_contacts";
const VIEWS_KEY = "bstudio_views";
const CONTENT_KEY = "bstudio_content";
const GALLERY_KEY = "bstudio_gallery";

// Contact form submissions
export const saveContact = async (contact: ContactFormData): Promise<ContactFormData> => {
  try {
    const contacts = getContacts();
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    contacts.push(newContact);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.error("Error saving contact:", error);
    throw new Error("Failed to save contact data");
  }
};

export const getContacts = (): ContactFormData[] => {
  try {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error("Error getting contacts:", error);
    return [];
  }
};

export const deleteContact = (id: string): boolean => {
  try {
    const contacts = getContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(updatedContacts));
    return true;
  } catch (error) {
    console.error("Error deleting contact:", error);
    return false;
  }
};

// Page views tracking
export interface PageView {
  id: string;
  path: string;
  timestamp: string;
  ip: string;
  device: string;
  userAgent: string;
}

export const recordPageView = (): void => {
  try {
    const views = getPageViews();
    const newView: PageView = {
      id: Date.now().toString(),
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
      ip: "IP tracking requires backend", // Would require backend service
      device: getDeviceType(),
      userAgent: navigator.userAgent,
    };
    views.push(newView);
    localStorage.setItem(VIEWS_KEY, JSON.stringify(views));
  } catch (error) {
    console.error("Error recording page view:", error);
  }
};

export const getPageViews = (): PageView[] => {
  try {
    const views = localStorage.getItem(VIEWS_KEY);
    return views ? JSON.parse(views) : [];
  } catch (error) {
    console.error("Error getting page views:", error);
    return [];
  }
};

// Gallery items
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export const getGalleryItems = (): GalleryItem[] => {
  try {
    const items = localStorage.getItem(GALLERY_KEY);
    if (items) {
      return JSON.parse(items);
    } else {
      // Default gallery items
      const defaultItems: GalleryItem[] = [
        {
          id: "1",
          title: "לוגו תוכנה",
          category: "לוגואים",
          imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          description: "עיצוב לוגו לחברת תוכנה פורצת דרך, הלוגו משלב אלמנטים של חדשנות וטכנולוגיה.",
        },
        {
          id: "2",
          title: "דף נחיתה למוצר",
          category: "דפי נחיתה",
          imageUrl: "https://images.unsplash.com/photo-1481887328591-3e277f9473dc",
          description: "דף נחיתה למוצר חדשני בתחום הבריאות, מציג את היתרונות והתכונות הבולטות.",
        },
        {
          id: "3",
          title: "עיצוב תוכן לאינסטגרם",
          category: "ניהול תוכן",
          imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
          description: "פוסטים מעוצבים לאינסטגרם עבור חברה בתחום הקוסמטיקה, שהעלו את האינטראקציה ב-150%.",
        },
        {
          id: "4",
          title: "מיתוג מלא למסעדה",
          category: "מיתוג",
          imageUrl: "https://images.unsplash.com/photo-1583011927087-8002c33fb478",
          description: "מיתוג מלא למסעדה הכולל לוגו, תפריטים, אתר אינטרנט וחומרים שיווקיים נלווים.",
        },
        {
          id: "5",
          title: "לוגו למותג אופנה",
          category: "לוגואים",
          imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
          description: "עיצוב לוגו אלגנטי למותג אופנה יוקרתי, המשדר מינימליזם ואיכות.",
        },
        {
          id: "6",
          title: "קמפיין לרשתות חברתיות",
          category: "ניהול תוכן",
          imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
          description: "קמפיין שיווקי מקיף לרשתות חברתיות שהגדיל את המודעות למותג ב-200%.",
        },
      ];
      localStorage.setItem(GALLERY_KEY, JSON.stringify(defaultItems));
      return defaultItems;
    }
  } catch (error) {
    console.error("Error getting gallery items:", error);
    return [];
  }
};

export const saveGalleryItem = (item: GalleryItem): void => {
  try {
    const items = getGalleryItems();
    if (item.id) {
      // Update existing item
      const index = items.findIndex(i => i.id === item.id);
      if (index !== -1) {
        items[index] = item;
      }
    } else {
      // Add new item
      items.push({
        ...item,
        id: Date.now().toString(),
      });
    }
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving gallery item:", error);
    throw new Error("Failed to save gallery item");
  }
};

export const deleteGalleryItem = (id: string): void => {
  try {
    const items = getGalleryItems();
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    throw new Error("Failed to delete gallery item");
  }
};

// Website content management
export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  aboutTitle: string;
  aboutText: string;
  footerText: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export const getDefaultContent = (): SiteContent => {
  return {
    heroTitle: "יוצרים מותג מנצח לעסק שלך",
    heroSubtitle: "אנו מתמחים בעיצוב לוגואים מקצועיים, ניהול תוכן איכותי ובניית דפי נחיתה אפקטיביים לעסקים שרוצים להצליח בעידן הדיגיטלי.",
    heroCtaText: "צור קשר עכשיו",
    aboutTitle: "אודות B Studio",
    aboutText: "B Studio הוא סטודיו לעיצוב ומיתוג שהוקם כדי לספק פתרונות יצירתיים לעסקים בכל הגדלים. אנחנו מאמינים שעיצוב טוב הוא לא רק אסתטיקה, אלא כלי אסטרטגי לצמיחה עסקית.",
    footerText: "© כל הזכויות שמורות ל-B Studio",
    contactInfo: {
      phone: "050-1234567",
      email: "info@bstudio.com",
      address: "רחוב הרצל 50, תל אביב",
    },
  };
};

export const getSiteContent = (): SiteContent => {
  try {
    const content = localStorage.getItem(CONTENT_KEY);
    if (content) {
      return JSON.parse(content);
    } else {
      const defaultContent = getDefaultContent();
      localStorage.setItem(CONTENT_KEY, JSON.stringify(defaultContent));
      return defaultContent;
    }
  } catch (error) {
    console.error("Error getting site content:", error);
    return getDefaultContent();
  }
};

export const updateSiteContent = (content: SiteContent): void => {
  try {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  } catch (error) {
    console.error("Error updating site content:", error);
    throw new Error("Failed to update site content");
  }
};

// Helper functions
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (/Mobile|iPhone|Android|IEMobile|BlackBerry|Opera Mini/.test(ua)) {
    return "Mobile";
  }
  return "Desktop";
};
