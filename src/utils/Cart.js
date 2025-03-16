// Cart.js
import React, { useState } from "react";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useCart } from "./CartContext"; 
import { useLocation } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeOrder } = useCart(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cartItemCount = cartItems.length;
  const shouldShowCart = cartItemCount > 0 || location.pathname === "/order" || location.pathname === "/producto";
  return (
    <>
      {shouldShowCart && (
        <div className="cart" onClick={toggleModal} style={{ cursor: "pointer" }}>
          <ShoppingCart size={40} color="#fff" />
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="cart-modal">
          <div className="cart-content">
            <button className="close-button" onClick={toggleModal}>
              <X size={24} />
            </button>
            <h2>Tu Carrito</h2>

            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((order, index) => (
                  <li key={index}>
                    <div className="order-summary">
                      <p><strong>Envase:</strong> {order.gramaje}</p>
                      <p><strong>Toppings:</strong> {order.toppings.join(", ")}</p>
                    </div>
                    <button onClick={() => removeOrder(index)} className="delete-button">
                      <Trash2 size={25} color="red" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>El carrito está vacío.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

