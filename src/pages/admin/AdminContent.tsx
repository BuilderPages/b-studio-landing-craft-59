
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getSiteContent, updateSiteContent, getNavigation, updateNavigation, getFooterContent, updateFooterContent } from "@/services/database";
import { replaceYearPlaceholder } from "@/utils/contentUtils";
import { v4 as uuidv4 } from 'uuid';

// Define types for site content and navigation
interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroBackgroundImage: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  videoUrl: string;
  galleryTitle: string;
  galleryDescription: string;
  galleryCtaText: string;
  galleryCtaLink: string;
  aboutTitle: string;
  aboutText: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    whatsapp?: string;
  };
  footerText: string;
  [key: string]: any;
}

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  highlight?: boolean;
}

interface Navigation {
  items: NavigationItem[];
  [key: string]: any;
}

interface FooterLinkItem {
  label: string;
  url: string;
}

interface SocialLinkItem {
  name: string;
  url: string;
  icon: string;
}

interface FooterContent {
  description: string;
  quickLinksTitle: string;
  quickLinks: FooterLinkItem[];
  servicesTitle: string;
  serviceLinks: FooterLinkItem[];
  contactTitle: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  copyrightText: string;
  socialLinks: SocialLinkItem[];
}

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<SiteContent>({} as SiteContent);
  const [navigation, setNavigation] = useState<Navigation>({ items: [] });
  const [footerContent, setFooterContent] = useState<FooterContent>({} as FooterContent);
  const [activeTab, setActiveTab] = useState("main");

  useEffect(() => {
    // Load content and navigation on component mount
    const siteContent = getSiteContent();
    const navItems = getNavigation();
    const footer = getFooterContent();
    
    setContent(siteContent as SiteContent);
    setNavigation(navItems as Navigation);
    setFooterContent(footer as FooterContent);
  }, []);

  const handleContentChange = (key: string, value: string) => {
    // For nested properties like contactInfo.phone
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      setContent(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value
        }
      }));
    } else {
      setContent(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleNavItemChange = (index: number, key: string, value: any) => {
    const updatedItems = [...navigation.items];
    updatedItems[index] = { ...updatedItems[index], [key]: value };
    setNavigation({ ...navigation, items: updatedItems });
  };

  const addNavItem = () => {
    const newId = uuidv4();
    const newItem = { id: newId, label: "פריט חדש", url: "/" };
    setNavigation({ ...navigation, items: [...navigation.items, newItem] });
  };

  const removeNavItem = (index: number) => {
    const updatedItems = [...navigation.items];
    updatedItems.splice(index, 1);
    setNavigation({ ...navigation, items: updatedItems });
  };

  const handleFooterChange = (key: string, value: string) => {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      setFooterContent(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value
        }
      }));
    } else {
      setFooterContent(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleFooterLinkChange = (section: 'quickLinks' | 'serviceLinks', index: number, key: string, value: string) => {
    const updatedLinks = [...footerContent[section]];
    updatedLinks[index] = { ...updatedLinks[index], [key]: value };
    setFooterContent({ ...footerContent, [section]: updatedLinks });
  };

  const addFooterLink = (section: 'quickLinks' | 'serviceLinks') => {
    const newLink = { label: "קישור חדש", url: "/" };
    setFooterContent({ 
      ...footerContent, 
      [section]: [...(footerContent[section] || []), newLink]
    });
  };

  const removeFooterLink = (section: 'quickLinks' | 'serviceLinks', index: number) => {
    const updatedLinks = [...footerContent[section]];
    updatedLinks.splice(index, 1);
    setFooterContent({ ...footerContent, [section]: updatedLinks });
  };

  const handleSocialLinkChange = (index: number, key: string, value: string) => {
    const updatedLinks = [...footerContent.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [key]: value };
    setFooterContent({ ...footerContent, socialLinks: updatedLinks });
  };

  const addSocialLink = () => {
    const newLink = { 
      name: "רשת חברתית חדשה", 
      url: "/", 
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/></svg>`
    };
    setFooterContent({ 
      ...footerContent, 
      socialLinks: [...(footerContent.socialLinks || []), newLink]
    });
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = [...footerContent.socialLinks];
    updatedLinks.splice(index, 1);
    setFooterContent({ ...footerContent, socialLinks: updatedLinks });
  };

  const saveChanges = (type: 'content' | 'navigation' | 'footer') => {
    try {
      if (type === 'content') {
        updateSiteContent(content);
      } else if (type === 'navigation') {
        updateNavigation(navigation);
      } else if (type === 'footer') {
        updateFooterContent(footerContent);
      }
      
      toast({
        title: "השינויים נשמרו בהצלחה",
        description: "התוכן עודכן ומוצג באתר עכשיו.",
      });
    } catch (error) {
      toast({
        title: "שגיאה בשמירת השינויים",
        description: "אירעה שגיאה בעת שמירת השינויים. אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    }
  };
  
  const renderFooterPreview = () => {
    return replaceYearPlaceholder(content.footerText);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">ניהול תוכן</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Button 
                  variant={activeTab === "main" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("main")}
                >
                  עמוד ראשי
                </Button>
                <Button 
                  variant={activeTab === "about" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("about")}
                >
                  אודות
                </Button>
                <Button 
                  variant={activeTab === "contact" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("contact")}
                >
                  פרטי קשר
                </Button>
                <Button 
                  variant={activeTab === "gallery" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("gallery")}
                >
                  גלריה
                </Button>
                <Button 
                  variant={activeTab === "footer" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("footer")}
                >
                  פוטר
                </Button>
                <Button 
                  variant={activeTab === "navigation" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("navigation")}
                >
                  תפריט ניווט
                </Button>
                <Button 
                  variant={activeTab === "footer_content" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("footer_content")}
                >
                  עיצוב פוטר מורחב
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {activeTab === "main" && "עריכת עמוד ראשי"}
                {activeTab === "about" && "עריכת אודות"}
                {activeTab === "contact" && "עריכת פרטי קשר"}
                {activeTab === "gallery" && "עריכת גלריה"}
                {activeTab === "footer" && "עריכת פוטר"}
                {activeTab === "navigation" && "עריכת תפריט ניווט"}
                {activeTab === "footer_content" && "עיצוב פוטר מורחב"}
              </CardTitle>
              <CardDescription>
                כאן תוכל לערוך את תוכן האתר. השינויים יופיעו באתר מיד לאחר שמירה.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Page Content */}
              {activeTab === "main" && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">כותרת ראשית</h3>
                    <Input 
                      value={content.heroTitle || ""} 
                      onChange={(e) => handleContentChange('heroTitle', e.target.value)} 
                      className="text-right"
                    />
                    
                    <h3 className="text-lg font-medium">תת כותרת</h3>
                    <Textarea 
                      value={content.heroSubtitle || ""} 
                      onChange={(e) => handleContentChange('heroSubtitle', e.target.value)} 
                      className="text-right min-h-24"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium">טקסט כפתור</h3>
                        <Input 
                          value={content.heroCtaText || ""} 
                          onChange={(e) => handleContentChange('heroCtaText', e.target.value)} 
                          className="text-right"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">לינק כפתור</h3>
                        <Input 
                          value={content.heroCtaLink || ""} 
                          onChange={(e) => handleContentChange('heroCtaLink', e.target.value)} 
                          className="text-right"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium">תמונת רקע (URL)</h3>
                    <Input 
                      value={content.heroBackgroundImage || ""} 
                      onChange={(e) => handleContentChange('heroBackgroundImage', e.target.value)} 
                      className="text-right"
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">אזור קריאה לפעולה (CTA)</h3>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">כותרת CTA</h3>
                      <Input 
                        value={content.ctaTitle || ""} 
                        onChange={(e) => handleContentChange('ctaTitle', e.target.value)} 
                        className="text-right"
                      />
                      
                      <h3 className="text-lg font-medium">טקסט CTA</h3>
                      <Textarea 
                        value={content.ctaDescription || ""} 
                        onChange={(e) => handleContentChange('ctaDescription', e.target.value)} 
                        className="text-right min-h-24"
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-medium">טקסט כפתור CTA</h3>
                          <Input 
                            value={content.ctaButtonText || ""} 
                            onChange={(e) => handleContentChange('ctaButtonText', e.target.value)} 
                            className="text-right"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">לינק כפתור CTA</h3>
                          <Input 
                            value={content.ctaButtonLink || ""} 
                            onChange={(e) => handleContentChange('ctaButtonLink', e.target.value)} 
                            className="text-right"
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium">URL וידאו CTA</h3>
                      <Input 
                        value={content.videoUrl || ""} 
                        onChange={(e) => handleContentChange('videoUrl', e.target.value)} 
                        className="text-right"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* About Content */}
              {activeTab === "about" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">כותרת אודות</h3>
                  <Input 
                    value={content.aboutTitle || ""} 
                    onChange={(e) => handleContentChange('aboutTitle', e.target.value)} 
                    className="text-right"
                  />
                  
                  <h3 className="text-lg font-medium">טקסט אודות</h3>
                  <Textarea 
                    value={content.aboutText || ""} 
                    onChange={(e) => handleContentChange('aboutText', e.target.value)} 
                    className="text-right min-h-40"
                  />
                </div>
              )}

              {/* Contact Content */}
              {activeTab === "contact" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">טלפון</h3>
                  <Input 
                    value={content.contactInfo?.phone || ""} 
                    onChange={(e) => handleContentChange('contactInfo.phone', e.target.value)} 
                    className="text-right"
                  />
                  
                  <h3 className="text-lg font-medium">אימייל</h3>
                  <Input 
                    value={content.contactInfo?.email || ""} 
                    onChange={(e) => handleContentChange('contactInfo.email', e.target.value)} 
                    className="text-right"
                  />
                  
                  <h3 className="text-lg font-medium">כתובת</h3>
                  <Input 
                    value={content.contactInfo?.address || ""} 
                    onChange={(e) => handleContentChange('contactInfo.address', e.target.value)} 
                    className="text-right"
                  />

                  <h3 className="text-lg font-medium">מספר וואטסאפ</h3>
                  <Input 
                    value={content.contactInfo?.whatsapp || ""} 
                    onChange={(e) => handleContentChange('contactInfo.whatsapp', e.target.value)} 
                    className="text-right"
                    placeholder="972XXXXXXXX - פורמט בינלאומי ללא +, לדוגמה: 9721234567890"
                  />
                </div>
              )}

              {/* Gallery Content */}
              {activeTab === "gallery" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">כותרת הגלריה</h3>
                  <Input 
                    value={content.galleryTitle || ""} 
                    onChange={(e) => handleContentChange('galleryTitle', e.target.value)} 
                    className="text-right"
                  />
                  
                  <h3 className="text-lg font-medium">טקסט גלריה</h3>
                  <Textarea 
                    value={content.galleryDescription || ""} 
                    onChange={(e) => handleContentChange('galleryDescription', e.target.value)} 
                    className="text-right"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">טקסט כפתור גלריה</h3>
                      <Input 
                        value={content.galleryCtaText || ""} 
                        onChange={(e) => handleContentChange('galleryCtaText', e.target.value)} 
                        className="text-right"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">לינק כפתור גלריה</h3>
                      <Input 
                        value={content.galleryCtaLink || ""} 
                        onChange={(e) => handleContentChange('galleryCtaLink', e.target.value)} 
                        className="text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Content */}
              {activeTab === "footer" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">טקסט פוטר (כולל {'{year}'} עבור השנה הנוכחית)</h3>
                  <Input 
                    value={content.footerText || ""} 
                    onChange={(e) => handleContentChange('footerText', e.target.value)} 
                    className="text-right"
                  />
                  
                  <div className="bg-muted p-3 rounded-md">
                    <h4 className="font-medium mb-1">תצוגה מקדימה:</h4>
                    <p>{renderFooterPreview()}</p>
                  </div>
                </div>
              )}

              {/* Navigation Editor */}
              {activeTab === "navigation" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">פריטי תפריט</h3>
                      <Button size="sm" onClick={addNavItem}>הוסף פריט</Button>
                    </div>
                    
                    {navigation.items?.map((item, index) => (
                      <div key={item.id} className="border p-3 rounded space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">פריט #{index + 1}</h4>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeNavItem(index)}
                          >
                            מחק
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h5 className="text-sm font-medium mb-1">טקסט</h5>
                            <Input 
                              value={item.label} 
                              onChange={(e) => handleNavItemChange(index, 'label', e.target.value)} 
                              className="text-right"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-1">לינק</h5>
                            <Input 
                              value={item.url} 
                              onChange={(e) => handleNavItemChange(index, 'url', e.target.value)} 
                              className="text-right"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`highlight-${item.id}`}
                            checked={!!item.highlight}
                            onChange={(e) => handleNavItemChange(index, 'highlight', e.target.checked)}
                            className="ml-2"
                          />
                          <label htmlFor={`highlight-${item.id}`}>הדגש (צבע מיוחד)</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Extended Content Editor */}
              {activeTab === "footer_content" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">תיאור כללי פוטר</h3>
                  <Textarea
                    value={footerContent.description || ""}
                    onChange={(e) => handleFooterChange('description', e.target.value)}
                    className="text-right min-h-20"
                  />
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">קישורים מהירים</h3>
                      <Button size="sm" onClick={() => addFooterLink('quickLinks')}>הוסף קישור</Button>
                    </div>

                    <div className="space-y-2 mb-2">
                      <h4 className="text-sm font-medium">כותרת אזור</h4>
                      <Input
                        value={footerContent.quickLinksTitle || ""}
                        onChange={(e) => handleFooterChange('quickLinksTitle', e.target.value)}
                        className="text-right"
                      />
                    </div>
                    
                    {footerContent.quickLinks?.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2 p-2 border rounded">
                        <Input
                          value={link.label}
                          onChange={(e) => handleFooterLinkChange('quickLinks', index, 'label', e.target.value)}
                          placeholder="תווית"
                          className="text-right"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => handleFooterLinkChange('quickLinks', index, 'url', e.target.value)}
                          placeholder="קישור URL"
                          className="text-right"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-shrink-0 text-red-500 hover:text-red-700" 
                          onClick={() => removeFooterLink('quickLinks', index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">קישורי שירותים</h3>
                      <Button size="sm" onClick={() => addFooterLink('serviceLinks')}>הוסף קישור</Button>
                    </div>

                    <div className="space-y-2 mb-2">
                      <h4 className="text-sm font-medium">כותרת אזור</h4>
                      <Input
                        value={footerContent.servicesTitle || ""}
                        onChange={(e) => handleFooterChange('servicesTitle', e.target.value)}
                        className="text-right"
                      />
                    </div>
                    
                    {footerContent.serviceLinks?.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2 p-2 border rounded">
                        <Input
                          value={link.label}
                          onChange={(e) => handleFooterLinkChange('serviceLinks', index, 'label', e.target.value)}
                          placeholder="תווית"
                          className="text-right"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => handleFooterLinkChange('serviceLinks', index, 'url', e.target.value)}
                          placeholder="קישור URL"
                          className="text-right"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-shrink-0 text-red-500 hover:text-red-700"
                          onClick={() => removeFooterLink('serviceLinks', index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">פרטי קשר בפוטר</h3>
                    <div className="space-y-2 mb-2">
                      <h4 className="text-sm font-medium">כותרת אזור</h4>
                      <Input
                        value={footerContent.contactTitle || ""}
                        onChange={(e) => handleFooterChange('contactTitle', e.target.value)}
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">קישורים חברתיים</h3>
                      <Button size="sm" onClick={addSocialLink}>הוסף קישור חברתי</Button>
                    </div>
                    
                    {footerContent.socialLinks?.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 mb-4 p-3 border rounded">
                        <div className="grid grid-cols-1 gap-2 w-full">
                          <Input
                            value={link.name}
                            onChange={(e) => handleSocialLinkChange(index, 'name', e.target.value)}
                            placeholder="שם (לדוגמה: פייסבוק)"
                            className="text-right"
                          />
                          <Input
                            value={link.url}
                            onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                            placeholder="קישור URL"
                            className="text-right"
                          />
                          <Textarea
                            value={link.icon}
                            onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                            placeholder="קוד SVG לאייקון"
                            className="text-right min-h-20"
                          />
                          <div className="bg-gray-50 p-2 rounded">
                            <div dangerouslySetInnerHTML={{ __html: link.icon }} />
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-shrink-0 h-10 text-red-500 hover:text-red-700"
                          onClick={() => removeSocialLink(index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">טקסט זכויות יוצרים</h3>
                    <Input
                      value={footerContent.copyrightText || ""}
                      onChange={(e) => handleFooterChange('copyrightText', e.target.value)}
                      placeholder="השתמש ב-{year} כדי להציג את השנה הנוכחית"
                      className="text-right"
                    />
                  </div>
                </div>
              )}
              
              <div className="pt-6 flex justify-end">
                <Button onClick={() => {
                  if (activeTab === "navigation") {
                    saveChanges("navigation");
                  } else if (activeTab === "footer_content") {
                    saveChanges("footer");
                  } else {
                    saveChanges("content");
                  }
                }}>
                  שמור שינויים
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
