
import React from "react";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "דניאל כהן",
      position: "מנכ\"ל",
      company: "חברת אלפא",
      content: "שיתוף הפעולה עם B Studio שינה את המותג שלנו לחלוטין. הלוגו החדש שלנו מקבל תגובות נהדרות מלקוחות, והתוכן שהם מייצרים עבורנו ממיר בצורה מרשימה.",
    },
    {
      id: "2",
      name: "נועה לוי",
      position: "מנהלת שיווק",
      company: "חברת ביתא",
      content: "דף הנחיתה שB Studio יצרו עבורנו הכפיל את שיעור ההמרות שלנו תוך חודש. הם הקשיבו לצרכים שלנו והתאימו את העיצוב בדיוק למה שהיינו צריכים.",
    },
    {
      id: "3",
      name: "איתי ישראלי",
      position: "בעלים",
      company: "חברת גמא",
      content: "אני עובד עם B Studio כבר שנתיים, והם תמיד מספקים עבודה איכותית ומקצועית. ניהול התוכן שלהם עזר לנו להגדיל משמעותית את הנוכחות הדיגיטלית שלנו.",
    },
  ];

  return (
    <section className="bg-gray-50 section-spacing">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">מה אומרים עלינו</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            שמענו מלקוחות מרוצים שעבדו איתנו
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow border border-gray-100 flex flex-col"
            >
              {/* Quote icon */}
              <div className="text-bstudio-primary/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-gray-600 mb-4 text-right">{testimonial.content}</p>
              </div>
              <div className="mt-4 text-right">
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.position}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
