// Cart.js
import React, { useState } from "react";
import { ShoppingCart, X, Trash2, MessageCircleHeart } from "lucide-react";
import { useCart } from "./CartContext";
import { useLocation } from "react-router-dom";
import OrderModal from "../components/form/OrderModal";

const Cart = () => {
  const { cartItems, removeOrder } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const location = useLocation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cartItemCount = cartItems.length;
  const shouldShowCart =
    cartItemCount > 0 ||
    location.pathname === "/order" ||
    location.pathname === "/producto";

  const totalCart = cartItems.reduce((total, order) => {
    let price = 0;

    if (Array.isArray(order.prices)) {
      price = order.prices.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    } else {
      price = parseFloat(order.prices) || 0;
    }

    return total + price;
  }, 0);

  const sendOrderToWhatsApp = (name, address) => {
    setCustomerName(name);
    setCustomerAddress(address);

    const phoneNumber = "5492364595877";
    const order = JSON.parse(localStorage.getItem("orders")) || [];

    if (order.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    let message = `🛒 *Pedido Nuevo* 🛒\n\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📍 *Dirección:* ${address}\n\n`;

    order.forEach((item, index) => {
      message += `*Pedido N°:${index + 1}*\n🍫 Envase: *${item.gramaje}*\n`;
    
      if (item.toppings?.length) {
        message += `🍫 *Toppings:* ${item.toppings.join(", ")}\n`;
      }
      if (item.sauces?.length) {
        message += `🍯 *Salsas:* ${item.sauces.join(", ")}\n`;
      }
      if (item.fruits?.length) {
        message += `🍓 *Frutas:* ${item.fruits.join(", ")}\n`;
      }

      message += `💰 *Precio:* $${Number(item.prices).toLocaleString("es-ES")}\n\n`;
    });

    const total = order.reduce((sum, item) => sum + Number(item.prices), 0);
    message += `💰 *Total a pagar:* $${total.toLocaleString("es-ES")}\n\n`;
    message += `📅 Fecha: ${new Date().toLocaleDateString("es-ES")}\n\n`;
    message += `🛻 ¡Gracias por tu compra!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, "_blank");
    setIsModalOpen(false);
  };
  return (
    <>
      {shouldShowCart && (
        <div
          className="cart"
          onClick={toggleModal}
          style={{ cursor: "pointer" }}
        >
          <ShoppingCart
            size={40}
            color="#fff"
          />
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="cart-modal">
          <div className="cart-content">
            <button
              className="close-button"
              onClick={toggleModal}
            >
              <X size={24} />
            </button>
            <h2>Tu Carrito</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((order, index) => (
                  <li key={index}>
                    <span className="totalCart">
                      Total: ${totalCart.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                      <button className="sendOrder"  onClick={() => setIsModalOpen(true)}>
                        <MessageCircleHeart size={20}/> Enviar Pedido
                      </button>
                    </span>
                    <div className="order-summary">
                      <p>
                        <strong>Envase:</strong> {order.gramaje}
                      </p>
                      <p>
                        <strong>Toppings:</strong>{" "}
                        {order.toppings.length > 0
                          ? order.toppings.join(", ")
                          : "Sin toppings"}
                      </p>
                      <p>
                        <strong>Salsas:</strong>{" "}
                        {order.sauces.length > 0
                          ? order.sauces.join(", ")
                          : "Sin salsas"}
                      </p>
                      <p>
                        <strong>Frutas:</strong>{" "}
                        {order.fruits.length > 0
                          ? order.fruits.join(", ")
                          : "Sin frutas"}
                      </p>
                      <p>
                        <strong>Precio:</strong> ${" "}
                        {Array.isArray(order.prices)
                          ? order.prices.map(price => Number(price).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })).join(", ")
                          : Number(order.prices).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <button
                      onClick={() => removeOrder(index)}
                      className="delete-button"
                    >
                      <Trash2
                        size={25}
                        color="red"
                      />
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
      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={sendOrderToWhatsApp} 
      />
    </>
  );
};

export default Cart;
