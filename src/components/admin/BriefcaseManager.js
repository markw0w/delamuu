import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit2, PlusCircle, ThumbsUp } from "lucide-react";

function BriefcaseManager() {
  const [activePanel, setActivePanel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: ""
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: ""
  });

  const API_CATEGORIES = "https://delamuu.com:3001/briefcase-categories/";
  const API_PRODUCTS = "https://delamuu.com:3001/briefcase-products";

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_CATEGORIES);
      setCategories(res.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_PRODUCTS);
      setProducts(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    const loadAllProducts = async () => {
      const res = await fetch(API_PRODUCTS);
      const data = await res.json();
      setFilteredProducts(data);
    };
  
    loadAllProducts();
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post(API_CATEGORIES, { name: newCategory });
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      console.error("Error al agregar categoría:", error);
    }
  };

  const updateCategory = async (id, name) => {
    try {
      await axios.put(`${API_CATEGORIES}/${id}`, { name });
      fetchCategories();
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_CATEGORIES}/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  const addProduct = async () => {
    const { name, description, price, categoryId } = newProduct;
    if (!name.trim() || !categoryId) return;
    try {
      await axios.post(`${API_PRODUCTS}/category/${categoryId}`, {
        name,
        description,
        price
      });
      setNewProduct({ name: "", description: "", price: "", categoryId: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      await axios.put(`${API_PRODUCTS}/${id}`, updatedData);
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_PRODUCTS}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const renderCategoryModal = () => (
    <div className="modal-briefcase">
      <div className="modal-content-briefcase">
        <h2>Administrar Categorías</h2>
        <div>
          <input
            type="text"
            placeholder="Nueva categoría..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={addCategory}>
            <PlusCircle size={18} /> Agregar
          </button>
        </div>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id} style={{ marginBottom: "0.5rem" }}>
              {editingCategoryId === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editingCategoryName}
                    onChange={(e) => setEditingCategoryName(e.target.value)}
                    onBlur={() => {
                      updateCategory(cat.id, editingCategoryName);
                      setEditingCategoryId(null);
                    }}
                  />
                </>
              ) : (
                <>
                  <span>{cat.name}</span>
                  <button
                    onClick={() => {
                      setEditingCategoryId(cat.id);
                      setEditingCategoryName(cat.name);
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteCategory(cat.id)}>
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => setActivePanel(null)}>Cerrar</button>
      </div>
    </div>
  );

  const renderProductModal = () => (
    <div className="modal-briefcase">
      <div className="modal-content-briefcase product-content-briefcase">
        <h2>Administrar Productos</h2>
        <div className="briefcase-createProduct">
          <select
            value={newProduct.categoryId}
            onChange={async (e) => {
              const categoryId = e.target.value;
              setNewProduct({ ...newProduct, categoryId });
            
              if (categoryId) {
                try {
                  const res = await fetch(`${API_PRODUCTS}/category/${categoryId}`);
                  const data = await res.json();
                  setFilteredProducts(data);
                } catch (error) {
                  console.error("Error al cargar productos:", error);
                }
              } else {
                setFilteredProducts([]);
              }
            }}
          >
            <option value="">Seleccione categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre del producto..."
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descripción..."
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="$ Precio..."
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <button onClick={addProduct}>
            <PlusCircle size={18} /> Agregar a la carta
          </button>
        </div>
        <ul className="briefcase-productUl">
          {filteredProducts.map((prod) => (
            <li key={prod.id} style={{ marginBottom: "0.5rem" }}>
              {editingProductId === prod.id ? (
                <>
                  <input
                    type="text"
                    value={editingProductData.name}
                    onChange={(e) =>
                      setEditingProductData({
                        ...editingProductData,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editingProductData.description}
                    onChange={(e) =>
                      setEditingProductData({
                        ...editingProductData,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    value={editingProductData.price}
                    onChange={(e) =>
                      setEditingProductData({
                        ...editingProductData,
                        price: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={() => {
                      updateProduct(prod.id, editingProductData);
                      setEditingProductId(null);
                    }}
                  >
                    <ThumbsUp size={25}/>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <strong>{prod.name}</strong>
                    <p>{prod.description}</p>
                    <span>${prod.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProductId(prod.id);
                      setEditingProductData({
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        categoryId: prod.category_id
                      });
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteProduct(prod.id)}>
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => setActivePanel(null)}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="admin-briefcase-panel">
      <h2>¿Qué deseas hacer?</h2>
      <div className="admin-buttons">
        <button onClick={() => setActivePanel("categories")}>
          Categorías
        </button>
        <button onClick={() => setActivePanel("products")}>
          Productos
        </button>
      </div>

      {activePanel === "categories" && renderCategoryModal()}
      {activePanel === "products" && renderProductModal()}
    </div>
  );
}

export default BriefcaseManager;

