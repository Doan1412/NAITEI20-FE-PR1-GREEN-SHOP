import { CartItem } from "./cartItem.type";

export interface Order {
  id: string;
  user: {
    id: string;
    fullName: string;
  };
  products: CartItem[];
  total: number;
  date: string;
}
