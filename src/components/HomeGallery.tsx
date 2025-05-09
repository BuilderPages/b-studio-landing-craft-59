
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { type UseEmblaCarouselType } from "embla-carousel-react";
import { GalleryItem, getHomeGalleryItems, getSiteContent } from "@/services/database";

interface HomeGalleryProps {
  autoplayInterval?: number;
}

const HomeGallery: React.FC<HomeGalleryProps> = ({ 
  autoplayInterval = 5000,
}) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const content = getSiteContent();
  const [settings, setSettings] = useState({
    title: content.galleryTitle || "העבודות שלנו",
    description: content.galleryDescription || "הצצה לפרויקטים האחרונים שלנו",
    ctaText: content.galleryCtaText || "צפה בכל העבודות",
    ctaLink: content.galleryCtaLink || "/gallery"
  });
  
  // Load gallery items and settings
  useEffect(() => {
    // Get gallery items
    const galleryItems = getHomeGalleryItems();
    setItems(galleryItems);
    
    // Get settings
    try {
      const storedSettings = localStorage.getItem('homeGallerySettings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Error loading gallery settings:", error);
    }
  }, []);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Initialize and set up Embla events
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);
  
  // Autoplay functionality
  useEffect(() => {
    if (items.length <= 1 || !emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [items.length, autoplayInterval, emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  if (items.length === 0) {
    return null;
  }

  // Real images that will be used if not enough gallery items
  const realImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1447758902204-9a8371e0e1b4",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040"
  ];

  // Make sure we have 6 items to display
  const displayItems = items.slice(0, 6);
  while (displayItems.length < 6) {
    const baseItem = items[0] || {
      id: `placeholder-${displayItems.length}`,
      title: "פרויקט לדוגמה",
      description: "תיאור של הפרויקט",
      category: "כללי",
      imageUrl: realImages[displayItems.length % realImages.length]
    };
    
    displayItems.push({
      ...baseItem,
      id: `placeholder-${displayItems.length}`,
      imageUrl: realImages[displayItems.length % realImages.length]
    });
  }

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12" role="region" aria-label="גלריית עבודות">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{settings.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {settings.description}
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayItems.map((item, index) => (
                <div 
                  className="flex-[0_0_100%] min-w-0" 
                  key={item.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} מתוך ${displayItems.length}`}
                >
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl shadow-lg">
                      <div className="relative aspect-video">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                          <p className="text-white/80">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {displayItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-bstudio-primary" : "bg-gray-300"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`עבור לתמונה ${index + 1}`}
                aria-current={index === activeIndex ? "true" : "false"}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => emblaApi?.scrollPrev()} 
              className="relative transform-none translate-y-0 ml-2"
              variant="outline"
              size="icon"
              aria-label="תמונה קודמת"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
            <Button 
              onClick={() => emblaApi?.scrollNext()} 
              className="relative transform-none translate-y-0 mr-2"
              variant="outline"
              size="icon"
              aria-label="תמונה הבאה"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to={settings.ctaLink}>
            <Button size="lg" className="bg-bstudio-primary text-white hover:bg-bstudio-primary/90">
              {settings.ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
