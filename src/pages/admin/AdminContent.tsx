
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  getSiteContent, 
  updateSiteContent, 
  SiteContent, 
  getNavigation, 
  updateNavigation, 
  Navigation,
  getFooterContent,
  updateFooterContent,
  FooterContent
} from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PlusCircle, Trash2, ArrowUpDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<SiteContent>(getSiteContent());
  const [navigation, setNavigation] = useState<Navigation>(getNavigation());
  const [footerContent, setFooterContent] = useState<FooterContent>(getFooterContent());
  const [isSaving, setIsSaving] = useState(false);
  const [isEditNavItemOpen, setIsEditNavItemOpen] = useState(false);
  const [isEditSocialLinkOpen, setIsEditSocialLinkOpen] = useState(false);
  const [currentNavItem, setCurrentNavItem] = useState<any>(null);
  const [currentSocialLink, setCurrentSocialLink] = useState<any>(null);

  // Handle input change for site content
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof SiteContent | "contactInfo" | "footerSection",
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

  // Handle input change for footer content
  const handleFooterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: string,
    field?: string
  ) => {
    const { name, value } = e.target;
    
    if (section === "contactInfo" && field) {
      setFooterContent({
        ...footerContent,
        contactInfo: {
          ...footerContent.contactInfo,
          [field]: value,
        },
      });
    } else {
      setFooterContent({
        ...footerContent,
        [name]: value,
      });
    }
  };

  // Handle navigation item edit
  const handleEditNavItem = (item: any | null) => {
    setCurrentNavItem(item ? { ...item } : { label: "", url: "", highlight: false });
    setIsEditNavItemOpen(true);
  };

  // Handle navigation item save
  const handleSaveNavItem = () => {
    let updatedItems;
    if (currentNavItem.id) {
      // Update existing item
      updatedItems = navigation.items.map(item => 
        item.id === currentNavItem.id ? currentNavItem : item
      );
    } else {
      // Add new item
      const newId = Math.max(0, ...navigation.items.map(i => parseInt(i.id))) + 1;
      updatedItems = [...navigation.items, { ...currentNavItem, id: newId.toString() }];
    }
    
    setNavigation({
      ...navigation,
      items: updatedItems
    });
    setIsEditNavItemOpen(false);
  };

  // Handle navigation item delete
  const handleDeleteNavItem = (id: string) => {
    setNavigation({
      ...navigation,
      items: navigation.items.filter(item => item.id !== id)
    });
  };

  // Handle navigation item reorder
  const handleMoveNavItem = (id: string, direction: 'up' | 'down') => {
    const index = navigation.items.findIndex(item => item.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === navigation.items.length - 1)) {
      return;
    }
    
    const newItems = [...navigation.items];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newItems[index];
    newItems[index] = newItems[newIndex];
    newItems[newIndex] = temp;
    
    setNavigation({
      ...navigation,
      items: newItems
    });
  };

  // Handle social link edit
  const handleEditSocialLink = (link: any | null, index?: number) => {
    setCurrentSocialLink(link ? { ...link } : { name: "", url: "", icon: "" });
    setIsEditSocialLinkOpen(true);
  };

  // Handle social link save
  const handleSaveSocialLink = () => {
    const indexToUpdate = footerContent.socialLinks.findIndex(
      link => link.name === currentSocialLink.name && link.url === currentSocialLink.url
    );
    
    let updatedLinks;
    if (indexToUpdate !== -1) {
      // Update existing link
      updatedLinks = [...footerContent.socialLinks];
      updatedLinks[indexToUpdate] = currentSocialLink;
    } else {
      // Add new link
      updatedLinks = [...footerContent.socialLinks, currentSocialLink];
    }
    
    setFooterContent({
      ...footerContent,
      socialLinks: updatedLinks
    });
    setIsEditSocialLinkOpen(false);
  };

  // Handle social link delete
  const handleDeleteSocialLink = (index: number) => {
    const updatedLinks = [...footerContent.socialLinks];
    updatedLinks.splice(index, 1);
    
    setFooterContent({
      ...footerContent,
      socialLinks: updatedLinks
    });
  };

  // Save all changes
  const handleSave = async () => {
    setIsSaving(true);
    try {
      updateSiteContent(content);
      updateNavigation(navigation);
      updateFooterContent(footerContent);
      
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

  // Helper function for navigation item form
  const handleNavItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentNavItem({
      ...currentNavItem,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Helper function for social link form
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentSocialLink({
      ...currentSocialLink,
      [name]: value
    });
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
            <TabsTrigger value="navigation">תפריט ניווט</TabsTrigger>
            <TabsTrigger value="gallery">גלריה</TabsTrigger>
            <TabsTrigger value="cta">אזור וידאו</TabsTrigger>
            <TabsTrigger value="footer">פוטר</TabsTrigger>
            <TabsTrigger value="about">אודות</TabsTrigger>
            <TabsTrigger value="contact">צור קשר</TabsTrigger>
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
                <div className="space-y-2">
                  <label htmlFor="heroCtaLink" className="text-right block">קישור לכפתור הפעולה</label>
                  <Input
                    id="heroCtaLink"
                    name="heroCtaLink"
                    value={content.heroCtaLink || ""}
                    onChange={(e) => handleInputChange(e, "heroCtaLink")}
                    className="text-right"
                    placeholder="/contact"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="heroBackgroundImage" className="text-right block">תמונת רקע (כתובת URL)</label>
                  <Input
                    id="heroBackgroundImage"
                    name="heroBackgroundImage"
                    value={content.heroBackgroundImage || ""}
                    onChange={(e) => handleInputChange(e, "heroBackgroundImage")}
                    className="text-right"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>תפריט ניווט</CardTitle>
                <Button onClick={() => handleEditNavItem(null)}>
                  <PlusCircle className="ml-2 h-4 w-4" />
                  הוסף פריט
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">תווית</TableHead>
                      <TableHead className="text-right">כתובת URL</TableHead>
                      <TableHead className="text-right">מודגש</TableHead>
                      <TableHead className="text-center">סדר</TableHead>
                      <TableHead className="text-center">פעולות</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {navigation.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-right">{item.label}</TableCell>
                        <TableCell className="text-right">{item.url}</TableCell>
                        <TableCell className="text-right">{item.highlight ? "כן" : "לא"}</TableCell>
                        <TableCell>
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveNavItem(item.id, 'up')}
                            >
                              <ArrowUpDown className="rotate-90 h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveNavItem(item.id, 'down')}
                            >
                              <ArrowUpDown className="-rotate-90 h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              onClick={() => handleEditNavItem(item)}
                            >
                              ערוך
                            </Button>
                            <Button
                              variant="ghost"
                              className="text-red-500"
                              onClick={() => handleDeleteNavItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>אזור גלריה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="galleryTitle" className="text-right block">כותרת הגלריה</label>
                  <Input
                    id="galleryTitle"
                    name="galleryTitle"
                    value={content.galleryTitle}
                    onChange={(e) => handleInputChange(e, "galleryTitle")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="galleryDescription" className="text-right block">תיאור הגלריה</label>
                  <Textarea
                    id="galleryDescription"
                    name="galleryDescription"
                    value={content.galleryDescription}
                    onChange={(e) => handleInputChange(e, "galleryDescription")}
                    className="text-right"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="galleryCtaText" className="text-right block">טקסט לכפתור</label>
                  <Input
                    id="galleryCtaText"
                    name="galleryCtaText"
                    value={content.galleryCtaText}
                    onChange={(e) => handleInputChange(e, "galleryCtaText")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="galleryCtaLink" className="text-right block">קישור לכפתור</label>
                  <Input
                    id="galleryCtaLink"
                    name="galleryCtaLink"
                    value={content.galleryCtaLink}
                    onChange={(e) => handleInputChange(e, "galleryCtaLink")}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cta">
            <Card>
              <CardHeader>
                <CardTitle>אזור וידאו וקריאה לפעולה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="ctaTitle" className="text-right block">כותרת</label>
                  <Input
                    id="ctaTitle"
                    name="ctaTitle"
                    value={content.ctaTitle}
                    onChange={(e) => handleInputChange(e, "ctaTitle")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ctaDescription" className="text-right block">תיאור</label>
                  <Textarea
                    id="ctaDescription"
                    name="ctaDescription"
                    value={content.ctaDescription}
                    onChange={(e) => handleInputChange(e, "ctaDescription")}
                    className="text-right"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ctaButtonText" className="text-right block">טקסט לכפתור</label>
                  <Input
                    id="ctaButtonText"
                    name="ctaButtonText"
                    value={content.ctaButtonText}
                    onChange={(e) => handleInputChange(e, "ctaButtonText")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ctaButtonLink" className="text-right block">קישור לכפתור</label>
                  <Input
                    id="ctaButtonLink"
                    name="ctaButtonLink"
                    value={content.ctaButtonLink}
                    onChange={(e) => handleInputChange(e, "ctaButtonLink")}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="videoUrl" className="text-right block">כתובת וידאו (YouTube/Vimeo)</label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={content.videoUrl}
                    onChange={(e) => handleInputChange(e, "videoUrl")}
                    className="text-right"
                    placeholder="https://www.youtube.com/embed/..."
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
                  <label htmlFor="description" className="text-right block">תיאור</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={footerContent.description}
                    onChange={(e) => handleFooterInputChange(e)}
                    className="text-right"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="quickLinksTitle" className="text-right block">כותרת לינקים מהירים</label>
                  <Input
                    id="quickLinksTitle"
                    name="quickLinksTitle"
                    value={footerContent.quickLinksTitle}
                    onChange={(e) => handleFooterInputChange(e)}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="servicesTitle" className="text-right block">כותרת שירותים</label>
                  <Input
                    id="servicesTitle"
                    name="servicesTitle"
                    value={footerContent.servicesTitle}
                    onChange={(e) => handleFooterInputChange(e)}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contactTitle" className="text-right block">כותרת צור קשר</label>
                  <Input
                    id="contactTitle"
                    name="contactTitle"
                    value={footerContent.contactTitle}
                    onChange={(e) => handleFooterInputChange(e)}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="copyrightText" className="text-right block">טקסט זכויות יוצרים (השתמש ב-{year} לשנה הנוכחית)</label>
                  <Input
                    id="copyrightText"
                    name="copyrightText"
                    value={footerContent.copyrightText}
                    onChange={(e) => handleFooterInputChange(e)}
                    className="text-right"
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <Button onClick={() => handleEditSocialLink(null)}>
                      <PlusCircle className="ml-2 h-4 w-4" />
                      הוסף רשת חברתית
                    </Button>
                    <h3 className="font-bold">רשתות חברתיות</h3>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">שם</TableHead>
                        <TableHead className="text-right">כתובת URL</TableHead>
                        <TableHead className="text-center">פעולות</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {footerContent.socialLinks.map((link, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-right">{link.name}</TableCell>
                          <TableCell className="text-right">{link.url}</TableCell>
                          <TableCell>
                            <div className="flex justify-center space-x-2">
                              <Button
                                variant="ghost"
                                onClick={() => handleEditSocialLink(link, index)}
                              >
                                ערוך
                              </Button>
                              <Button
                                variant="ghost"
                                className="text-red-500"
                                onClick={() => handleDeleteSocialLink(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
        </Tabs>
      </div>

      {/* Navigation Item Dialog */}
      <Dialog open={isEditNavItemOpen} onOpenChange={setIsEditNavItemOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentNavItem?.id ? "עריכת פריט" : "הוספת פריט חדש"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="nav-label" className="text-right block">תווית</label>
              <Input
                id="nav-label"
                name="label"
                value={currentNavItem?.label || ""}
                onChange={handleNavItemChange}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="nav-url" className="text-right block">כתובת URL</label>
              <Input
                id="nav-url"
                name="url"
                value={currentNavItem?.url || ""}
                onChange={handleNavItemChange}
                className="text-right"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="nav-highlight"
                type="checkbox"
                name="highlight"
                checked={!!currentNavItem?.highlight}
                onChange={handleNavItemChange}
                className="w-4 h-4"
              />
              <label htmlFor="nav-highlight" className="text-right">הדגש פריט זה</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditNavItemOpen(false)}>
              ביטול
            </Button>
            <Button onClick={handleSaveNavItem}>
              שמור
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Social Link Dialog */}
      <Dialog open={isEditSocialLinkOpen} onOpenChange={setIsEditSocialLinkOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>עריכת קישור לרשת חברתית</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="social-name" className="text-right block">שם</label>
              <Input
                id="social-name"
                name="name"
                value={currentSocialLink?.name || ""}
                onChange={handleSocialLinkChange}
                className="text-right"
                placeholder="Facebook, Instagram, וכו׳"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="social-url" className="text-right block">כתובת URL</label>
              <Input
                id="social-url"
                name="url"
                value={currentSocialLink?.url || ""}
                onChange={handleSocialLinkChange}
                className="text-right"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="social-icon" className="text-right block">קוד SVG לאייקון</label>
              <Textarea
                id="social-icon"
                name="icon"
                value={currentSocialLink?.icon || ""}
                onChange={handleSocialLinkChange}
                className="text-right font-mono text-sm"
                rows={5}
                placeholder='<svg class="h-6 w-6" fill="currentColor"...'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSocialLinkOpen(false)}>
              ביטול
            </Button>
            <Button onClick={handleSaveSocialLink}>
              שמור
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminContent;
