
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBackNavigation from "@/components/admin/AdminBackNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteContent, saveSiteContent } from "@/services/database";

interface MapSettings {
  showMap: boolean;
  latitude: string;
  longitude: string;
  address: string;
}

const AdminMapSettings = () => {
  const { toast } = useToast();
  const siteContent = getSiteContent();
  
  const [settings, setSettings] = useState<MapSettings>({
    showMap: siteContent.mapSettings?.showMap ?? true,
    latitude: siteContent.mapSettings?.latitude ?? "32.07373882655249",
    longitude: siteContent.mapSettings?.longitude ?? "34.77084541524799",
    address: siteContent.contactInfo?.address ?? "רחוב הרצל 50, תל אביב"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleMap = (checked: boolean) => {
    setSettings(prev => ({ ...prev, showMap: checked }));
  };

  const handleSave = () => {
    try {
      const updatedContent = {
        ...siteContent,
        mapSettings: {
          showMap: settings.showMap,
          latitude: settings.latitude,
          longitude: settings.longitude
        },
        contactInfo: {
          ...siteContent.contactInfo,
          address: settings.address
        }
      };
      
      saveSiteContent(updatedContent);
      
      toast({
        title: "הגדרות המפה נשמרו",
        description: "השינויים נשמרו בהצלחה",
      });
    } catch (error) {
      toast({
        title: "שגיאה בשמירת ההגדרות",
        description: "אירעה שגיאה בעת שמירת הגדרות המפה",
        variant: "destructive",
      });
    }
  };

  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.6707349998197!2d${settings.longitude}!3d${settings.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7bc570b9e5%3A0x37e3c136c6028c0a!2z16jXl9eV15Eg15TXqNem15wgNTAsINeq15wg15DXkdeZ15E!5e0!3m2!1siw!2sil!4v1715128055447!5m2!1siw!2sil`;

  return (
    <AdminLayout>
      <AdminBackNavigation title="הגדרות מפה" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>הגדרות מפה</CardTitle>
            <CardDescription>
              ניתן לערוך את המיקום של העסק במפה ולהחליט האם להציג את המפה באתר
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="showMap" className="font-medium">הצג מפה באתר</Label>
              <Switch 
                id="showMap"
                checked={settings.showMap}
                onCheckedChange={handleToggleMap}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">כתובת העסק</Label>
              <Input 
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="latitude">קו רוחב (Latitude)</Label>
              <Input 
                id="latitude"
                name="latitude"
                value={settings.latitude}
                onChange={handleChange}
                type="text"
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="longitude">קו אורך (Longitude)</Label>
              <Input 
                id="longitude"
                name="longitude"
                value={settings.longitude}
                onChange={handleChange}
                type="text"
                className="text-right"
              />
            </div>
            
            <Button onClick={handleSave} className="w-full">שמור הגדרות</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>תצוגה מקדימה</CardTitle>
            <CardDescription>
              כך המפה תוצג באתר
            </CardDescription>
          </CardHeader>
          <CardContent>
            {settings.showMap ? (
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe 
                  src={googleMapsEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            ) : (
              <div className="aspect-video rounded-lg border flex items-center justify-center bg-gray-100 text-gray-500">
                המפה מוסתרת כעת באתר
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMapSettings;
