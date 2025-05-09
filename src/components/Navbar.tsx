
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/services/database";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

// Default navigation items in case database doesn't provide them
const defaultNavItems = [
  { id: "1", label: "בית", url: "/", highlight: false },
  { id: "2", label: "שירותים", url: "/services", highlight: false },
  { id: "3", label: "עבודות", url: "/gallery", highlight: false },
  { id: "4", label: "אודות", url: "/about", highlight: false },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const siteContent = getSiteContent();
  const navItems = siteContent.navigation?.items || defaultNavItems;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.url}
              className={cn(
                "text-lg transition-colors mx-2", // Added mx-2 for spacing
                scrolled
                  ? item.highlight
                    ? "text-bstudio-primary font-medium"
                    : "text-gray-700 hover:text-bstudio-primary"
                  : item.highlight
                  ? "text-white font-medium"
                  : "text-white/90 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button
              size="lg"
              className={cn(
                "bg-bstudio-primary hover:bg-bstudio-primary/90 text-white",
                scrolled ? "shadow-sm" : "shadow-lg"
              )}
            >
              צור קשר
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMobileMenu}
          aria-label="תפריט"
        >
          <Menu 
            className={cn(
              "w-8 h-8",
              scrolled ? "text-gray-800" : "text-white"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container px-4 py-3">
            <nav className="flex flex-col items-end space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  className={cn(
                    "text-lg",
                    item.highlight
                      ? "text-bstudio-primary font-medium"
                      : "text-gray-700 hover:text-bstudio-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" className="bg-bstudio-primary hover:bg-bstudio-primary/90 text-white shadow-sm">
                  צור קשר
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
