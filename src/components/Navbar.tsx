
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { getSiteContent, getNavigation } from "@/services/database";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

// Default navigation items in case database doesn't provide them
const defaultNavItems = [
  { id: "1", label: "דף הבית", url: "/", highlight: false },
  { id: "2", label: "שירותים", url: "/services", highlight: false },
  { id: "3", label: "עבודות", url: "/gallery", highlight: false },
  { id: "4", label: "אודות", url: "/about", highlight: false },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState(defaultNavItems);
  const siteContent = getSiteContent();
  const location = useLocation();

  // Fetch navigation data and update state when it changes
  useEffect(() => {
    const navigation = getNavigation();
    if (navigation && navigation.items && navigation.items.length > 0) {
      // Ensure all items have the highlight property (set to false if missing)
      const itemsWithHighlight = navigation.items.map(item => ({
        ...item,
        highlight: item.highlight || false
      }));
      setNavItems(itemsWithHighlight);
    }
  }, []);

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
  
  // Check if we're on homepage
  const isHomePage = location.pathname === "/";
  // Only use transparent background on homepage and when not scrolled
  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isTransparent ? "bg-transparent py-6" : "bg-white shadow-md py-3"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center justify-center space-x-0">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className={cn(
                  "text-lg transition-colors px-4",
                  isTransparent
                    ? item.highlight
                      ? "text-white font-medium"
                      : "text-white/90 hover:text-white"
                    : item.highlight
                      ? "text-bstudio-primary font-medium"
                      : "text-gray-700 hover:text-bstudio-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="px-4">
              <Button
                size="lg"
                className={cn(
                  "bg-bstudio-primary hover:bg-bstudio-primary/90 text-white",
                  isTransparent ? "shadow-lg" : "shadow-sm"
                )}
              >
                צור קשר
              </Button>
            </Link>
          </div>
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
              isTransparent ? "text-white" : "text-gray-800"
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
