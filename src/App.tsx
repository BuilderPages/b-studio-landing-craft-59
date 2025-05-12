
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import AdminMapSettings from "./pages/admin/AdminMapSettings";
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
        <Route path="/admin" element={<AdminAuthGuard><Outlet /></AdminAuthGuard>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="backups" element={<AdminBackups />} />
          <Route path="home-gallery" element={<AdminHomeGallery />} />
          <Route path="slider" element={<AdminSlider />} />
          <Route path="map-settings" element={<AdminMapSettings />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
