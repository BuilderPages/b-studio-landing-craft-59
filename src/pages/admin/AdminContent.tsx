
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getSiteContent, updateSiteContent, SiteContent } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<SiteContent>(getSiteContent());
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof SiteContent | "contactInfo",
    field?: string
  ) => {
    const { name, value } = e.target;
    
    if (section === "contactInfo" && field) {
      setContent({
        ...content,
        contactInfo: {
          ...content.contactInfo,
          [field]: value,
        },
      });
    } else {
      setContent({
        ...content,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      updateSiteContent(content);
      toast({
        title: "תוכן עודכן",
        description: "תוכן האתר עודכן בהצלחה.",
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת שמירת התוכן.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">ניהול תוכן</h1>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "שומר..." : "שמור שינויים"}
          </Button>
        </div>

        <Tabs defaultValue="hero">
          <TabsList className="mb-6">
            <TabsTrigger value="hero">אזור ראשי</TabsTrigger>
            <TabsTrigger value="about">אודות</TabsTrigger>
            <TabsTrigger value="contact">צור קשר</TabsTrigger>
            <TabsTrigger value="footer">פוטר</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>אזור ראשי (Hero)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="heroTitle" className="text-right block">כותרת ראשית</label>
                  <Input
                    id="heroTitle"
                    name="heroTitle"
                    value={content.heroTitle}
                    onChange={(e) => handleInputChange(e, "heroTitle")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="heroSubtitle" className="text-right block">תת-כותרת</label>
                  <Textarea
                    id="heroSubtitle"
                    name="heroSubtitle"
                    value={content.heroSubtitle}
                    onChange={(e) => handleInputChange(e, "heroSubtitle")}
                    className="text-right"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="heroCtaText" className="text-right block">טקסט לכפתור הפעולה</label>
                  <Input
                    id="heroCtaText"
                    name="heroCtaText"
                    value={content.heroCtaText}
                    onChange={(e) => handleInputChange(e, "heroCtaText")}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>אודות</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="aboutTitle" className="text-right block">כותרת אודות</label>
                  <Input
                    id="aboutTitle"
                    name="aboutTitle"
                    value={content.aboutTitle}
                    onChange={(e) => handleInputChange(e, "aboutTitle")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="aboutText" className="text-right block">תוכן אודות</label>
                  <Textarea
                    id="aboutText"
                    name="aboutText"
                    value={content.aboutText}
                    onChange={(e) => handleInputChange(e, "aboutText")}
                    className="text-right"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>פרטי יצירת קשר</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-right block">טלפון</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={content.contactInfo.phone}
                    onChange={(e) => handleInputChange(e, "contactInfo", "phone")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-right block">אימייל</label>
                  <Input
                    id="email"
                    name="email"
                    value={content.contactInfo.email}
                    onChange={(e) => handleInputChange(e, "contactInfo", "email")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-right block">כתובת</label>
                  <Input
                    id="address"
                    name="address"
                    value={content.contactInfo.address}
                    onChange={(e) => handleInputChange(e, "contactInfo", "address")}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>פוטר</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="footerText" className="text-right block">טקסט זכויות יוצרים</label>
                  <Input
                    id="footerText"
                    name="footerText"
                    value={content.footerText}
                    onChange={(e) => handleInputChange(e, "footerText")}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
