
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteContent, recordPageView } from "@/services/database";

const Index = () => {
  const content = getSiteContent();

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
          ctaLink="/contact"
        />
        <ServicesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
