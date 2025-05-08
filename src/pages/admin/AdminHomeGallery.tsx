
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getHomeGalleryItems, saveHomeGalleryItem, deleteHomeGalleryItem, GalleryItem } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const AdminHomeGallery = () => {
  const { toast } = useToast();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: "",
    category: "",
    imageUrl: "",
    description: "",
  });
  const [homeSettings, setHomeSettings] = useState({
    title: "העבודות שלנו",
    description: "הצצה לפרויקטים האחרונים שלנו",
    ctaText: "צפה בכל העבודות",
    ctaLink: "/gallery"
  });
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  useEffect(() => {
    setGalleryItems(getHomeGalleryItems());
  }, []);

  const handleRefresh = () => {
    setGalleryItems(getHomeGalleryItems());
    toast({
      title: "גלריה עודכנה",
      description: "פריטי הגלריה עודכנו בהצלחה.",
    });
  };

  const handleEdit = (item: GalleryItem | null) => {
    setCurrentItem(item);
    if (item) {
      setNewItem(item);
    } else {
      setNewItem({
        title: "",
        category: "",
        imageUrl: "",
        description: "",
      });
    }
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentItem?.id) {
      deleteHomeGalleryItem(currentItem.id);
      setGalleryItems(getHomeGalleryItems());
      setIsDeleteDialogOpen(false);
      toast({
        title: "פריט נמחק",
        description: "פריט הגלריה נמחק בהצלחה.",
      });
    }
  };

  const handleSave = () => {
    try {
      const itemToSave = {
        ...(currentItem || {}),
        ...newItem,
      } as GalleryItem;
      
      saveHomeGalleryItem(itemToSave);
      setGalleryItems(getHomeGalleryItems());
      setIsEditDialogOpen(false);
      
      toast({
        title: currentItem ? "פריט עודכן" : "פריט נוסף",
        description: `פריט הגלריה ${currentItem ? "עודכן" : "נוסף"} בהצלחה.`,
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת שמירת פריט הגלריה.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHomeSettings((prev) => ({ ...prev, [name]: value }));
  };

  const saveSettings = () => {
    try {
      // Save home gallery settings to database
      localStorage.setItem('homeGallerySettings', JSON.stringify(homeSettings));
      setIsSettingsDialogOpen(false);
      
      toast({
        title: "הגדרות נשמרו",
        description: "הגדרות הגלריה נשמרו בהצלחה.",
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת שמירת הגדרות הגלריה.",
        variant: "destructive",
      });
    }
  };

  // Function to handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(galleryItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setGalleryItems(items);
    
    // Save new order to database
    items.forEach((item, index) => {
      saveHomeGalleryItem({...item, order: index});
    });
    
    toast({
      title: "סדר הפריטים עודכן",
      description: "סדר פריטי הגלריה עודכן בהצלחה.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">ניהול גלריה בדף הבית</h1>
            <p className="text-muted-foreground">נהל את הפריטים המוצגים בגלריה בעמוד הבית</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsSettingsDialogOpen(true)}>הגדרות כלליות</Button>
            <Button onClick={() => handleEdit(null)}>הוסף פריט</Button>
            <Button variant="outline" onClick={handleRefresh}>רענן</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-bold mb-4">תצוגת גלריה בדף הבית</h2>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">כותרת:</p>
              <p className="text-gray-600">{homeSettings.title}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">תיאור:</p>
              <p className="text-gray-600">{homeSettings.description}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">טקסט כפתור:</p>
              <p className="text-gray-600">{homeSettings.ctaText}</p>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gallery-items" direction="horizontal">
            {(provided) => (
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {galleryItems.map((item, index) => (
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
                          <div className="p-4 text-right">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                                ערוך
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(item)}>
                                מחק
                              </Button>
                            </div>
                          </div>
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

        {galleryItems.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">אין פריטים בגלריה של דף הבית</p>
            <Button className="mt-4" onClick={() => handleEdit(null)}>
              הוסף פריט חדש
            </Button>
          </div>
        )}
      </div>

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
                value={newItem.title}
                onChange={handleInputChange}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-right block">כתובת תמונה (URL)</label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={newItem.imageUrl}
                onChange={handleInputChange}
                className="text-right"
                placeholder="הזן כתובת URL של תמונה"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-right block">תיאור</label>
              <Textarea
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                rows={3}
                className="text-right"
              />
            </div>
            {newItem.imageUrl && (
              <div className="mt-2 rounded-md overflow-hidden">
                <img 
                  src={newItem.imageUrl} 
                  alt="תצוגה מקדימה" 
                  className="max-h-40 object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150?text=Image+Error";
                  }}
                />
              </div>
            )}
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

      {/* Settings dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>הגדרות גלריה בדף הבית</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-right block">כותרת</label>
              <Input
                id="title"
                name="title"
                value={homeSettings.title}
                onChange={handleSettingsChange}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-right block">תיאור</label>
              <Textarea
                id="description"
                name="description"
                value={homeSettings.description}
                onChange={handleSettingsChange}
                rows={2}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="ctaText" className="text-right block">טקסט כפתור</label>
              <Input
                id="ctaText"
                name="ctaText"
                value={homeSettings.ctaText}
                onChange={handleSettingsChange}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="ctaLink" className="text-right block">קישור כפתור</label>
              <Input
                id="ctaLink"
                name="ctaLink"
                value={homeSettings.ctaLink}
                onChange={handleSettingsChange}
                className="text-right"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
              ביטול
            </Button>
            <Button onClick={saveSettings}>
              שמור הגדרות
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
    </AdminLayout>
  );
};

export default AdminHomeGallery;
