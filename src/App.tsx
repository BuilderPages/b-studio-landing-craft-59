
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminContent from "./pages/admin/AdminContent";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminHomeGallery from "./pages/admin/AdminHomeGallery";
import AdminBackups from "./pages/admin/AdminBackups";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminSlider from "@/pages/admin/AdminSlider";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AccessibilityWidget from "./components/AccessibilityWidget";

const queryClient = new QueryClient();

function App() {
  // Add RTL direction to the document for Hebrew support
  useEffect(() => {
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Skip to content link - accessibility feature */}
          <a href="#main-content" className="skip-to-content">
            דלג לתוכן העיקרי
          </a>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminAuthGuard>
                  <AdminDashboard />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminAuthGuard>
                  <AdminDashboard />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminAuthGuard>
                  <AdminAnalytics />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/contacts"
              element={
                <AdminAuthGuard>
                  <AdminContacts />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/content"
              element={
                <AdminAuthGuard>
                  <AdminContent />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <AdminAuthGuard>
                  <AdminGallery />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/home-gallery"
              element={
                <AdminAuthGuard>
                  <AdminHomeGallery />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/backups"
              element={
                <AdminAuthGuard>
                  <AdminBackups />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminAuthGuard>
                  <AdminSettings />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/slider"
              element={
                <AdminAuthGuard>
                  <AdminSlider />
                </AdminAuthGuard>
              }
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Accessibility widget */}
          <AccessibilityWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
