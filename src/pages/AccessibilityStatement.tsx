import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { recordPageView } from "@/services/database";

const AccessibilityStatement = () => {
  useEffect(() => {
    // Record page view for analytics
    recordPageView();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-right">הצהרת נגישות</h1>
          
          <div className="prose prose-lg max-w-none text-right">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">מחויבות לנגישות</h2>
              <p className="mb-4">
                B Studio מחויבת לאפשר לכל המשתמשים, כולל אנשים עם מוגבלויות, לגלוש ולהשתמש באתר שלנו. אנו שואפים להבטיח שהאתר שלנו עומד בהנחיות הנגישות העדכניות ביותר ובתקנות הנגישות הישראליות.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">תאימות</h2>
              <p className="mb-4">
                אתר זה פותח כך שיהיה תואם לתקנות הנגישות הישראליות על פי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013 ועומד בדרישות רמה AA של הנחיות WCAG 2.1.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">תכונות נגישות באתר שלנו</h2>
              <p className="mb-4">
                אתר זה כולל את התכונות הבאות שנועדו לשפר את הנגישות עבור כל המשתמשים:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li>תוויות מסך קריאות (Alt Text) לתמונות</li>
                <li>אפשרויות להגדלת טקסט</li>
                <li>מצב ניגודיות גבוהה</li>
                <li>ניווט מותאם למקלדת</li>
                <li>מבנה HTML סמנטי</li>
                <li>כיווניות RTL מותאמת לעברית</li>
                <li>תוויות ARIA מתאימות לתמיכה בטכנולוגיות מסייעות</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">כלי הנגישות שלנו</h2>
              <p className="mb-4">
                כלי הנגישות שלנו זמין מכל עמוד באתר. הכלי מאפשר לך:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li>להגדיל או להקטין את גודל הטקסט</li>
                <li>להפעיל מצב ניגודיות גבוהה</li>
                <li>לאפס את כל ההגדרות לברירת המחדל</li>
              </ul>
              <p className="mb-4">
                העדפות אלה נשמרות בדפדפן שלך, כך שהן יחולו על כל הביקורים העתידיים שלך באתר.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">בעיות ידועות</h2>
              <p className="mb-4">
                אנו שואפים באופן קבוע לשפר את הנגישות של האתר שלנו. אם נתקלת בבעיות שלא טופלו, אנא יידע אותנו באמצעות פרטי הקשר שלהלן.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">משוב</h2>
              <p className="mb-4">
                אנו תמיד שואפים לשפר את הנגישות של האתר שלנו. אם נתקלת בבעיות כלשהן בגישה לאתר, או יש לך הצעות לשיפור, אנא צור איתנו קשר:
              </p>
              <div className="mb-4">
                <p>דוא"ל: info@bstudio.com</p>
                <p>טלפון: 050-1234567</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">עדכון הצהרת הנגישות</h2>
              <p className="mb-4">
                אנו מתחייבים לסקירה תקופתית של מדיניות זו ולעדכון הצהרת הנגישות שלנו בהתאם לשינויים באתר ובתקנות הנגישות.
              </p>
              <p className="text-sm mt-8">
                עדכון אחרון: מאי 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccessibilityStatement;
