import React from "react";
import { useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null; 
  }

  return (
    <div className="cart">
      <ShoppingCart size={40} color="#fff" />
      {/* Aquí puedes agregar los elementos del carrito */}
    </div>
  );
};

export default Cart;