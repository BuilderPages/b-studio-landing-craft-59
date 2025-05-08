
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { getFooterContent } from "@/services/database";

const Footer = () => {
  const footerContent = getFooterContent();
  const year = new Date().getFullYear();

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
              {footerContent.quickLinks.map((link, index) => (
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
              {footerContent.serviceLinks.map((link, index) => (
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
              <p className="text-gray-600">{footerContent.contactInfo.phone}</p>
              <p className="text-gray-600">{footerContent.contactInfo.email}</p>
              <p className="text-gray-600">{footerContent.contactInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center md:flex md:justify-between">
          <p className="text-gray-500">{footerContent.copyrightText.replace('{year}', year.toString())}</p>
          <div className="mt-4 md:mt-0 flex justify-center space-x-4">
            {footerContent.socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-bstudio-primary"
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
