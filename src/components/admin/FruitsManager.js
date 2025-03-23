import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

function FruitsManager() {
  const [fruits, setFruits] = useState([]);
  const [newFruit, setNewFruit] = useState("");

  const API_URL_GET_SAUCES = "http://localhost:3001/fruits/get-fruits";
  const API_URL_ADD_SAUCES = "http://localhost:3001/fruits/add-fruit";
  const API_URL_DEL_SAUCES = "http://localhost:3001/fruits/delete-fruit";

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    try {
      const response = await axios.get(API_URL_GET_SAUCES);
      setFruits(response.data);
    } catch (error) {
      console.error("Error al obtener las frutas:", error);
    }
  };

  const addFruit = async () => {
    if (!newFruit.trim()) return;
    try {
      await axios.post(API_URL_ADD_SAUCES, { nombre: newFruit });
      setNewFruit("");
      fetchFruits();
    } catch (error) {
      console.error("Error al agregar la fruta:", error);
    }
  };

  const deleteFruit = async (id) => {
    try {
      await axios.delete(`${API_URL_DEL_SAUCES}/${id}`);
      fetchFruits();
    } catch (error) {
      console.error("Error al eliminar la fruta:", error);
    }
};

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Administrar Frutas</h2>

      <div className="admin-input-container">
        <input
          type="text"
          placeholder="Nueva fruta..."
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          className="admin-input"
        />
        <button onClick={addFruit} className="admin-add-btn">
          <PlusCircle size={18} /> Agregar
        </button>
      </div>

      <div className="admin-list">
        {fruits.length === 0 ? (
          <p className="admin-empty">No hay frutas aún.</p>
        ) : (
          fruits.map((fruit) => (
            <div key={fruit.id} className="admin-item">
              <span>{fruit.nombre}</span>
              <button onClick={() => deleteFruit(fruit.id)} className="admin-delete-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FruitsManager;