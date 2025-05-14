
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from "@/components/ui/toaster";
import "@/utils/accessibilityFixes";

// Add a meta tag for cache control
const addCacheControlMeta = () => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Cache-Control';
  meta.content = 'max-age=3600, must-revalidate';
  document.head.appendChild(meta);
};

// Add Content Security Policy meta tag
const addCSPMeta = () => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; img-src 'self' data: https://*; script-src 'self' 'unsafe-inline' https://cdn.gpteng.co https://www.youtube.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src https://www.youtube.com https://youtube.com";
  document.head.appendChild(meta);
};

// Initialize cache control and CSP headers
addCacheControlMeta();
addCSPMeta();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
