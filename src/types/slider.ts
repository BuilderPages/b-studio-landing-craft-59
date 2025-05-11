
export interface SliderItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  order?: number;
  category: string; // Adding the required category field
}
