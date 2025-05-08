
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Sample portfolio items
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

interface GalleryProps {
  items: GalleryItem[];
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ items, className }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(items.map(item => item.category)))];
  
  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className={cn("", className)}>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-colors",
              filter === category
                ? "bg-bstudio-primary text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            )}
          >
            {category === "all" ? "הכל" : category}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-white/80">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for item details */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl">
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-right space-y-4">
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-sm text-bstudio-primary font-medium">{selectedItem.category}</p>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
