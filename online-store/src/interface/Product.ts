export interface IProduct {
  id: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: Array<string>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
