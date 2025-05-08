
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getSiteContent, updateSiteContent, getNavigation, updateNavigation } from "@/services/database";
import { replaceYearPlaceholder } from "@/utils/contentUtils";

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

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<SiteContent>({} as SiteContent);
  const [navigation, setNavigation] = useState<Navigation>({ items: [] });
  const [activeTab, setActiveTab] = useState("main");

  useEffect(() => {
    // Load content and navigation on component mount
    const siteContent = getSiteContent();
    const navItems = getNavigation();
    
    setContent(siteContent as SiteContent);
    setNavigation(navItems as Navigation);
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
    const newId = Date.now().toString();
    const newItem = { id: newId, label: "פריט חדש", url: "/" };
    setNavigation({ ...navigation, items: [...navigation.items, newItem] });
  };

  const removeNavItem = (index: number) => {
    const updatedItems = [...navigation.items];
    updatedItems.splice(index, 1);
    setNavigation({ ...navigation, items: updatedItems });
  };

  const saveChanges = (type: 'content' | 'navigation') => {
    try {
      if (type === 'content') {
        updateSiteContent(content);
      } else {
        updateNavigation(navigation);
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
    const year = new Date().getFullYear();
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
              
              <div className="pt-6 flex justify-end">
                <Button onClick={() => saveChanges(activeTab === "navigation" ? "navigation" : "content")}>
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
