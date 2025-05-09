
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Globe, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  currentImage,
  label,
}) => {
  const { toast } = useToast();
  const [urlInput, setUrlInput] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onImageSelected(urlInput);
      toast({
        title: "תמונה נוספה",
        description: "תמונה מהאינטרנט נוספה בהצלחה",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "סוג קובץ שגוי",
          description: "נא להעלות קבצי תמונה בלבד",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      // Create a local URL for preview
      const localUrl = URL.createObjectURL(file);
      setUploadedImage(localUrl);
      
      // In a real application, you would upload to a server here
      // For now, we're just using the local URL
      setTimeout(() => {
        setIsLoading(false);
        onImageSelected(localUrl);
        toast({
          title: "תמונה הועלתה",
          description: "התמונה הועלתה בהצלחה (לצורכי הדגמה, זו תמונה מקומית)",
        });
      }, 1000);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            const url = URL.createObjectURL(blob);
            onImageSelected(url);
            toast({
              title: "תמונה הודבקה",
              description: "התמונה מהלוח הודבקה בהצלחה",
            });
            return;
          }
        }
      }
      toast({
        title: "אין תמונה בלוח",
        description: "לא נמצאה תמונה בלוח להדבקה",
        variant: "destructive",
      });
    } catch (err) {
      toast({
        title: "שגיאה",
        description: "לא ניתן להדביק מהלוח. נסה להעלות קובץ או להוסיף URL",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full space-y-4">
      {label && <p className="text-sm text-right font-medium mb-1">{label}</p>}
      
      {currentImage && (
        <div className="mb-4 p-2 border rounded-md">
          <p className="text-sm text-muted-foreground mb-2">תמונה נוכחית:</p>
          <div className="relative aspect-video max-h-40 overflow-hidden rounded-md bg-muted">
            <img 
              src={currentImage} 
              alt="תמונה נוכחית" 
              className="object-contain w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/150?text=תמונה+שגויה";
              }}
            />
          </div>
        </div>
      )}
      
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="url">
            <Globe className="w-4 h-4 ml-2" />
            מאינטרנט
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="w-4 h-4 ml-2" />
            מהמחשב
          </TabsTrigger>
          <TabsTrigger value="clipboard">
            <ImageIcon className="w-4 h-4 ml-2" />
            מהלוח
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <form onSubmit={handleUrlSubmit} className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="image-url" className="text-right block">כתובת URL של תמונה</label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="text-right"
              />
            </div>
            <Button type="submit" disabled={!urlInput.trim()}>
              הוסף תמונה
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="image-upload" className="text-right block">העלאת תמונה מהמחשב</label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-right"
              disabled={isLoading}
            />
          </div>
          
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          {uploadedImage && !isLoading && (
            <div className="relative aspect-video max-h-40 overflow-hidden rounded-md bg-muted">
              <img 
                src={uploadedImage} 
                alt="תמונה שהועלתה" 
                className="object-contain w-full h-full"
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="clipboard" className="space-y-4">
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-right">העתק תמונה ללוח (Ctrl+C / ⌘+C) והדבק אותה כאן</p>
            <Button onClick={handlePasteFromClipboard}>
              הדבק מהלוח (Ctrl+V / ⌘+V)
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageUpload;
