
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { getGalleryItems, recordPageView } from "@/services/database";

const GalleryPage = () => {
  useEffect(() => {
    // Record page view for analytics
    recordPageView();
  }, []);

  const galleryItems = getGalleryItems();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">גלרית העבודות שלנו</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              צפו בעבודות הקודמות שלנו והתרשמו מהאיכות והמקצועיות
            </p>
          </div>

          <Gallery items={galleryItems} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
