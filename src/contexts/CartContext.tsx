import { message } from "antd";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/product.type";
import { saveCart } from "../utils/cart";
import { CartItem } from "../types/cartItem.type";

interface CartContextType {
  cart: CartItem[];
  totalQuantity: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  deleteCartItem: (id: number) => void;
  deleteAllCartItem: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalQuantity = cart.length;

  const saveCartToLocalStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product: Product, quantity: number = 1): void => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart: CartItem[];
  
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: quantity }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: quantity,
        },
      ];
    }
  
    setCart(updatedCart);
    saveCart(updatedCart);
    message.success('Product added to cart successfully');
  };
  

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      saveCartToLocalStorage(updatedCart);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCartToLocalStorage(updatedCart);
    }
  };

  const deleteCartItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    saveCartToLocalStorage(cart.filter((item) => item.id !== id));
  };

  const deleteAllCartItem = () => {
    setCart([]);
    saveCartToLocalStorage([]);
  }

  return (
    <CartContext.Provider value={{ cart, totalQuantity, addToCart, updateQuantity, deleteCartItem, deleteAllCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
