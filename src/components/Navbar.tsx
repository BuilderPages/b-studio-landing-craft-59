
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <NavLink to="/" label="דף בית" />
            <NavLink to="/#services" label="שירותים" />
            <NavLink to="/gallery" label="גלריה" />
            <NavLink to="/contact" label="צור קשר" />
            <NavLink to="/admin" label="ניהול" className="text-bstudio-primary" />
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
            <NavLink to="/" label="דף בית" onClick={() => setMobileMenuOpen(false)} />
            <NavLink to="/#services" label="שירותים" onClick={() => setMobileMenuOpen(false)} />
            <NavLink to="/gallery" label="גלריה" onClick={() => setMobileMenuOpen(false)} />
            <NavLink to="/contact" label="צור קשר" onClick={() => setMobileMenuOpen(false)} />
            <NavLink to="/admin" label="ניהול" className="text-bstudio-primary" onClick={() => setMobileMenuOpen(false)} />
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
