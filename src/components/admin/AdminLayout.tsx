
import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { logout } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);
  
  // Only show the mobile back navigation on pages other than dashboard
  const showMobileBackNav = location.pathname !== "/admin/dashboard";
  
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const AdminMenu = () => (
    <nav className="space-y-1">
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
        דשבורד
      </NavLink>
      <NavLink
        to="/admin/analytics"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
        אנליטיקס
      </NavLink>
      <NavLink
        to="/admin/contacts"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        פניות
      </NavLink>
      <NavLink
        to="/admin/content"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        תוכן האתר
      </NavLink>
      <NavLink
        to="/admin/gallery"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M15 8h.01"></path>
          <rect width="16" height="16" x="4" y="4" rx="3"></rect>
          <path d="m4 15 4-4a3 5 0 0 1 3 0l5 5"></path>
          <path d="m14 14 1-1a3 5 0 0 1 3 0l2 2"></path>
        </svg>
        ניהול גלריה
      </NavLink>
      <NavLink
        to="/admin/home-gallery"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <path d="m21 15-5-5L5 21"></path>
        </svg>
        גלריה בדף הבית
      </NavLink>
      <NavLink
        to="/admin/map-settings"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        הגדרות מפה
      </NavLink>
      <NavLink
        to="/admin/backups"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" x2="12" y1="3" y2="15"></line>
        </svg>
        גיבויים
      </NavLink>
      <NavLink
        to="/admin/settings"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        הגדרות
      </NavLink>
      <NavLink
        to="/admin/slider"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          )
        }
        onClick={() => setSheetOpen(false)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
        ניהול סליידר
      </NavLink>
      <button
        onClick={() => {
          handleLogout();
          setSheetOpen(false);
        }}
        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all w-full text-left text-gray-500 hover:text-gray-900 hover:bg-gray-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        התנתק
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white p-4 border-b shadow-sm flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-64">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Logo className="h-8 w-8" />
                  <span className="font-bold text-lg">ממשק ניהול</span>
                </div>
                <AdminMenu />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-center font-semibold">ממשק ניהול</div>
        <div className="w-8"></div> {/* Empty div for layout balance */}
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="bg-white border-l shadow-sm hidden lg:block lg:w-64 sticky top-0 h-screen">
          <div className="p-4">
            <Link to="/admin/dashboard" className="flex items-center justify-center mb-6">
              <Logo className="h-8 w-8 mr-2" />
              <span className="font-bold text-lg">ממשק ניהול</span>
            </Link>
            <AdminMenu />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {showMobileBackNav && (
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ChevronRight className="h-4 w-4" />
                <span>חזרה לדשבורד</span>
              </Button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
