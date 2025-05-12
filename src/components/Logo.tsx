
import React from "react";
import { cn } from "@/lib/utils";
import { getSiteContent } from "@/services/database";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const siteContent = getSiteContent();
  const logoUrl = siteContent.logoUrl;
  const logoLink = siteContent.logoLink || "/"; // Default to home if not set
  const isNavTransparent = window.location.pathname === "/" && window.scrollY < 20;

  return (
    <Link to={logoLink} className={cn("flex items-center justify-end gap-2 no-underline", className)}>
      {logoUrl ? (
        <img src={logoUrl} alt="B Studio Logo" className="h-8" />
      ) : (
        <>
          <div className="relative h-8 w-8 overflow-hidden">
            <div className={cn(
              "absolute inset-0 rounded-lg flex items-center justify-center font-bold text-xl",
              isNavTransparent ? "bg-white text-bstudio-primary" : "bg-bstudio-primary text-white"
            )}>
              B
            </div>
          </div>
          <div className={cn(
            "font-bold text-xl tracking-tight",
            isNavTransparent ? "text-white" : ""
          )}>
            <span>B</span>
            <span className={isNavTransparent ? "text-white" : "text-bstudio-secondary"}>Studio</span>
          </div>
        </>
      )}
    </Link>
  );
};

export default Logo;
