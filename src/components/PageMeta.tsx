
import React from "react";
import { Helmet } from "react-helmet";
import { getSiteContent } from "@/services/database";

interface PageMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  canonicalUrl?: string;
}

const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  keywords,
  imageUrl,
  canonicalUrl,
}) => {
  const siteContent = getSiteContent();
  const siteTitle = siteContent.siteName;
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteContent.siteDescription;
  const pageImage = imageUrl || (siteContent.logoUrl || "");
  const currentUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {pageImage && <meta property="og:image" content={pageImage} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      {pageImage && <meta property="twitter:image" content={pageImage} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Language */}
      <html lang="he" dir="rtl" />
    </Helmet>
  );
};

export default PageMeta;
