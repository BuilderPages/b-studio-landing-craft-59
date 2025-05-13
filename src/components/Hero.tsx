
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/services/database";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
}) => {
  const siteContent = getSiteContent();
  // Get overlay opacity from site content or use a default value
  const overlayOpacity = siteContent.heroOverlayOpacity || "0.4";
  // Get custom background color or use default
  const overlayColor = siteContent.heroOverlayColor || "0, 0, 0"; // RGB format

  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`,
    position: "relative" as const,
  };

  const overlayStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(${overlayColor}, ${overlayOpacity})`,
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative" as const,
    zIndex: 2,
  };

  return (
    <section 
      className="hero-section min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center text-white relative"
      style={heroStyle}
      aria-label="Hero Banner"
    >
      <div style={overlayStyle} aria-hidden="true"></div>
      <div className="container max-w-7xl mx-auto px-4 py-16" style={contentStyle}>
        <div className="max-w-3xl text-right mr-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {subtitle}
          </p>
          <div>
            <Link to={ctaLink}>
              <Button size="lg" className="bg-white text-bstudio-primary hover:bg-white/90">
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
