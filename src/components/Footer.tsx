
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { getSiteContent, getFooterContent } from "@/services/database";
import { getCurrentYear } from "@/utils/dateUtils";

const Footer = () => {
  const siteContent = getSiteContent();
  const footerContent = getFooterContent();
  const year = getCurrentYear();

  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex justify-end w-full">
              <Logo />
            </div>
            <p className="mt-4 text-gray-600 text-right">
              {footerContent.description}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="font-bold text-gray-800 mb-4 text-right">{footerContent.quickLinksTitle}</h3>
            <div className="space-y-2 flex flex-col items-end text-right">
              {footerContent.quickLinks?.map((link, index) => (
                <Link 
                  key={index}
                  to={link.url} 
                  className="text-gray-600 hover:text-bstudio-primary transition-colors"
                  title={link.label}
                  aria-label={`ניווט אל ${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="font-bold text-gray-800 mb-4 text-right">{footerContent.servicesTitle}</h3>
            <div className="space-y-2 flex flex-col items-end text-right">
              {footerContent.serviceLinks?.map((link, index) => (
                <Link 
                  key={index}
                  to={link.url} 
                  className="text-gray-600 hover:text-bstudio-primary transition-colors"
                  title={link.label}
                  aria-label={`ניווט אל ${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="font-bold text-gray-800 mb-4 text-right">{footerContent.contactTitle}</h3>
            <div className="space-y-2 flex flex-col items-end text-right">
              <p className="text-gray-600">{footerContent.contactInfo?.phone}</p>
              <p className="text-gray-600">{footerContent.contactInfo?.email}</p>
              <p className="text-gray-600">{footerContent.contactInfo?.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center md:flex md:justify-between">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-bstudio-primary text-sm"
              title="מדיניות פרטיות"
              aria-label="מדיניות פרטיות"
            >
              מדיניות פרטיות
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/accessibility" 
              className="text-gray-600 hover:text-bstudio-primary text-sm"
              title="הצהרת נגישות"
              aria-label="הצהרת נגישות"
            >
              הצהרת נגישות
            </Link>
          </div>
          
          <p className="text-gray-500 text-center">{(footerContent.copyrightText || siteContent.footerText || "© {year} B Studio. כל הזכויות שמורות.").replace('{year}', year)}</p>
          
          <div className="mt-4 md:mt-0 flex justify-center space-x-4">
            {footerContent.socialLinks?.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-bstudio-primary"
                aria-label={`בקר אותנו ב${social.name}`}
                title={social.name}
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
