
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

  return (
    <Link to={logoLink} className={cn("flex items-center justify-end gap-2 no-underline w-full", className)}>
      {logoUrl ? (
        <img src={logoUrl} alt="B Studio Logo" className="h-8" />
      ) : (
        <>
          <div className="relative h-8 w-8 overflow-hidden">
            <div className="absolute inset-0 bg-bstudio-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
          </div>
          <div className="font-bold text-xl tracking-tight">
            <span>B</span>
            <span className="text-bstudio-secondary">Studio</span>
          </div>
        </>
      )}
    </Link>
  );
};

export default Logo;
