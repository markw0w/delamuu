import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";

function PricesManager() {
  const [deliveryPrice, setDeliveryPrice] = useState([]);
  const [newDeliveryPrice, setNewDeliveryPrice] = useState("");

  const API_URL_GET_DELIVERY_PRICE = "http://localhost:3001/delivery/get-delivery";
  const API_URL_UPDATE_DELIVERY_PRICE = "http://localhost:3001/delivery/update-price";

  useEffect(() => {
    fetchDeliveryPrice();
  }, []);

  const fetchDeliveryPrice = async () => {
    try {
      const response = await axios.get(API_URL_GET_DELIVERY_PRICE);
      setDeliveryPrice(response.data);
    } catch (error) {
      console.error("Error al obtener el precio del envío:", error);
    }
  };

  const updateDeliveryPrice = async () => {
    if (!newDeliveryPrice.trim()) return;
    try {
      await axios.post(API_URL_UPDATE_DELIVERY_PRICE, { newDeliveryPrice: newDeliveryPrice });
      setNewDeliveryPrice("");
      fetchDeliveryPrice();
    } catch (error) {
      console.error("Error al actualizar el precio del envío:", error);
    }
  };

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Precio de envío</h2>

      <div className="admin-input-container">
        <input
          type="number"
          placeholder="Nuevo precio..."
          value={newDeliveryPrice}
          onChange={(e) => setNewDeliveryPrice(e.target.value)}
          className="admin-input"
        />
        <button onClick={updateDeliveryPrice} className="admin-add-btn">
          <PlusCircle size={18} /> Editar
        </button>
      </div>

      <div className="admin-list">
        {deliveryPrice.length === 0 ? (
          <p className="admin-empty">No hay precio de envío.</p>
        ) : (
          deliveryPrice.map((price, index) => (
            <div key={index} className="admin-item">
              <span>Costo de envío: ${price.price}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PricesManager;