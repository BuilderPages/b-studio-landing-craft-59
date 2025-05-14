
import React from "react";
import { Helmet } from "react-helmet";
import { getSiteContent } from "@/services/database";

interface PageMetaProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean; // Add option to exclude page from search engines
}

/**
 * PageMeta component for setting page metadata
 */
const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  keywords,
  ogImage,
  noIndex = false
}) => {
  const content = getSiteContent();
  const siteName = content.siteName || "B Studio";
  const fullTitle = `${title} | ${siteName}`;
  const metaDescription = description || content.siteDescription || "B Studio - עיצוב ופיתוח אתרים מקצועי";
  const metaKeywords = keywords || "עיצוב, פיתוח, מיתוג, שיווק, אתרים";
  const image = ogImage || "https://lovable.dev/opengraph-image-p98pqg.png";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* If page should not be indexed */}
      {noIndex && (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Helmet>
  );
};

export default PageMeta;
