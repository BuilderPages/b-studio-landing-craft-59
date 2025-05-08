import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { recordPageView } from "@/services/database";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Record page view for analytics
    recordPageView();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-right">מדיניות פרטיות</h1>
          
          <div className="prose prose-lg max-w-none text-right">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">מבוא</h2>
              <p className="mb-4">
                אנו ב-B Studio מחויבים להגן על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך כאשר אתה משתמש באתר האינטרנט שלנו.
              </p>
              <p className="mb-4">
                אנא קרא את מדיניות הפרטיות בעיון לפני השימוש באתר שלנו או שליחת מידע אישי.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">איסוף מידע</h2>
              <p className="mb-4">
                אנו אוספים מידע אישי שאתה מספק לנו באופן מודע דרך טופס יצירת הקשר שלנו, כולל:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li>שם מלא</li>
                <li>כתובת דוא"ל</li>
                <li>מספר טלפון</li>
                <li>כל מידע אחר שתבחר לספק בהודעתך</li>
              </ul>
              <p className="mb-4">
                בנוסף, אנו אוספים באופן אוטומטי נתונים אנונימיים אודות ביקורך באתר שלנו, כגון:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li>כתובת IP</li>
                <li>סוג הדפדפן וגרסתו</li>
                <li>סוג המכשיר</li>
                <li>דפים שביקרת בהם</li>
                <li>זמן ותאריך הביקור</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">שימוש במידע</h2>
              <p className="mb-4">
                אנו משתמשים במידע שנאסף למטרות הבאות:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li>לענות על פניות שתשלח לנו דרך טופס יצירת הקשר</li>
                <li>לספק לך את השירותים שביקשת</li>
                <li>לשפר את האתר והשירותים שלנו</li>
                <li>לשלוח לך עדכונים על השירותים שלנו (רק אם הסכמת לכך)</li>
                <li>לעמוד בדרישות משפטיות</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">אחסון ואבטחת מידע</h2>
              <p className="mb-4">
                אנו נוקטים אמצעי אבטחה מתאימים כדי למנוע אובדן, גישה לא מורשית, שינוי או חשיפה של המידע האישי שלך. גישה למידע האישי שלך מוגבלת לעובדים, סוכנים וקבלנים שזקוקים לידע זה כדי לספק לך שירותים.
              </p>
              <p className="mb-4">
                אנו שומרים את המידע האישי שלך רק למשך הזמן הנדרש למטרות שלשמן אספנו אותו, אלא אם כן נדרש לשמור אותו לתקופה ארוכה יותר בהתאם לחוק.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">זכויותיך</h2>
              <p className="mb-4">
                יש לך את הזכויות הבאות ביחס למידע האישי שלך:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li>לבקש גישה למידע האישי שלך</li>
                <li>לבקש תיקון של מידע לא מדויק</li>
                <li>לבקש מחיקה של המידע האישי שלך</li>
                <li>להתנגד לעיבוד המידע האישי שלך</li>
                <li>לבקש הגבלה על עיבוד המידע האישי שלך</li>
                <li>לבקש העברת המידע האישי שלך (ניידות נתונים)</li>
              </ul>
              <p className="mb-4">
                אם ברצונך לממש את אחת מהזכויות הללו, אנא צור איתנו קשר באמצעות פרטי הקשר המופיעים בתחתית המסמך.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">עוגיות (Cookies)</h2>
              <p className="mb-4">
                האתר שלנו משתמש בעוגיות כדי לשפר את חוויית המשתמש שלך. עוגיות הן קבצי טקסט קטנים שמאוחסנים על המכשיר שלך כאשר אתה מבקר באתר. הן עוזרות לנו לזכור את העדפותיך ולספק לך חוויית גלישה מותאמת אישית.
              </p>
              <p className="mb-4">
                אתה יכול לבחור לדחות עוגיות באמצעות הגדרות הדפדפן שלך, אך זה עלול להשפיע על חוויית השימוש שלך באתר.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">שינויים במדיניות הפרטיות</h2>
              <p className="mb-4">
                אנו עשויים לעדכן את מדיניות הפרטיות שלנו מעת לעת. נפרסם כל שינוי במדיניות באתר שלנו ונעדכן את תאריך העדכון האחרון.
              </p>
              <p className="mb-4">
                מומלץ לבדוק את הדף הזה באופן קבוע כדי להישאר מעודכן בשינויים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">יצירת קשר</h2>
              <p className="mb-4">
                אם יש לך שאלות כלשהן לגבי מדיניות הפרטיות שלנו או האופן שבו אנו מטפלים במידע האישי שלך, אנא צור איתנו קשר:
              </p>
              <div className="mb-4">
                <p>דוא"ל: info@bstudio.com</p>
                <p>טלפון: 050-1234567</p>
                <p>כתובת: רחוב הרצל 50, תל אביב</p>
              </div>
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

export default PrivacyPolicy;
