
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { getNavigation } from "@/services/database";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = getNavigation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 bg-transparent",
        scrolled && "bg-white/90 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.items.map((item) => (
              <NavLink 
                key={item.id}
                to={item.url} 
                label={item.label} 
                className={item.highlight ? "text-bstudio-primary" : ""} 
              />
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 flex flex-col items-end bg-white/90 backdrop-blur-md">
            {navigation.items.map((item) => (
              <NavLink 
                key={item.id}
                to={item.url} 
                label={item.label} 
                onClick={() => setMobileMenuOpen(false)} 
                className={item.highlight ? "text-bstudio-primary" : ""} 
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, className, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-gray-800 hover:text-bstudio-secondary font-medium transition-colors duration-200",
        className
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
