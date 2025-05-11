
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminContent from "./pages/admin/AdminContent";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminBackups from "./pages/admin/AdminBackups";
import AdminHomeGallery from "./pages/admin/AdminHomeGallery";
import AdminSlider from "./pages/admin/AdminSlider";
import AdminAuthGuard from "./components/admin/AdminAuthGuard";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminAuthGuard />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/backups" element={<AdminBackups />} />
          <Route path="/admin/home-gallery" element={<AdminHomeGallery />} />
          <Route path="/admin/slider" element={<AdminSlider />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
