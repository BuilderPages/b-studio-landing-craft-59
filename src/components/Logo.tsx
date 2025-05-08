
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 overflow-hidden">
        <div className="absolute inset-0 bg-bstudio-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
          B
        </div>
      </div>
      <div className="font-bold text-xl tracking-tight">
        <span>B</span>
        <span className="text-bstudio-secondary">Studio</span>
      </div>
    </div>
  );
};

export default Logo;
