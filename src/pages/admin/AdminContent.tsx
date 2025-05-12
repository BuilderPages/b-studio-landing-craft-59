import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getSiteContent, saveSiteContent, getNavigation, updateNavigation, getFooterContent, updateFooterContent } from "@/services/database";
import { replaceYearPlaceholder } from "@/utils/contentUtils";
import { v4 as uuidv4 } from 'uuid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/admin/ImageUpload";
import { SketchPicker } from 'react-color';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define types for site content and navigation
interface AdminSiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroBackgroundImage: string;
  heroOverlayColor?: string;
  heroOverlayOpacity?: string;
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
  logoUrl?: string;
  logoLink?: string;
  servicesTitle?: string;
  servicesDescription?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
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
  const [content, setContent] = useState<AdminSiteContent>({} as AdminSiteContent);
  const [navigation, setNavigation] = useState<Navigation>({ items: [] });
  const [footerContent, setFooterContent] = useState<FooterContent>({} as FooterContent);
  const [activeTab, setActiveTab] = useState("main");
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    // Load content and navigation on component mount
    const siteContent = getSiteContent();
    const navItems = getNavigation();
    const footer = getFooterContent();
    
    // Convert the siteContent to AdminSiteContent
    const adminContent: AdminSiteContent = {
      heroTitle: siteContent.heroTitle || '',
      heroSubtitle: siteContent.heroSubtitle || '',
      heroCtaText: siteContent.heroCtaText || '',
      heroCtaLink: siteContent.heroCtaLink || '',
      heroBackgroundImage: siteContent.heroBackgroundImage || '',
      heroOverlayColor: siteContent.heroOverlayColor || '0, 0, 0',
      heroOverlayOpacity: siteContent.heroOverlayOpacity || '0.4',
      ctaTitle: siteContent.ctaTitle || '',
      ctaDescription: siteContent.ctaDescription || '',
      ctaButtonText: siteContent.ctaButtonText || '',
      ctaButtonLink: siteContent.ctaButtonLink || '',
      videoUrl: siteContent.videoUrl || '',
      galleryTitle: siteContent.galleryTitle || '',
      galleryDescription: siteContent.galleryDescription || '',
      galleryCtaText: siteContent.galleryCtaText || '',
      galleryCtaLink: siteContent.galleryCtaLink || '',
      aboutTitle: siteContent.aboutTitle || '',
      aboutText: siteContent.aboutText || '',
      contactInfo: {
        phone: siteContent.contactInfo?.phone || '',
        email: siteContent.contactInfo?.email || '',
        address: siteContent.contactInfo?.address || '',
        whatsapp: siteContent.contactInfo?.whatsapp || '',
      },
      footerText: siteContent.footerText || '',
      logoUrl: siteContent.logoUrl || '',
      logoLink: siteContent.logoLink || '/',
      servicesTitle: siteContent.servicesTitle || 'השירותים שלנו',
      servicesDescription: siteContent.servicesDescription || 'אנחנו מציעים מגוון רחב של שירותים',
      primaryColor: siteContent.primaryColor || '#9b87f5',
      secondaryColor: siteContent.secondaryColor || '#7E69AB',
      accentColor: siteContent.accentColor || '#6E59A5',
    };
    
    setContent(adminContent);
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

  const handleImageUpload = (imageUrl: string, field: string) => {
    handleContentChange(field, imageUrl);
  };

  const saveChanges = (type: 'content' | 'navigation' | 'footer') => {
    try {
      if (type === 'content') {
        // Create a merged site content object
        const siteContent = getSiteContent();
        const updatedContent = {
          ...siteContent,
          ...content,
          contactInfo: {
            ...siteContent.contactInfo,
            ...content.contactInfo
          }
        };
        saveSiteContent(updatedContent);
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

  // Modified to handle RGB color for banner overlay
  const handleRgbColorChange = (rgbColor: { r: number; g: number; b: number }) => {
    const rgbString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
    handleContentChange('heroOverlayColor', rgbString);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">ניהול תוכן</h1>
        </div>
        
        <Tabs defaultValue="main" onValueChange={setActiveTab} value={activeTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 mb-6">
            <TabsTrigger value="main">עמוד ראשי</TabsTrigger>
            <TabsTrigger value="about">אודות</TabsTrigger>
            <TabsTrigger value="services">שירותים</TabsTrigger>
            <TabsTrigger value="contact">פרטי קשר</TabsTrigger>
            <TabsTrigger value="gallery">גלריה</TabsTrigger>
            <TabsTrigger value="navigation">תפריט ניווט</TabsTrigger>
            <TabsTrigger value="footer">פוטר</TabsTrigger>
            <TabsTrigger value="branding">מיתוג וצבעים</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "main" && "עריכת עמוד ראשי"}
                {activeTab === "about" && "עריכת אודות"}
                {activeTab === "services" && "עריכת שירותים"}
                {activeTab === "contact" && "עריכת פרטי קשר"}
                {activeTab === "gallery" && "עריכת גלריה"}
                {activeTab === "navigation" && "עריכת תפריט ניווט"}
                {activeTab === "footer" && "עריכת פוטר"}
                {activeTab === "branding" && "מיתוג וצבעים"}
              </CardTitle>
              <CardDescription>
                כאן תוכל לערוך את תוכן האתר. השינויים יופיעו באתר מיד לאחר שמירה.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Main Page Content */}
              {activeTab === "main" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">לוגו</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <ImageUpload 
                          onImageSelected={(url) => handleImageUpload(url, 'logoUrl')}
                          currentImage={content.logoUrl || ""}
                          label="העלאת לוגו"
                        />
                      </div>
                      <div>
                        {content.logoUrl && (
                          <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center">
                            <img src={content.logoUrl} alt="לוגו האתר" className="max-h-20" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mt-2">קישור לוגו</h3>
                    <Input 
                      value={content.logoLink || "/"} 
                      onChange={(e) => handleContentChange('logoLink', e.target.value)} 
                      className="text-right"
                      placeholder="/ (לדף הבית)"
                    />
                    <p className="text-sm text-gray-500 text-right">
                      הגדר לאן הלוגו יוביל בלחיצה. לדוגמה: / לדף הבית, /contact לדף צור קשר
                    </p>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-lg font-medium">באנר ראשי</h3>
                    <Input 
                      value={content.heroTitle || ""} 
                      onChange={(e) => handleContentChange('heroTitle', e.target.value)} 
                      className="text-right"
                      placeholder="כותרת ראשית"
                    />
                    
                    <h3 className="text-lg font-medium">תת כותרת</h3>
                    <Textarea 
                      value={content.heroSubtitle || ""} 
                      onChange={(e) => handleContentChange('heroSubtitle', e.target.value)} 
                      className="text-right min-h-24"
                      placeholder="תת כותרת"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium">טקסט כפתור</h3>
                        <Input 
                          value={content.heroCtaText || ""} 
                          onChange={(e) => handleContentChange('heroCtaText', e.target.value)} 
                          className="text-right"
                          placeholder="טקסט כפתור"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">לינק כפתור</h3>
                        <Input 
                          value={content.heroCtaLink || ""} 
                          onChange={(e) => handleContentChange('heroCtaLink', e.target.value)} 
                          className="text-right"
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium">תמונת רקע</h3>
                    <ImageUpload 
                      onImageSelected={(url) => handleImageUpload(url, 'heroBackgroundImage')}
                      currentImage={content.heroBackgroundImage || ""}
                      label="העלאת תמונת רקע"
                    />
                    
                    {/* New Banner Background Controls */}
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">הגדרות רקע באנר</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-md font-medium">צבע שכבת רקע</h4>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between mt-2">
                                <span>בחירת צבע</span>
                                <div 
                                  className="h-4 w-6 rounded-full" 
                                  style={{ 
                                    backgroundColor: `rgba(${content.heroOverlayColor || "0, 0, 0"}, 1)` 
                                  }}
                                />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <SketchPicker 
                                color={
                                  (() => {
                                    const rgbParts = (content.heroOverlayColor || "0, 0, 0").split(",").map(p => parseInt(p.trim()));
                                    return { r: rgbParts[0], g: rgbParts[1], b: rgbParts[2] };
                                  })()
                                }
                                onChange={(color) => handleRgbColorChange(color.rgb)}
                              />
                            </PopoverContent>
                          </Popover>
                          <p className="text-sm text-gray-500 mt-1 text-right">
                            בחר צבע לשכבת הרקע שמעל תמונת הבאנר
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-md font-medium">שקיפות שכבת הרקע</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span>שקוף</span>
                            <input 
                              type="range" 
                              min="0" 
                              max="1" 
                              step="0.05" 
                              value={content.heroOverlayOpacity || "0.4"}
                              onChange={(e) => handleContentChange('heroOverlayOpacity', e.target.value)}
                              className="w-full"
                            />
                            <span>אטום</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 text-right">
                            שליטה ברמת השקיפות של שכבת הרקע (ערך נמוך = יותר שקוף)
                          </p>
                          
                          {/* Preview */}
                          <div 
                            className="mt-4 p-6 rounded-md text-white text-center font-bold relative overflow-hidden"
                            style={{ backgroundImage: `url(${content.heroBackgroundImage || "https://images.unsplash.com/photo-1493397212122-2b85dda8106b"})`, backgroundSize: 'cover', height: '100px' }}
                          >
                            <div 
                              style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                backgroundColor: `rgba(${content.heroOverlayColor || "0, 0, 0"}, ${content.heroOverlayOpacity || "0.4"})`
                              }}
                            ></div>
                            <div className="relative z-10 flex items-center justify-center h-full">
                              תצוגה מקדימה של הבאנר
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">אזור וידאו קריאה לפעולה (CTA)</h3>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">כותרת CTA</h3>
                      <Input 
                        value={content.ctaTitle || ""} 
                        onChange={(e) => handleContentChange('ctaTitle', e.target.value)} 
                        className="text-right"
                        placeholder="כותרת אזור CTA"
                      />
                      
                      <h3 className="text-lg font-medium">טקסט CTA</h3>
                      <Textarea 
                        value={content.ctaDescription || ""} 
                        onChange={(e) => handleContentChange('ctaDescription', e.target.value)} 
                        className="text-right min-h-24"
                        placeholder="תיאור אזור CTA"
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-medium">טקסט כפתור CTA</h3>
                          <Input 
                            value={content.ctaButtonText || ""} 
                            onChange={(e) => handleContentChange('ctaButtonText', e.target.value)} 
                            className="text-right"
                            placeholder="טקסט כפתור"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">לינק כפתור CTA</h3>
                          <Input 
                            value={content.ctaButtonLink || ""} 
                            onChange={(e) => handleContentChange('ctaButtonLink', e.target.value)} 
                            className="text-right"
                            placeholder="/contact"
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium">URL וידאו CTA</h3>
                      <Input 
                        value={content.videoUrl || ""} 
                        onChange={(e) => handleContentChange('videoUrl', e.target.value)} 
                        className="text-right"
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>
                  </div>
                </div>
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

              {/* Services Content */}
              {activeTab === "services" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">כותרת השירותים</h3>
                  <Input 
                    value={content.servicesTitle || ""} 
                    onChange={(e) => handleContentChange('servicesTitle', e.target.value)} 
                    className="text-right"
                  />
                  
                  <h3 className="text-lg font-medium">תיאור השירותים</h3>
                  <Textarea 
                    value={content.servicesDescription || ""} 
                    onChange={(e) => handleContentChange('servicesDescription', e.target.value)} 
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

              {/* Branding & Colors */}
              {activeTab === "branding" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">צבעים ראשיים</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">צבע ראשי</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              <span>בחירת צבע</span>
                              <div 
                                className="h-4 w-4 rounded-full" 
                                style={{ backgroundColor: content.primaryColor || '#9b87f5' }}
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <SketchPicker 
                              color={content.primaryColor || '#9b87f5'}
                              onChange={(color) => handleContentChange('primaryColor', color.hex)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">צבע משני</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              <span>בחירת צבע</span>
                              <div 
                                className="h-4 w-4 rounded-full" 
                                style={{ backgroundColor: content.secondaryColor || '#7E69AB' }}
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <SketchPicker 
                              color={content.secondaryColor || '#7E69AB'}
                              onChange={(color) => handleContentChange('secondaryColor', color.hex)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">צבע דגש</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              <span>בחירת צבע</span>
                              <div 
                                className="h-4 w-4 rounded-full" 
                                style={{ backgroundColor: content.accentColor || '#6E59A5' }}
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <SketchPicker 
                              color={content.accentColor || '#6E59A5'}
                              onChange={(color) => handleContentChange('accentColor', color.hex)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Content */}
              {activeTab === "footer" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">תיאור כללי פוטר</h3>
                    <Textarea
                      value={footerContent.description || ""}
                      onChange={(e) => handleFooterChange('description', e.target.value)}
                      className="text-right min-h-20"
                    />
                  </div>
                  
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
              
              <div className="pt-6 flex justify-end">
                <Button onClick={() => {
                  if (activeTab === "navigation") {
                    saveChanges("navigation");
                  } else if (activeTab === "footer") {
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
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
