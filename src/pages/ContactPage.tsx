
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm, { ContactFormData } from "@/components/ContactForm";
import { saveContact, getSiteContent, recordPageView } from "@/services/database";

const ContactPage = () => {
  const content = getSiteContent();

  useEffect(() => {
    // Record page view for analytics
    recordPageView();
  }, []);

  const handleSubmit = async (formData: ContactFormData) => {
    // Get IP and device info
    const userAgent = navigator.userAgent;
    const device = /Mobile|iPhone|Android|IEMobile|BlackBerry|Opera Mini/.test(userAgent)
      ? "Mobile"
      : "Desktop";

    // Save contact with additional info
    await saveContact({
      ...formData,
      ip: "IP tracking requires backend",
      device,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">צרו איתנו קשר</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              מעוניינים לשמוע עוד על השירותים שלנו? מלאו את הטופס ונחזור אליכם בהקדם
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <ContactForm onSubmit={handleSubmit} />
            </div>
            
            <div className="text-right space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">פרטי התקשרות</h3>
                <div className="space-y-2">
                  <p className="flex items-center justify-end gap-2">
                    <span>{content.contactInfo.phone}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bstudio-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </p>
                  <p className="flex items-center justify-end gap-2">
                    <span>{content.contactInfo.email}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bstudio-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </p>
                  <p className="flex items-center justify-end gap-2">
                    <span>{content.contactInfo.address}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bstudio-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">שעות פעילות</h3>
                <div className="space-y-1">
                  <p>ראשון - חמישי: 9:00 - 18:00</p>
                  <p>שישי: 9:00 - 13:00</p>
                  <p>שבת: סגור</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">מפה</h3>
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.6707349998197!2d34.77084541524799!3d32.07373882655249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7bc570b9e5%3A0x37e3c136c6028c0a!2z16jXl9eV15Eg15TXqNem15wgNTAsINeq15wg15DXkdeZ15E!5e0!3m2!1siw!2sil!4v1715128055447!5m2!1siw!2sil" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
