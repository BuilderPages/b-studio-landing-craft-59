
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GalleryItem } from "@/services/database";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HomeGalleryProps {
  items: GalleryItem[];
  autoplayInterval?: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const HomeGallery: React.FC<HomeGalleryProps> = ({ 
  items, 
  autoplayInterval = 5000,
  title,
  description,
  ctaText,
  ctaLink
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Autoplay functionality
  useEffect(() => {
    if (items.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [items.length, autoplayInterval]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <Carousel className="max-w-5xl mx-auto mb-10" setActiveIndex={setActiveIndex} activeIndex={activeIndex}>
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={item.id}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <div className="relative aspect-video">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-white/80">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex % items.length ? "bg-bstudio-primary" : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative transform-none translate-y-0 mr-2" />
            <CarouselNext className="relative transform-none translate-y-0 ml-2" />
          </div>
        </Carousel>

        <div className="text-center mt-8">
          <Link to={ctaLink}>
            <Button size="lg" className="bg-bstudio-primary text-white hover:bg-bstudio-primary/90">
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
