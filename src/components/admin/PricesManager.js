import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import EditPriceModal from "../form/EditPriceModal";

function PricesManager() {
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [newDeliveryPrice, setNewDeliveryPrice] = useState("");
  const [productPrices, setProductPrices] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Endpoints
  const API_URL_GET_DELIVERY_PRICE =
    "http://localhost:3001/delivery/get-delivery";
  const API_URL_UPDATE_DELIVERY_PRICE =
    "http://localhost:3001/delivery/update-price";
  const API_URL_GET_PRODUCT_PRICES =
    "http://localhost:3001/products/get-prices";
  const API_URL_UPDATE_PRODUCT_PRICE =
    "http://localhost:3001/products/update-price";

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

  const cancelEditingProduct = () => {
    setEditingProductId(null);
    setNewProductPrice("");
  };

  useEffect(() => {
    fetchDeliveryPrice();
    fetchProductPrices();
  }, []);

  const startEditingProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const updateProductPrice = async (newPrice) => {
    if (!selectedProduct) return;
    try {
      await axios.post(`${API_URL_UPDATE_PRODUCT_PRICE}/${selectedProduct.id}`, { newPrice });
      closeModal();
      fetchProductPrices();
    } catch (error) {
      console.error("Error al actualizar el precio del producto:", error);
    }
  };

  return (
    <section className="admin-detail-container">
      <article>
        <h2 className="admin-detail-title">Precio de envío</h2>
        <div className="admin-input-container">
          <input
            type="number"
            placeholder="Nuevo precio de envío..."
            value={newDeliveryPrice}
            onChange={(e) => setNewDeliveryPrice(e.target.value)}
            className="admin-input"
          />
          <button
            onClick={updateDeliveryPrice}
            className="admin-add-btn"
          >
            <PlusCircle size={18} /> Editar
          </button>
        </div>
        <div className="admin-list">
          {deliveryPrice && deliveryPrice.price ? (
            <div className="admin-item">
              <span>
                Precio de envío: $
                {Number(deliveryPrice.price).toLocaleString("es-ES")}
              </span>
            </div>
          ) : (
            <p className="admin-empty">No hay precio de envío.</p>
          )}
        </div>
      </article>

      <article
        className="admin-product-prices"
        style={{ marginTop: "2rem" }}
      >
        <h2 className="admin-detail-title">Precios de productos</h2>
        {productPrices && productPrices.length > 0 ? (
          <ul className="admin-list-products">
            {productPrices.map((item) => (
              <li key={item.id} className="admin-item-product">
                <span className="envase">{item.envaseNombre}</span>
                <span className="producto">{item.productoNombre}</span>
                <span className="precio">
                  ${Number(item.precio).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="acciones">
                  <button onClick={() => startEditingProduct(item)}>Editar</button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="admin-empty">No hay precios de productos.</p>
        )}
      </article>

      <EditPriceModal
        isOpen={isModalOpen}
        productName={selectedProduct ? `${selectedProduct.envaseNombre} - ${selectedProduct.productoNombre}` : ""}
        initialPrice={selectedProduct ? selectedProduct.precio : ""}
        onClose={closeModal}
        onSave={updateProductPrice}
      />
    </section>
  );
}

export default PricesManager;
