
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="section-spacing hero-gradient text-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מוכנים לקחת את העסק שלכם לשלב הבא?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              צרו איתנו קשר היום לקבלת ייעוץ ראשוני ללא עלות ותגלו איך אנחנו יכולים לעזור לעסק שלכם לבלוט בשוק התחרותי.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-bstudio-primary hover:bg-white/90">
                צרו קשר עכשיו
              </Button>
            </Link>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative mx-auto max-w-md">
              <div className="aspect-video bg-white/10 backdrop-blur rounded-lg overflow-hidden shadow-xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="B Studio Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-bstudio-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-bstudio-secondary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
