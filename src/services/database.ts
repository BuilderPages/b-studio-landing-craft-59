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

export interface SiteContent {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  homePage: {
    heroTitle: string;
    heroSubtitle: string;
    aboutUsTitle: string;
    aboutUsDescription: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  order?: number;
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

if (!localStorage.getItem('siteContent')) {
  const defaultContent: SiteContent = {
    contactInfo: {
      phone: '050-1234567',
      email: 'info@bstudio.com',
      address: 'רחוב המרכבה 50, תל אביב',
    },
    homePage: {
      heroTitle: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
      heroSubtitle: 'אנחנו עוזרים לעסקים לבנות מותג חזק ולספר את הסיפור שלהם בדיגיטל',
      aboutUsTitle: 'קצת עלינו',
      aboutUsDescription: 'אנחנו סטודיו בוטיק המתמחה במיתוג, עיצוב גרפי ובניית אתרים. הסטודיו הוקם מתוך אהבה ליצירה ורצון לעזור לעסקים לצמוח ולגדול בעזרת כלים דיגיטליים. הניסיון והידע שלנו מאפשרים לנו להעניק ללקוחותינו פתרונות מותאמים אישית, תוך הקפדה על איכות, חדשנות ויצירתיות.',
    },
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
  const newContact = {
    id: crypto.randomUUID(),
    ...contact,
    date: new Date().toISOString(),
  };
  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  return newContact;
}

// Page Views
export function getPageViews(): PageView[] {
  const pageViews = localStorage.getItem('pageViews');
  return pageViews ? JSON.parse(pageViews) : [];
}

export function recordPageView(path: string = window.location.pathname): void {
  const pageViews = getPageViews();
  const newPageView: PageView = {
    id: crypto.randomUUID(),
    path: path,
    date: new Date().toLocaleDateString(),
    timestamp: new Date().toISOString(),
    device: /Mobile|iPhone|Android|IEMobile|BlackBerry|Opera Mini/.test(navigator.userAgent)
      ? "Mobile"
      : "Desktop",
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
    },
    homePage: {
      heroTitle: 'סטודיו בוטיק למיתוג ויצירת חוויה דיגיטלית',
      heroSubtitle: 'אנחנו עוזרים לעסקים לבנות מותג חזק ולספר את הסיפור שלהם בדיגיטל',
      aboutUsTitle: 'קצת עלינו',
      aboutUsDescription: 'אנחנו סטודיו בוטיק המתמחה במיתוג, עיצוב גרפי ובניית אתרים. הסטודיו הוקם מתוך אהבה ליצירה ורצון לעזור לעסקים לצמוח ולגדול בעזרת כלים דיגיטליים. הניסיון והידע שלנו מאפשרים לנו להעניק ללקוחותינו פתרונות מותאמים אישית, תוך הקפדה על איכות, חדשנות ויצירתיות.',
    },
  };
}

export function saveSiteContent(content: SiteContent): void {
  localStorage.setItem('siteContent', JSON.stringify(content));
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
