
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getHomeGalleryItems } from "@/services/database";

const WorksSlider: React.FC<{
  autoplaySpeed?: number;
  title?: string;
  maxWorks?: number;
}> = ({ 
  autoplaySpeed = 3000,
  title = "עבודות לדוגמא",
  maxWorks,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [works, setWorks] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedWork, setSelectedWork] = useState<any | null>(null);
  const [displayCount, setDisplayCount] = useState(10);
  
  useEffect(() => {
    // Try to get works from the database
    const galleryItems = getHomeGalleryItems();
    
    // Get max items setting from localStorage (set in admin panel)
    const savedMaxItems = localStorage.getItem('maxSliderItems');
    const maxItems = savedMaxItems ? parseInt(savedMaxItems) : maxWorks || 10;
    setDisplayCount(maxItems);
    
    if (galleryItems && galleryItems.length > 0) {
      setWorks(galleryItems.slice(0, maxItems));
    } else {
      // Use sample data as fallback (moved inside for better scope)
      const sampleWorks = [
        {
          id: "1",
          title: "עיצוב לוגו לחברת טכנולוגיה",
          imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
          description: "עיצוב זהות מותגית לחברת סטארט-אפ בתחום הטכנולוגיה"
        },
        {
          id: "2",
          title: "עיצוב אתר אינטרנט",
          imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5",
          description: "אתר רספונסיבי עם חווית משתמש מיטבית למותג אופנה"
        },
        {
          id: "3",
          title: "קמפיין פרסומי",
          imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
          description: "סדרת מודעות פרסום לקמפיין דיגיטלי"
        },
        {
          id: "4",
          title: "עיצוב אריזה",
          imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554",
          description: "עיצוב אריזה למוצר קוסמטיקה חדשני"
        },
        {
          id: "5",
          title: "כרטיס ביקור",
          imageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
          description: "עיצוב כרטיסי ביקור יוקרתיים למשרד עורכי דין"
        },
        {
          id: "6",
          title: "עיצוב מודעה לעיתון",
          imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa",
          description: "מודעת פרסום מעוצבת לפרסום בעיתונות מודפסת"
        },
        {
          id: "7",
          title: "עיצוב חוברת תדמית",
          imageUrl: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc",
          description: "עיצוב חוברת תדמית מקצועית לחברת נדל״ן"
        },
        {
          id: "8",
          title: "עיצוב פוסטר",
          imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
          description: "עיצוב פוסטר לאירוע תרבותי"
        },
        {
          id: "9",
          title: "מיתוג מסעדה",
          imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92",
          description: "עיצוב זהות מותגית מלאה למסעדה חדשה"
        },
        {
          id: "10",
          title: "עיצוב UI/UX לאפליקציה",
          imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
          description: "עיצוב ממשק משתמש אינטואיטיבי לאפליקציית מובייל"
        }
      ];
      setWorks(sampleWorks.slice(0, maxItems));
    }
  }, [maxWorks]);
  
  useEffect(() => {
    // Set up autoplay
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying && works.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
      }, autoplaySpeed);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, works.length, autoplaySpeed]);
  
  // Pause autoplay when preview is open
  useEffect(() => {
    if (selectedWork) {
      setIsPlaying(false);
    }
  }, [selectedWork]);
  
  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length);
  };
  
  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
  };
  
  const handleDotClick = (index: number) => {
    setIsPlaying(false);
    setCurrentIndex(index);
  };
  
  const handleSliderChange = (value: number[]) => {
    setIsPlaying(false);
    setCurrentIndex(value[0]);
  };
  
  const handleWorkClick = (work: any) => {
    setSelectedWork(work);
  };
  
  const closePreview = () => {
    setSelectedWork(null);
    setIsPlaying(true);
  };
  
  if (works.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main slider */}
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            {works.map((work, index) => (
              <div 
                key={work.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0"
                }`}
                onClick={() => handleWorkClick(work)}
              >
                <img 
                  src={work.imageUrl} 
                  alt={work.title} 
                  className="w-full h-full object-cover cursor-pointer"
                  loading={index === currentIndex ? "eager" : "lazy"}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="font-bold text-xl">{work.title}</h3>
                  <p className="text-sm text-white/80">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between mt-4">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handlePrev}
                aria-label="תמונה קודמת"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "עצור תצוגה אוטומטית" : "הפעל תצוגה אוטומטית"}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="4" height="16" x="6" y="4" />
                    <rect width="4" height="16" x="14" y="4" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNext}
                aria-label="תמונה הבאה"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Button>
            </div>
            
            <div className="w-1/2 flex items-center px-2">
              <Slider
                min={0}
                max={works.length - 1}
                step={1}
                value={[currentIndex]}
                onValueChange={handleSliderChange}
                aria-label="בחר תמונה"
              />
            </div>
          </div>
          
          {/* Dot indicators */}
          <div className="flex justify-center mt-4 space-x-1">
            {works.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`עבור לתמונה ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Preview dialog */}
      <Dialog open={!!selectedWork} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="max-w-4xl">
          {selectedWork && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center">
                <img 
                  src={selectedWork.imageUrl} 
                  alt={selectedWork.title} 
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              <div className="flex flex-col text-right">
                <h3 className="text-2xl font-bold mb-2">{selectedWork.title}</h3>
                <p className="text-gray-600">{selectedWork.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WorksSlider;
