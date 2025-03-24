import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";

function PricesManager() {
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [newDeliveryPrice, setNewDeliveryPrice] = useState("");
  const [productPrices, setProductPrices] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState("");

  // Endpoints
  const API_URL_GET_DELIVERY_PRICE = "http://localhost:3001/delivery/get-delivery";
  const API_URL_UPDATE_DELIVERY_PRICE = "http://localhost:3001/delivery/update-price";
  const API_URL_GET_PRODUCT_PRICES = "http://localhost:3001/products/get-prices";
  const API_URL_UPDATE_PRODUCT_PRICE = "http://localhost:3001/products/update-price";

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
      await axios.post(API_URL_UPDATE_DELIVERY_PRICE, {
        newDeliveryPrice: newDeliveryPrice,
      });
      setNewDeliveryPrice("");
      fetchDeliveryPrice();
    } catch (error) {
      console.error("Error al actualizar el precio del envío:", error);
    }
  };

  const fetchProductPrices = async () => {
    try {
      const response = await axios.get(API_URL_GET_PRODUCT_PRICES);
      setProductPrices(response.data);
    } catch (error) {
      console.error("Error al obtener los precios de productos:", error);
    }
  };

  const startEditingProduct = (id, currentPrice) => {
    setEditingProductId(id);
    setNewProductPrice(currentPrice);
  };

  const updateProductPrice = async (id) => {
    try {
      await axios.post(`${API_URL_UPDATE_PRODUCT_PRICE}/${id}`, { newPrice: newProductPrice });
      setEditingProductId(null);
      setNewProductPrice("");
      fetchProductPrices();
    } catch (error) {
      console.error("Error al actualizar el precio del producto:", error);
    }
  };

  const cancelEditingProduct = () => {
    setEditingProductId(null);
    setNewProductPrice("");
  };

  useEffect(() => {
    fetchDeliveryPrice();
    fetchProductPrices();
  }, []);

  return (
    <section className="admin-detail-container">
      <div>
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
          {deliveryPrice && deliveryPrice.price ? (
            <div className="admin-item">
              <span>
                Precio de envío: ${Number(deliveryPrice.price).toLocaleString("es-ES")}
              </span>
            </div>
          ) : (
            <p className="admin-empty">No hay precio de envío.</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2 className="admin-detail-title">Precios de productos</h2>
        {productPrices && productPrices.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Envase</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productPrices.map((item) => (
                <tr key={item.id}>
                  <td>{item.envaseNombre}</td>
                  <td>{item.productoNombre}</td>
                  <td>
                    {editingProductId === item.id ? (
                      <input
                        type="number"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                      />
                    ) : (
                      Number(item.precio).toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    )}
                  </td>
                  <td>
                    {editingProductId === item.id ? (
                      <>
                        <button onClick={() => updateProductPrice(item.id)}>
                          Guardar
                        </button>
                        <button onClick={cancelEditingProduct}>Cancelar</button>
                      </>
                    ) : (
                      <button onClick={() => startEditingProduct(item.id, item.precio)}>
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="admin-empty">No hay precios de productos.</p>
        )}
      </div>
    </section>
  );
}

export default PricesManager;
