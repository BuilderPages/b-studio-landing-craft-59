
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getGalleryItems, saveGalleryItem, deleteGalleryItem, GalleryItem } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import AdminBackNavigation from "@/components/admin/AdminBackNavigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { v4 as uuidv4 } from "uuid";

// Sample gallery items
const sampleGalleryItems: GalleryItem[] = [
  {
    id: "sample-1",
    title: "עיצוב לוגו לחברת טכנולוגיה",
    category: "לוגואים",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "עיצוב לוגו מינימליסטי המשלב אלמנטים טכנולוגיים עם פונט מודרני. נוצר עבור חברת סטארט-אפ בתחום הסייבר."
  },
  {
    id: "sample-2",
    title: "באנר לקמפיין שיווקי",
    category: "באנרים",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "סדרת באנרים עבור קמפיין שיווקי ברשתות חברתיות. עיצוב נקי שמדגיש את המסר העיקרי ומאפשר שמירה על זהות המותג."
  },
  {
    id: "sample-3",
    title: "מיתוג לחנות אופנה",
    category: "מיתוג",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "מיתוג מלא לחנות אופנה הכולל לוגו, כרטיסי ביקור, שלטים וחומרי מדיה חברתית בסגנון מודרני וייחודי."
  },
  {
    id: "sample-4",
    title: "דף נחיתה לאפליקציה",
    category: "דפי נחיתה",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "עיצוב דף נחיתה לאפליקציית מובייל חדשה. העיצוב מדגיש את היתרונות העיקריים של האפליקציה ומשלב קריאות לפעולה ברורות."
  },
];

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
  const categories = ["לוגואים", "באנרים", "דפי נחיתה", "מיתוג", "עיצוב גרפי", "ניהול תוכן"];

  useEffect(() => {
    // If no gallery items exist, add sample items
    const existingItems = getGalleryItems();
    if (existingItems.length === 0) {
      sampleGalleryItems.forEach(item => {
        saveGalleryItem({
          ...item,
          id: uuidv4() // Generate unique IDs for sample items
        });
      });
      setGalleryItems(getGalleryItems());
    }
  }, []);

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
  
  const handleImageSelected = (imageUrl: string) => {
    setNewItem((prev) => ({ ...prev, imageUrl }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminBackNavigation title="ניהול גלריה" />

        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleEdit(null)}>הוסף פריט</Button>
            <Button variant="outline" onClick={handleRefresh}>רענן</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150?text=Image+Error";
                  }}
                />
              </div>
              <div className="p-4 text-right">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                <div className="flex justify-end space-x-2 gap-2">
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
              <label className="text-right block">תמונה</label>
              <ImageUpload 
                onImageSelected={handleImageSelected} 
                currentImage={newItem.imageUrl}
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
