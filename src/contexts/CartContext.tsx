import { message } from "antd";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/product.type";
import { saveCart } from "../utils/cart";
import { CartItem } from "../types/cartItem.type";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cart: CartItem[];
  totalQuantity: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  deleteCartItem: (id: string) => void;
  deleteAllCartItem: () => void;
  addToPaymentList: (product: CartItem[]) => void;
  getPaymentList: () => CartItem[];
  deletePaymentList: () => void;
  deleteItemsInCart: (product: CartItem[]) => void;
  handleBuyNow: (product: Product, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalQuantity = cart.length;
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
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
  

  const updateQuantity = (productId: string, quantity: number) => {
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

  const deleteCartItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    saveCartToLocalStorage(cart.filter((item) => item.id !== id));
  };

  const deleteAllCartItem = () => {
    setCart([]);
    saveCartToLocalStorage([]);
  }

  const addToPaymentList = (products: CartItem[]): void => {
    localStorage.setItem('payments', JSON.stringify(products));
  };

  const getPaymentList = () => {
    const data: CartItem[] = JSON.parse(localStorage.getItem('payments') || '')
    return data
  }

  const deletePaymentList = () => {
    localStorage.removeItem("payments");
  }

  const deleteItemsInCart = (cardItems: CartItem[]) => {
    const updatedCart = cart.filter(
      (cartItem) => !cardItems.some((item) => item.id === cartItem.id)
    );
    setCart(updatedCart);
  }

  const handleBuyNow = (product: Product, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isLoggedIn) {
      message.error('Please login to add product to buy product');
      navigate('/login');
      return;
    }
    const convertedCard: CartItem = {
      ...product,
      image: product?.images?.[0],
      quantity: 1
    }
    deletePaymentList();
    addToPaymentList([convertedCard]);
    navigate("/payments");
    e.preventDefault()
  }

  return (
    <CartContext.Provider value={{ cart, totalQuantity, addToCart, updateQuantity, deleteCartItem, deleteAllCartItem, addToPaymentList, getPaymentList, deletePaymentList, deleteItemsInCart, handleBuyNow }}>
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
