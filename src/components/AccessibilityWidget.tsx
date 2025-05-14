
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AccessibilityWidget: React.FC = () => {
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem("accessibility-font-size");
    const savedContrast = localStorage.getItem("accessibility-high-contrast");
    
    if (savedFontSize) setFontSize(parseFloat(savedFontSize));
    if (savedContrast) setHighContrast(savedContrast === "true");
    
    // Apply saved settings
    applyFontSize(savedFontSize ? parseFloat(savedFontSize) : 1);
    applyContrast(savedContrast === "true");
  }, []);
  
  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 0.1, 1.5);
    setFontSize(newSize);
    applyFontSize(newSize);
    localStorage.setItem("accessibility-font-size", newSize.toString());
  };
  
  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 0.1, 0.8);
    setFontSize(newSize);
    applyFontSize(newSize);
    localStorage.setItem("accessibility-font-size", newSize.toString());
  };
  
  const resetFontSize = () => {
    setFontSize(1);
    applyFontSize(1);
    localStorage.setItem("accessibility-font-size", "1");
  };
  
  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    applyContrast(newValue);
    localStorage.setItem("accessibility-high-contrast", newValue.toString());
  };
  
  const applyFontSize = (size: number) => {
    document.documentElement.style.fontSize = `${size * 100}%`;
  };
  
  const applyContrast = (enabled: boolean) => {
    if (enabled) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  };

  return (
    <div className="fixed bottom-4 start-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            className="rounded-full w-12 h-12 flex items-center justify-center bg-bstudio-primary hover:bg-bstudio-primary/90 text-white"
            aria-label="הגדרות נגישות"
            title="הגדרות נגישות"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="m16.24 7.76-8.48 8.48"/>
              <path d="m7.76 7.76 8.48 8.48"/>
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-72" 
          align="start"
          side="top"
        >
          <div className="p-2">
            <h3 className="text-lg font-bold mb-4 text-right">אפשרויות נגישות</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-right">גודל טקסט</p>
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={decreaseFontSize}
                    aria-label="הקטן גודל טקסט"
                    title="הקטן גודל טקסט"
                  >
                    א-
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFontSize}
                    aria-label="אפס גודל טקסט"
                    title="אפס גודל טקסט"
                  >
                    איפוס
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={increaseFontSize}
                    aria-label="הגדל גודל טקסט"
                    title="הגדל גודל טקסט"
                  >
                    א+
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <button 
                  onClick={toggleHighContrast}
                  className={`inline-flex items-center px-3 py-2 text-sm rounded-md ${
                    highContrast 
                      ? 'bg-bstudio-primary text-white' 
                      : 'border border-gray-300 bg-white'
                  }`}
                  aria-pressed={highContrast}
                  title="מצב ניגודיות גבוהה"
                >
                  <span className={highContrast ? 'text-white' : 'text-gray-800'}>
                    ניגודיות גבוהה
                  </span>
                </button>
              </div>
              
              <div className="border-t pt-2 text-right">
                <a 
                  href="/accessibility" 
                  className="text-sm text-bstudio-primary hover:underline"
                  title="הצהרת נגישות מלאה"
                >
                  הצהרת נגישות מלאה
                </a>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccessibilityWidget;
