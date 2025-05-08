
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeGallery from "@/components/HomeGallery";
import { getSiteContent, getGalleryItems, recordPageView } from "@/services/database";

const Index = () => {
  const content = getSiteContent();
  const galleryItems = getGalleryItems();

  useEffect(() => {
    // Record page view for analytics
    recordPageView();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero 
          title={content.heroTitle}
          subtitle={content.heroSubtitle}
          ctaText={content.heroCtaText}
          ctaLink={content.heroCtaLink || "/contact"}
          backgroundImage={content.heroBackgroundImage}
        />
        <ServicesSection />
        <HomeGallery 
          items={galleryItems}
          autoplayInterval={5000}
          title={content.galleryTitle || "העבודות שלנו"}
          description={content.galleryDescription || "הצצה לפרויקטים האחרונים שלנו"}
          ctaText={content.galleryCtaText || "צפה בכל העבודות"}
          ctaLink={content.galleryCtaLink || "/gallery"}
        />
        <CtaSection 
          title={content.ctaTitle || "מוכנים לקחת את העסק שלכם לשלב הבא?"}
          description={content.ctaDescription || "צרו איתנו קשר היום לקבלת ייעוץ ראשוני ללא עלות ותגלו איך אנחנו יכולים לעזור לעסק שלכם לבלוט בשוק התחרותי."}
          ctaText={content.ctaButtonText || "צרו קשר עכשיו"}
          ctaLink={content.ctaButtonLink || "/contact"}
          videoUrl={content.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
