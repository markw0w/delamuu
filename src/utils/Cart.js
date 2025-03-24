// Cart.js
import React, { useState, useEffect } from "react";
import { ShoppingCart, X, Trash2, MessageCircleHeart } from "lucide-react";
import { useCart } from "./CartContext";
import { useLocation } from "react-router-dom";
import OrderModal from "../components/form/OrderModal";

const Cart = () => {
  const { cartItems, removeOrder } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const location = useLocation();

  const API_URL = "http://localhost:3001/api/add-order";
  const API_URL_GET_DELIVERY = "http://localhost:3001/delivery/get-delivery";

  useEffect(() => {
    fetch(API_URL_GET_DELIVERY)
      .then((res) => res.json())
      .then((data) => {
        setDeliveryCost(Number(data.price) || 0);
      })
      .catch((error) => console.error("Error al obtener costo de envío:", error));
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openOrderModal = () => {
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  const totalCart = cartItems.reduce((total, order) => {
    let price = Array.isArray(order.prices)
      ? order.prices.reduce((acc, val) => acc + (parseFloat(val) || 0), 0)
      : parseFloat(order.prices) || 0;

    return total + price;
  }, 0);

  const saveOrderDatabase = async (name, address, delivery, payment, finalTotal) => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
  
    const pedido = {
      nombre_cliente: name,
      direccion: address,
      pedidos: cartItems.map(item => ({
        gramaje: item.gramaje,
        producto: item.producto, 
        toppings: item.toppings,
        salsas: item.sauces,
        frutas: item.fruits,
        precio: Number(item.prices)
      })),
      total: finalTotal,
      forma_retiro: delivery, 
      forma_pago: payment,        
    };
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendOrderToWhatsApp = async (name, address, delivery, payment) => {
    const shippingCost = delivery === "Entregar en domicilio" ? deliveryCost : 0;
    const finalTotal = totalCart + shippingCost;
    
    await saveOrderDatabase(name, address, delivery, payment, finalTotal);

    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    const phoneNumber = "5492364595877";
    let message = `🛒 *Pedido Nuevo* 🛒\n`;
    message += `¡Hola! Quisiera solicitar el siguiente pedido:\n\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📍 *Dirección:* ${address}\n`;
    message += `🚦 *Entrega:* ${delivery}\n`;
    message += `💳 *Forma de pago:* ${payment}\n\n`;

    cartItems.forEach((item, index) => {
      message += `*Pedido N°:${index + 1}*\n`;
      message += `🍦 *Envase:* ${item.gramaje}\n`;
      if (item.toppings?.length)
        message += `🍒 *Toppings:* ${item.toppings.join(", ")}\n`;
      if (item.sauces?.length)
        message += `🍯  *Salsas:* ${item.sauces.join(", ")}\n`;
      if (item.fruits?.length)
        message += `🍓 *Frutas:* ${item.fruits.join(", ")}\n`;
      message += `💰 *Precio:* $${Number(item.prices).toLocaleString(
        "es-ES"
      )}\n\n`;
    });

    if (shippingCost > 0) {
      message += `🚚 *Costo de envío:* $${shippingCost.toLocaleString("es-ES")}\n`;
    }

    //const total = cartItems.reduce((sum, item) => sum + Number(item.prices), 0);
    message += `💰 *Total a pagar:* $${finalTotal.toLocaleString("es-ES")}\n\n`;
    message += `📅 Fecha: ${new Date().toLocaleDateString("es-ES")}\n\n`;
    message += `🛻 ¡Gracias por tu compra!`;

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");

    closeOrderModal();
  };

  return (
    <>
      <div
        className="cart"
        onClick={toggleCart}
        style={{ cursor: "pointer" }}
      >
        <ShoppingCart
          size={40}
          color="#fff"
        />
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>

      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-content">
            <button
              className="close-button"
              onClick={toggleCart}
            >
              <X size={24} />
            </button>
            <h2>Tu Carrito</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((order, index) => (
                  <li key={index}>
                    <span className="totalCart">
                      Total: $
                      {totalCart.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      <button
                        className="sendOrder"
                        onClick={openOrderModal}
                      >
                        <MessageCircleHeart size={20} /> Enviar Pedido
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
                        <strong>Precio:</strong> $
                        {Number(order.prices).toLocaleString("es-ES", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
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
        onClose={closeOrderModal}
        onConfirm={sendOrderToWhatsApp}
        deliveryPrice={deliveryCost} 
      />
    </>
  );
};

export default Cart;
