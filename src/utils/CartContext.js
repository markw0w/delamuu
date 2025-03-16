// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    return storedOrders;
  });

  const addOrder = (newOrder) => {
    const updatedCart = [...cartItems, newOrder];
    setCartItems(updatedCart);
    localStorage.setItem("orders", JSON.stringify(updatedCart));
  };

  const removeOrder = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("orders", JSON.stringify(updatedCart)); 
  };

  return (
    <CartContext.Provider value={{ cartItems, addOrder, removeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
