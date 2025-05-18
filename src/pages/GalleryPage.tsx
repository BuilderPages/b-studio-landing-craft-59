
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { getGalleryItems, recordPageView, saveGalleryItem } from "@/services/database";
import PageMeta from "@/components/PageMeta";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { GalleryItem } from "@/components/Gallery";

const GalleryPage = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Record page view for analytics
    recordPageView();
    
    // Get gallery items
    let galleryItems = getGalleryItems();
    
    // If no items exist, create example items
    if (galleryItems.length === 0) {
      const exampleItems: Omit<GalleryItem, "id">[] = [
        {
          title: "עיצוב לוגו לחברת טכנולוגיה",
          category: "עיצוב גרפי",
          imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
          description: "עיצוב לוגו מודרני לחברת סטארט-אפ בתחום הטכנולוגיה. הלוגו משלב אלמנטים של חדשנות וטכנולוגיה מתקדמת.",
        },
        {
          title: "פיתוח אתר תדמית",
          category: "בניית אתרים",
          imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
          description: "אתר תדמית מודרני לחברת היי-טק המציג את המוצרים והשירותים בצורה אינטראקטיבית ומותאמת למובייל.",
        },
        {
          title: "קמפיין דיגיטלי",
          category: "שיווק דיגיטלי",
          imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          description: "קמפיין דיגיטלי מקיף עבור מותג אופנה מקומי שכלל עיצוב באנרים, פרסום ברשתות חברתיות וניהול קמפיין PPC.",
        },
        {
          title: "עיצוב חוויית משתמש",
          category: "UX/UI",
          imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
          description: "עיצוב ממשק משתמש אינטואיטיבי וידידותי עבור אפליקציה פיננסית, תוך דגש על נגישות ושימושיות.",
        },
        {
          title: "מיתוג מסעדה",
          category: "מיתוג",
          imageUrl: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
          description: "פרויקט מיתוג מקיף למסעדה חדשה, כולל לוגו, תפריטים, כרטיסי ביקור, ועיצוב חלל המסעדה.",
        },
        {
          title: "חנות אונליין",
          category: "בניית אתרים",
          imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
          description: "הקמת חנות מקוונת מלאה לעסק קמעונאי, כולל מערכת ניהול מלאי, סליקת אשראי ואינטגרציה עם מערכות חיצוניות.",
        },
        {
          title: "עיצוב אריזה למוצר",
          category: "עיצוב גרפי",
          imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
          description: "עיצוב אריזה ייחודית למוצר צריכה, תוך התחשבות בערכי המותג, נראות במדף וחוויית המשתמש בפתיחת האריזה.",
        },
        {
          title: "ייעוץ אסטרטגי",
          category: "אסטרטגיה",
          imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
          description: "ליווי עסק בבניית אסטרטגיית מיתוג ושיווק, כולל מחקר שוק, אפיון קהל יעד, ובניית תכנית פעולה מקיפה.",
        },
      ];
      
      // Save example items
      exampleItems.forEach(item => {
        saveGalleryItem(item);
      });
      
      // Get updated items list
      galleryItems = getGalleryItems();
    }
    
    setItems(galleryItems);
  }, []);

  return (
    <div className="min-h-screen">
      <PageMeta 
        title="גלרית עבודות" 
        description="צפו בעבודות הקודמות שלנו והתרשמו מהאיכות והמקצועיות" 
        keywords="גלריה, עבודות, פרויקטים, עיצוב"
      />
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">גלרית העבודות שלנו</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              צפו בעבודות הקודמות שלנו והתרשמו מהאיכות והמקצועיות
            </p>
          </div>

          <Gallery items={items} />
        </div>
      </main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
};

export default GalleryPage;
