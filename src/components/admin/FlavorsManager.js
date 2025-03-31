import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

function FlavorsManager() {
  const [flavors, setFlavors] = useState([]);
  const [newFlavor, setNewFlavor] = useState("");

  const API_URL_GET_FLAVORS = "https://delamuu.com/flavors/get-flavors";
  const API_URL_ADD_FLAVORS = "https://delamuu.com/flavors/add-flavor";
  const API_URL_DEL_FLAVORS = "https://delamuu.com/flavors/delete-flavor";

  useEffect(() => {
    fetchFlavors();
  }, []);

  const fetchFlavors = async () => {
    try {
      const response = await axios.get(API_URL_GET_FLAVORS);
      setFlavors(response.data);
    } catch (error) {
      console.error("Error al obtener los sabores:", error);
    }
  };

  const addFlavor = async () => {
    if (!newFlavor.trim()) return;
    try {
      await axios.post(API_URL_ADD_FLAVORS, { nombre: newFlavor });
      setNewFlavor("");
      fetchFlavors();
    } catch (error) {
      console.error("Error al agregar el sabor:", error);
    }
  };

  const deleteFlavor = async (id) => {
    try {
      await axios.delete(`${API_URL_DEL_FLAVORS}/${id}`);
      fetchFlavors();
    } catch (error) {
      console.error("Error al eliminar el sabor:", error);
    }
};

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Administrar Sabores</h2>

      <div className="admin-input-container">
        <input
          type="text"
          placeholder="Nuevo sabor..."
          value={newFlavor}
          onChange={(e) => setNewFlavor(e.target.value)}
          className="admin-input"
        />
        <button onClick={addFlavor} className="admin-add-btn">
          <PlusCircle size={18} /> Agregar
        </button>
      </div>

      <div className="admin-list">
        {flavors.length === 0 ? (
          <p className="admin-empty">No hay sabores aún.</p>
        ) : (
          flavors.map((flavor) => (
            <div key={flavor.id} className="admin-item">
              <span>{flavor.nombre}</span>
              <button onClick={() => deleteFlavor(flavor.id)} className="admin-delete-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FlavorsManager;