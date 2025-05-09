
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { getSiteContent } from "@/services/database";
import { getCurrentYear } from "@/utils/dateUtils";

const Footer = () => {
  const siteContent = getSiteContent();
  const footerContent = siteContent.footer || {
    description: "אנו מציעים פתרונות דיגיטליים מתקדמים לעסקים קטנים ובינוניים",
    quickLinksTitle: "קישורים מהירים",
    servicesTitle: "שירותים",
    contactTitle: "צור קשר",
    quickLinks: [
      { label: "דף הבית", url: "/" },
      { label: "אודות", url: "/about" },
      { label: "עבודות", url: "/gallery" },
      { label: "צור קשר", url: "/contact" },
    ],
    serviceLinks: [
      { label: "עיצוב אתרים", url: "/services" },
      { label: "בניית אתרים", url: "/services" },
      { label: "קידום אתרים", url: "/services" },
      { label: "עיצוב לוגו", url: "/services" },
    ],
    contactInfo: {
      phone: "03-1234567",
      email: "info@bstudio.co.il",
      address: "רחוב הראשי 123, תל אביב",
    },
    socialLinks: [
      {
        name: "פייסבוק",
        url: "https://facebook.com",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>`,
      },
      {
        name: "אינסטגרם",
        url: "https://instagram.com",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
      },
      {
        name: "לינקדאין",
        url: "https://linkedin.com",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>`,
      },
    ],
    copyrightText: "© {year} B Studio. כל הזכויות שמורות.",
  };
  const year = getCurrentYear();

  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-gray-600 text-right">
              {footerContent.description}
            </p>
          </div>

          <div className="text-right">
            <h3 className="font-bold text-gray-800 mb-4">{footerContent.quickLinksTitle}</h3>
            <div className="space-y-2 flex flex-col items-end">
              {footerContent.quickLinks?.map((link, index) => (
                <Link 
                  key={index}
                  to={link.url} 
                  className="text-gray-600 hover:text-bstudio-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-right">
            <h3 className="font-bold text-gray-800 mb-4">{footerContent.servicesTitle}</h3>
            <div className="space-y-2 flex flex-col items-end">
              {footerContent.serviceLinks?.map((link, index) => (
                <Link 
                  key={index}
                  to={link.url} 
                  className="text-gray-600 hover:text-bstudio-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-right">
            <h3 className="font-bold text-gray-800 mb-4">{footerContent.contactTitle}</h3>
            <div className="space-y-2 flex flex-col items-end">
              <p className="text-gray-600">{footerContent.contactInfo?.phone}</p>
              <p className="text-gray-600">{footerContent.contactInfo?.email}</p>
              <p className="text-gray-600">{footerContent.contactInfo?.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center md:flex md:justify-between">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <Link to="/privacy" className="text-gray-600 hover:text-bstudio-primary text-sm">
              מדיניות פרטיות
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/accessibility" className="text-gray-600 hover:text-bstudio-primary text-sm">
              הצהרת נגישות
            </Link>
          </div>
          
          <p className="text-gray-500">{(footerContent.copyrightText || siteContent.footerText || "© {year} B Studio. כל הזכויות שמורות.").replace('{year}', year)}</p>
          
          <div className="mt-4 md:mt-0 flex justify-center space-x-4">
            {footerContent.socialLinks?.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-bstudio-primary"
                aria-label={`בקר אותנו ב${social.name}`}
              >
                <span className="sr-only">{social.name}</span>
                <div dangerouslySetInnerHTML={{ __html: social.icon }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
