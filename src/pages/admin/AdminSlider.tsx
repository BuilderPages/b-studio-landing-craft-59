
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import AdminBackNavigation from "@/components/admin/AdminBackNavigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { SliderItem } from "@/types/slider";
import { 
  getHomeGalleryItems, 
  saveHomeGalleryItem, 
  deleteHomeGalleryItem
} from "@/services/database";

const AdminSlider = () => {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [maxItems, setMaxItems] = useState<number>(10);
  const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSliderItems();
    const savedMaxItems = localStorage.getItem('maxSliderItems');
    if (savedMaxItems) {
      setMaxItems(parseInt(savedMaxItems));
    }
  }, []);

  const loadSliderItems = () => {
    const items = getHomeGalleryItems();
    setSliderItems(items);
  };

  const handleEdit = (item: SliderItem) => {
    setSelectedItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) {
      deleteHomeGalleryItem(id);
      toast({
        title: "פריט נמחק",
        description: "הפריט הוסר מהסליידר בהצלחה",
      });
      loadSliderItems();
    }
  };

  const handleSaveMaxItems = () => {
    localStorage.setItem('maxSliderItems', maxItems.toString());
    toast({
      title: "הגדרות נשמרו",
      description: `מספר מקסימלי של פריטים בסליידר עודכן ל-${maxItems}`,
    });
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setIsEditing(true);
  };

  const handleSaveItem = () => {
    if (!title || !imageUrl) {
      toast({
        title: "שגיאה",
        description: "כותרת ותמונה הם שדות חובה",
        variant: "destructive",
      });
      return;
    }

    const itemToSave: SliderItem = {
      id: selectedItem?.id || "",
      title,
      imageUrl,
      description,
      category: "עבודות", // Default category for slider items
      order: selectedItem?.order || sliderItems.length
    };

    saveHomeGalleryItem(itemToSave);
    
    toast({
      title: selectedItem ? "פריט עודכן" : "פריט נוסף",
      description: selectedItem 
        ? "הפריט עודכן בהצלחה" 
        : "הפריט נוסף לסליידר בהצלחה",
    });
    
    setIsEditing(false);
    loadSliderItems();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const itemsCopy = [...sliderItems];
    const index = itemsCopy.findIndex(item => item.id === id);
    
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === itemsCopy.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const item = itemsCopy[index];
    itemsCopy.splice(index, 1);
    itemsCopy.splice(newIndex, 0, item);
    
    // Update order properties
    itemsCopy.forEach((item, idx) => {
      saveHomeGalleryItem({
        ...item,
        order: idx,
        category: item.category || "עבודות" // Ensure category exists
      });
    });
    
    loadSliderItems();
    
    toast({
      title: "סדר עודכן",
      description: "סדר הפריטים עודכן בהצלחה",
    });
  };

  return (
    <div className="space-y-6">
      <AdminBackNavigation title="ניהול סליידר" />
      
      {!isEditing ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>הגדרות סליידר</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxItems">מספר מקסימלי של פריטים להצגה</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="maxItems"
                    min={1}
                    max={20}
                    step={1}
                    value={[maxItems]}
                    onValueChange={(value) => setMaxItems(value[0])}
                  />
                  <span className="w-12 text-center">{maxItems}</span>
                </div>
                <Button 
                  onClick={handleSaveMaxItems} 
                  className="mt-2"
                >
                  שמור הגדרות
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleAddNew}>הוסף פריט חדש</Button>
          </div>
          
          <div className="space-y-4">
            {sliderItems.length === 0 ? (
              <p className="text-center text-gray-500">אין פריטים בסליידר עדיין</p>
            ) : (
              sliderItems.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full aspect-video object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-3/4 space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{item.title}</h3>
                          <div className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => moveItem(item.id, 'up')}
                              disabled={sliderItems.indexOf(item) === 0}
                            >
                              ↑
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => moveItem(item.id, 'down')}
                              disabled={sliderItems.indexOf(item) === sliderItems.length - 1}
                            >
                              ↓
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              ערוך
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              מחק
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{selectedItem ? 'ערוך פריט' : 'הוסף פריט חדש'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">כותרת</Label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="description">תיאור</Label>
              <Textarea 
                id="description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <Label>תמונה</Label>
              <div className="mt-2">
                <ImageUpload 
                  currentImageUrl={imageUrl} 
                  onImageUploaded={handleImageUpload}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>בטל</Button>
              <Button onClick={handleSaveItem}>שמור</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSlider;
