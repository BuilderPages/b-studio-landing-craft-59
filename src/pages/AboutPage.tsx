
import React from "react";
import { getSiteContent } from "@/services/database";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const content = getSiteContent();

  return (
    <div>
      <Navbar />
      <Hero 
        title={content.aboutTitle || "אודות"}
        subtitle={content.aboutText || "קצת עלינו ועל הדרך שלנו"}
        ctaText="צור קשר"
        ctaLink="/contact"
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-right">אודות</h2>
            
            <div className="prose prose-lg max-w-none text-right">
              <p>
                אנחנו סטודיו לעיצוב ופיתוח מובילים בתחום. הסטודיו הוקם מתוך תשוקה ליצירה ועיצוב 
                איכותי שמשלב אסתטיקה ופונקציונליות.
              </p>
              
              <p>
                הצוות שלנו מורכב ממעצבים ומפתחים מקצועיים עם שנים רבות של ניסיון במגוון תחומים: 
                עיצוב גרפי, בניית אתרים, UX/UI, מיתוג, ושיווק דיגיטלי.
              </p>
              
              <h3>הגישה שלנו</h3>
              
              <p>
                אנו מאמינים כי עיצוב טוב הוא זה שמשלב יופי ויעילות. בכל פרויקט אנו מקפידים על:
              </p>
              
              <ul>
                <li>הבנה מעמיקה של צרכי הלקוח והקהל שלו</li>
                <li>תשומת לב לפרטים הקטנים</li>
                <li>חדשנות וקריאטיביות</li>
                <li>שימוש בטכנולוגיות מתקדמות</li>
                <li>עמידה בלוחות זמנים</li>
              </ul>
              
              <h3>השירותים שלנו</h3>
              
              <p>
                אנו מתמחים בעיצוב ויצירה של:
              </p>
              
              <ul>
                <li>באנרים דיגיטליים לעסקים</li>
                <li>לוגואים מקצועיים ומותאמים אישית</li>
                <li>מיתוג עסקי מקיף</li>
                <li>חומרים שיווקיים דיגיטליים</li>
              </ul>
              
              <p>
                הניסיון המגוון שלנו מאפשר לנו להציע פתרונות יצירתיים המותאמים לצרכים הספציפיים 
                של כל עסק, מסטארטאפים קטנים ועד חברות גדולות.
              </p>
              
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                  alt="צוות הסטודיו"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-500 mt-2">צוות הסטודיו במפגש תכנון שבועי</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
