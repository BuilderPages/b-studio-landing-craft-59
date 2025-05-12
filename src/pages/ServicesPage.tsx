
import React from "react";
import { getSiteContent } from "@/services/database";
import Hero from "@/components/Hero";

const ServicesPage = () => {
  const content = getSiteContent();

  const services = [
    {
      id: 1,
      title: 'עיצוב גרפי',
      description: 'עיצוב לוגו, מיתוג, עיצוב חומרי פרסום, עיצוב אריזות ועיצוב תדמית לעסק.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'פיתוח ועיצוב אתרים',
      description: 'עיצוב אתרי תדמית, חנויות מקוונות, בלוגים ומערכות ניהול תוכן.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'עיצוב UX/UI',
      description: 'עיצוב ממשקי משתמש חווייתיים ואינטואיטיביים לאתרים ואפליקציות.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'צילום ועריכת וידאו',
      description: 'צילום מקצועי, עריכת וידאו, אנימציה וגרפיקה לדיגיטל וטלוויזיה.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      ),
    },
    {
      id: 5,
      title: 'שיווק דיגיטלי',
      description: 'ניהול קמפיינים, שיווק במדיה חברתית, SEO וקידום אתרים.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <div>
      <Hero 
        title={content.servicesTitle || "השירותים שלנו"}
        subtitle={content.servicesDescription || "אנחנו מציעים מגוון רחב של שירותים בתחום העיצוב והמדיה"}
        ctaText="צור קשר"
        ctaLink="/contact"
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">השירותים המקצועיים שלנו</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-bstudio-primary mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-right">{service.title}</h3>
                  <p className="text-gray-600 text-right">{service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-gray-50 rounded-xl p-8 shadow-inner">
              <h3 className="text-2xl font-bold mb-4 text-right">התהליך שלנו</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bstudio-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">1</div>
                  <h4 className="text-lg font-bold mt-3">פגישת היכרות</h4>
                  <p className="text-gray-600 text-sm">הבנת הצרכים והמטרות</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-bstudio-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">2</div>
                  <h4 className="text-lg font-bold mt-3">אסטרטגיה ותכנון</h4>
                  <p className="text-gray-600 text-sm">פיתוח קונספט ואפיון</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-bstudio-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">3</div>
                  <h4 className="text-lg font-bold mt-3">עיצוב ופיתוח</h4>
                  <p className="text-gray-600 text-sm">יצירת הפתרון המושלם</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-bstudio-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">4</div>
                  <h4 className="text-lg font-bold mt-3">השקה ותמיכה</h4>
                  <p className="text-gray-600 text-sm">ליווי מתמשך להצלחה</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
