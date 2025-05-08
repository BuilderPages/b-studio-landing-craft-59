
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getGalleryItems, saveGalleryItem, deleteGalleryItem, GalleryItem } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const AdminGallery = () => {
  const { toast } = useToast();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(getGalleryItems());
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: "",
    category: "",
    imageUrl: "",
    description: "",
  });

  // Categories for dropdown
  const categories = ["לוגואים", "דפי נחיתה", "ניהול תוכן", "מיתוג"];

  const handleRefresh = () => {
    setGalleryItems(getGalleryItems());
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
      deleteGalleryItem(currentItem.id);
      setGalleryItems(getGalleryItems());
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
      
      saveGalleryItem(itemToSave);
      setGalleryItems(getGalleryItems());
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">ניהול גלריה</h1>
          <div className="space-x-2">
            <Button onClick={() => handleEdit(null)}>הוסף פריט</Button>
            <Button variant="outline" onClick={handleRefresh}>רענן</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-right">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
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
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">אין פריטים בגלריה</p>
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
              <label htmlFor="category" className="text-right block">קטגוריה</label>
              <select 
                id="category"
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-right"
              >
                <option value="">בחר קטגוריה</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-right block">כתובת תמונה (URL)</label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={newItem.imageUrl}
                onChange={handleInputChange}
                className="text-right"
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

export default AdminGallery;
