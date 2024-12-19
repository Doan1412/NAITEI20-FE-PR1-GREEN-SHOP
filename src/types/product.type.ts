import { Comment } from "./comment.type";
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  images: string[];
  category: {
    lv0?: string;
    lv1?: string;
  };
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
