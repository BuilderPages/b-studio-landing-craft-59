
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
}) => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Improved gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-bstudio-primary/80 via-bstudio-secondary/70 to-bstudio-accent/60 opacity-90"></div>
      
      {/* Background image with better opacity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>

      <div className="container max-w-7xl mx-auto px-4 z-10">
        <div className="flex flex-col items-end text-right max-w-3xl ml-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in shadow-text">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in shadow-text" style={{ animationDelay: "0.2s" }}>
            {subtitle}
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to={ctaLink}>
              <Button size="lg" className="bg-white text-bstudio-primary hover:bg-white/90 hover:shadow-lg transition-all">
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-bstudio-secondary/30 rounded-full blur-3xl"></div>
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-bstudio-accent/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
    </div>
  );
};

export default Hero;
