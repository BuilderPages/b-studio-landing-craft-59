
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ImageUpload from "@/components/admin/ImageUpload";
import AdminBackNavigation from "@/components/admin/AdminBackNavigation";
import { getHomeGalleryItems, saveHomeGalleryItem, deleteHomeGalleryItem } from "@/services/database";

interface SliderItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

const AdminSlider = () => {
  const { toast } = useToast();
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SliderItem | null>(null);
  const [maxSliderItems, setMaxSliderItems] = useState(10);
  const [newItem, setNewItem] = useState<Partial<SliderItem>>({
    title: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    loadSliderItems();
    
    // Load max slider items setting
    const savedMaxItems = localStorage.getItem('maxSliderItems');
    if (savedMaxItems) {
      setMaxSliderItems(parseInt(savedMaxItems));
    }
  }, []);

  const loadSliderItems = () => {
    const items = getHomeGalleryItems();
    setSliderItems(items);
  };

  const handleEdit = (item: SliderItem | null) => {
    setCurrentItem(item);
    if (item) {
      setNewItem({
        title: item.title,
        imageUrl: item.imageUrl,
        description: item.description,
      });
    } else {
      setNewItem({
        title: "",
        imageUrl: "",
        description: "",
      });
    }
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: SliderItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentItem?.id) {
      deleteHomeGalleryItem(currentItem.id);
      loadSliderItems();
      setIsDeleteDialogOpen(false);
      toast({
        title: "פריט נמחק",
        description: "פריט הסליידר נמחק בהצלחה.",
      });
    }
  };

  const handleSave = () => {
    try {
      if (!newItem.title || !newItem.imageUrl) {
        toast({
          title: "שגיאה",
          description: "כותרת ותמונה הם שדות חובה.",
          variant: "destructive",
        });
        return;
      }

      const itemToSave = {
        ...(currentItem || { id: Date.now().toString() }),
        ...newItem,
      } as SliderItem;

      saveHomeGalleryItem(itemToSave);
      loadSliderItems();
      setIsEditDialogOpen(false);

      toast({
        title: currentItem ? "פריט עודכן" : "פריט נוסף",
        description: `פריט הסליידר ${currentItem ? "עודכן" : "נוסף"} בהצלחה.`,
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת שמירת פריט הסליידר.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelected = (imageUrl: string) => {
    setNewItem((prev) => ({ ...prev, imageUrl }));
  };

  const handleMaxItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setMaxSliderItems(value);
      localStorage.setItem('maxSliderItems', value.toString());
      
      toast({
        title: "הגדרות עודכנו",
        description: `מספר מקסימלי של פריטים בסליידר עודכן ל-${value}.`,
      });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sliderItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Save new order
    items.forEach((item, index) => {
      saveHomeGalleryItem({...item, order: index});
    });
    
    setSliderItems(items);
    toast({
      title: "סדר הפריטים עודכן",
      description: "סדר פריטי הסליידר עודכן בהצלחה.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminBackNavigation title="ניהול סליידר" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">ניהול סליידר</h1>
            <p className="text-muted-foreground">ניהול תמונות הסליידר בעמוד הבית</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleEdit(null)}>הוסף פריט חדש</Button>
            <Button variant="outline" onClick={loadSliderItems}>רענן</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>הגדרות סליידר</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="maxItems" className="block text-sm font-medium mb-1">
                  מספר מקסימלי של פריטים בסליידר
                </label>
                <Input
                  id="maxItems"
                  type="number"
                  min="1"
                  max="20"
                  value={maxSliderItems}
                  onChange={handleMaxItemsChange}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  מספר התמונות שיוצגו בסליידר בעמוד הבית
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="slider-items" direction="horizontal">
            {(provided) => (
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sliderItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card className="overflow-hidden">
                          <div className="aspect-video overflow-hidden bg-gray-100">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                אין תמונה
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex justify-end gap-2">
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
                                onClick={() => handleDelete(item)}
                              >
                                מחק
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {sliderItems.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">אין פריטים בסליידר</p>
            <Button className="mt-4" onClick={() => handleEdit(null)}>
              הוסף פריט חדש
            </Button>
          </div>
        )}

        {/* Edit dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{currentItem ? "עריכת פריט" : "הוספת פריט חדש"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-right block">כותרת</label>
                <Input
                  id="title"
                  name="title"
                  value={newItem.title || ""}
                  onChange={handleInputChange}
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <label className="text-right block">תמונה</label>
                <ImageUpload 
                  onImageSelected={handleImageSelected}
                  currentImage={newItem.imageUrl || ""}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-right block">תיאור</label>
                <Textarea
                  id="description"
                  name="description"
                  value={newItem.description || ""}
                  onChange={handleInputChange}
                  rows={3}
                  className="text-right"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                ביטול
              </Button>
              <Button onClick={handleSave}>
                שמור
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>מחיקת פריט</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>האם אתה בטוח שברצונך למחוק את הפריט "{currentItem?.title}"?</p>
              <p className="text-sm text-muted-foreground mt-2">פעולה זו אינה ניתנת לשחזור.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                ביטול
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                מחק
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminSlider;
