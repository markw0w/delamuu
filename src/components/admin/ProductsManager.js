import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  const API_URL_GET_PRODUCTS = "http://localhost:3001/products/get-products";
  const API_URL_ADD_PRODUCTS = "http://localhost:3001/products/add-product";
  const API_URL_DEL_PRODUCTS = "http://localhost:3001/products/delete-product";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL_GET_PRODUCTS);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener las productos:", error);
    }
  };

  const addProduct = async () => {
    if (!newProduct.trim()) return;
    try {
      await axios.post(API_URL_ADD_PRODUCTS, { nombre: newProduct });
      setNewProduct("");
      fetchProducts();
    } catch (error) {
      console.error("Error al agregar la producto:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL_DEL_PRODUCTS}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar la producto:", error);
    }
};

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Administrar Productos</h2>

      <div className="admin-input-container">
        <input
          type="text"
          placeholder="Nueva producto..."
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="admin-input"
        />
        <button onClick={addProduct} className="admin-add-btn">
          <PlusCircle size={18} /> Agregar
        </button>
      </div>

      <div className="admin-list">
        {products.length === 0 ? (
          <p className="admin-empty">No hay productos aún.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="admin-item">
              <span>{product.nombre}</span>
              <button onClick={() => deleteProduct(product.id)} className="admin-delete-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsManager;