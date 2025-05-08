
import { v4 as uuidv4 } from 'uuid';
// Mock data for gallery items
let _galleryItems = [
    {
        id: uuidv4(),
        title: "עיצוב לוגו לחברת הייטק",
        category: "לוגואים",
        imageUrl: "https://images.unsplash.com/photo-1517620347510-4c2675c1d40f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        description: "עיצוב לוגו מודרני לחברת הייטק המתמחה בפיתוח תוכנה."
    },
    {
        id: uuidv4(),
        title: "דף נחיתה לקורס דיגיטלי",
        category: "דפי נחיתה",
        imageUrl: "https://images.unsplash.com/photo-1550064824-8f9930410b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        description: "עיצוב דף נחיתה מושך לקורס דיגיטלי בתחום השיווק."
    },
    {
        id: uuidv4(),
        title: "ניהול תוכן לרשת חברתית",
        category: "ניהול תוכן",
        imageUrl: "https://images.unsplash.com/photo-1485291571150-772bcfc06961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2120&q=80",
        description: "ניהול תוכן שוטף לרשת חברתית של חברת אופנה."
    },
    {
        id: uuidv4(),
        title: "מיתוג לעסק חדש",
        category: "מיתוג",
        imageUrl: "https://images.unsplash.com/photo-1493612276130-2ae5bca3f6d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        description: "מיתוג מלא לעסק חדש בתחום המסעדנות."
    },
    {
        id: uuidv4(),
        title: "עיצוב לוגו לחברת קוסמטיקה",
        category: "לוגואים",
        imageUrl: "https://images.unsplash.com/photo-1607346256330-dee79c71675b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        description: "עיצוב לוגו יוקרתי לחברת קוסמטיקה חדשה."
    },
    {
        id: uuidv4(),
        title: "דף נחיתה לסדנת צילום",
        category: "דפי נחיתה",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        description: "עיצוב דף נחיתה מזמין לסדנת צילום למתחילים."
    }
];

// Mock data for contact form submissions
let _contacts = [];

// Mock data for page views
let _pageViews = [];

// Mock data for site content
let _siteContent = {
    heroTitle: "יוצרים מותג מנצח לעסק שלך",
    heroSubtitle: "B Studio מספקת שירותי עיצוב ופיתוח מקצועיים שעוזרים לעסקים להתבלט בשוק התחרותי",
    heroCtaText: "צור קשר",
    heroCtaLink: "/contact",
    heroBackgroundImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    ctaTitle: "מוכנים לקחת את העסק שלכם לשלב הבא?",
    ctaDescription: "צרו איתנו קשר היום לקבלת ייעוץ ראשוני ללא עלות ותגלו איך אנחנו יכולים לעזור לעסק שלכם לבלוט בשוק התחרותי.",
    ctaButtonText: "צרו קשר עכשיו",
    ctaButtonLink: "/contact",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    galleryTitle: "העבודות שלנו",
    galleryDescription: "הצצה לפרויקטים האחרונים שלנו",
    galleryCtaText: "צפה בכל העבודות",
    galleryCtaLink: "/gallery",
    aboutTitle: "קצת עלינו",
    aboutText: "B Studio הוקמה בשנת 2024 כדי לספק פתרונות עיצוב ופיתוח מקצועיים לעסקים בכל הגדלים. הצוות המנוסה שלנו מתמחה בעיצוב לוגואים, בניית דפי נחיתה וניהול תוכן באופן שמייצר תוצאות אמיתיות לעסקים.",
    contactInfo: {
        phone: "050-1234567",
        email: "info@bstudio.com",
        address: "רחוב הרצל 50, תל אביב"
    },
    footerText: "© {year} כל הזכויות שמורות ל-B Studio"
};

// Mock data for navigation - Updated to separate "דף בית" and "שירותים"
let _navigation = {
    items: [
        {
            id: "1",
            label: "דף בית",
            url: "/"
        },
        {
            id: "2",
            label: "שירותים",
            url: "/#services"
        },
        {
            id: "3",
            label: "גלריה",
            url: "/gallery"
        },
        {
            id: "4",
            label: "צור קשר",
            url: "/contact"
        },
        {
            id: "5",
            label: "ניהול",
            url: "/admin",
            highlight: true
        }
    ]
};

// Mock data for footer content
let _footerContent = {
    description: "B Studio מציעה שירותי עיצוב לוגו מקצועיים, ניהול תוכן איכותי ובניית דפי נחיתה אפקטיביים לעסקים שרוצים להתבלט.",
    quickLinksTitle: "ניווט מהיר",
    quickLinks: [
        {
            label: "דף בית",
            url: "/"
        },
        {
            label: "שירותים",
            url: "/#services"
        },
        {
            label: "גלריה",
            url: "/gallery"
        },
        {
            label: "צור קשר",
            url: "/contact"
        }
    ],
    servicesTitle: "שירותים",
    serviceLinks: [
        {
            label: "עיצוב לוגואים",
            url: "/#services"
        },
        {
            label: "ניהול תוכן",
            url: "/#services"
        },
        {
            label: "דפי נחיתה",
            url: "/#services"
        },
        {
            label: "עיצוב מותגים",
            url: "/#services"
        }
    ],
    contactTitle: "צור קשר",
    contactInfo: {
        phone: "טלפון: 050-1234567",
        email: "אימייל: info@bstudio.com",
        address: "כתובת: רחוב הרצל 50, תל אביב"
    },
    copyrightText: "© {year} כל הזכויות שמורות ל-B Studio",
    socialLinks: [
        {
            name: "Facebook",
            url: "https://facebook.com",
            icon: '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>'
        },
        {
            name: "Instagram",
            url: "https://instagram.com",
            icon: '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>'
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com",
            icon: '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
        }
    ]
};

// Function to get gallery items
export const getGalleryItems = () => {
    return JSON.parse(JSON.stringify(_galleryItems));
};

// Function to save a gallery item
export const saveGalleryItem = (item) => {
    if (item.id) {
        // Update existing item
        _galleryItems = _galleryItems.map((i) => i.id === item.id ? item : i);
    } else {
        // Add new item
        item.id = uuidv4();
        _galleryItems.push(item);
    }
};

// Function to delete a gallery item
export const deleteGalleryItem = (id) => {
    _galleryItems = _galleryItems.filter((item) => item.id !== id);
};

// Function to add a contact form submission
export const addContact = (contact) => {
    contact.id = uuidv4();
    contact.date = new Date().toISOString();
    _contacts.push(contact);
};

// Alias for addContact to maintain compatibility
export const saveContact = addContact;

// Function to get all contact form submissions
export const getContacts = () => {
    return JSON.parse(JSON.stringify(_contacts));
};

// Function to delete contact
export const deleteContact = (id) => {
    _contacts = _contacts.filter((contact) => contact.id !== id);
};

// Function to record a page view
export const recordPageView = (path = '/') => {
    const device = getDeviceType();
    const now = new Date();
    const pageView = {
        id: uuidv4(),
        path,
        date: now.toISOString(),
        timestamp: now.toISOString(),
        device
    };
    _pageViews.push(pageView);
};

// Function to get all page views
export const getPageViews = () => {
    return JSON.parse(JSON.stringify(_pageViews));
};

// Function to determine device type
const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
        return 'Mobile';
    } else if (width >= 768 && width < 1024) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
};

// Getter function for site content
export const getSiteContent = () => {
    return {
        ..._siteContent
    };
};

// Update function for site content
export const updateSiteContent = (content) => {
    _siteContent = {
        ..._siteContent,
        ...content
    };
    return {
        ..._siteContent
    };
};

// Getter function for navigation
export const getNavigation = () => {
    return JSON.parse(JSON.stringify(_navigation));
};

// Update function for navigation
export const updateNavigation = (navigation) => {
    _navigation = {
        ...navigation
    };
    return {
        ..._navigation
    };
};

// Getter function for footer content
export const getFooterContent = () => {
    return JSON.parse(JSON.stringify(_footerContent));
};

// Update function for footer content
export const updateFooterContent = (content) => {
    _footerContent = {
        ..._footerContent,
        ...content
    };
    return {
        ..._footerContent
    };
};

// Define types for TypeScript
export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    date: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface PageView {
    id: string;
    path: string;
    date: string;
    timestamp: string;
    device: string;
}

export interface FooterContent {
    description: string;
    quickLinksTitle: string;
    quickLinks: Array<{ label: string; url: string }>;
    servicesTitle: string;
    serviceLinks: Array<{ label: string; url: string }>;
    contactTitle: string;
    contactInfo: {
        phone: string;
        email: string;
        address: string;
    };
    copyrightText: string;
    socialLinks: Array<{
        name: string;
        url: string;
        icon: string;
    }>;
}
