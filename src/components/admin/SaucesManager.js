import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

function SaucesManager() {
  const [sauces, setSauces] = useState([]);
  const [newSauce, setNewSauce] = useState("");

  const API_URL_GET_SAUCES = "http://localhost:3001/sauces/get-sauces";
  const API_URL_ADD_SAUCES = "http://localhost:3001/sauces/add-sauce";
  const API_URL_DEL_SAUCES = "http://localhost:3001/sauces/delete-sauce";

  useEffect(() => {
    fetchSauces();
  }, []);

  const fetchSauces = async () => {
    try {
      const response = await axios.get(API_URL_GET_SAUCES);
      setSauces(response.data);
    } catch (error) {
      console.error("Error al obtener las salsas:", error);
    }
  };

  const addSauce = async () => {
    if (!newSauce.trim()) return;
    try {
      await axios.post(API_URL_ADD_SAUCES, { nombre: newSauce });
      setNewSauce("");
      fetchSauces();
    } catch (error) {
      console.error("Error al agregar la salsa:", error);
    }
  };

  const deleteSauce = async (id) => {
    try {
      await axios.delete(`${API_URL_DEL_SAUCES}/${id}`);
      fetchSauces();
    } catch (error) {
      console.error("Error al eliminar la salsa:", error);
    }
};

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Administrar Salsas</h2>

      <div className="admin-input-container">
        <input
          type="text"
          placeholder="Nueva salsa..."
          value={newSauce}
          onChange={(e) => setNewSauce(e.target.value)}
          className="admin-input"
        />
        <button onClick={addSauce} className="admin-add-btn">
          <PlusCircle size={18} /> Agregar
        </button>
      </div>

      <div className="admin-list">
        {sauces.length === 0 ? (
          <p className="admin-empty">No hay salsas aún.</p>
        ) : (
          sauces.map((sauce) => (
            <div key={sauce.id} className="admin-item">
              <span>{sauce.nombre}</span>
              <button onClick={() => deleteSauce(sauce.id)} className="admin-delete-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SaucesManager;