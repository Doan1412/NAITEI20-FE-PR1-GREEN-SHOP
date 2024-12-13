import { Comment } from "./comment.type";
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  images: string[];
  category: string;
  color: string;
  description: string;
  commonName: string;
  scientificName: string;
  plantFamily: string
  height: string;
  origin: string;
  describe: string;
  sales: number;
  discount: number;
  comments: Comment[];
};
