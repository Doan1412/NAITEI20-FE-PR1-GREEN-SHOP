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

export interface Voucher {
  id: number;
  code: string;
  discount: number;
  expiration_date: string;
  description: string;
}
