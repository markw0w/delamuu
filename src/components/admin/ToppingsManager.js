import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

function ToppingsManager() {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState("");

  const API_URL_GET_TOPPINGS = "http://localhost:3001/toppings/get-toppings";
  const API_URL_ADD_TOPPINGS = "http://localhost:3001/toppings/add-topping";
  const API_URL_DEL_TOPPINGS = "http://localhost:3001/toppings/delete-topping";

  useEffect(() => {
    fetchToppings();
  }, []);

  const fetchToppings = async () => {
    try {
      const response = await axios.get(API_URL_GET_TOPPINGS);
      setToppings(response.data);
    } catch (error) {
      console.error("Error al obtener toppings:", error);
    }
  };

  const addTopping = async () => {
    if (!newTopping.trim()) return;
    try {
      await axios.post(API_URL_ADD_TOPPINGS, { nombre: newTopping });
      setNewTopping("");
      fetchToppings();
    } catch (error) {
      console.error("Error al agregar topping:", error);
    }
  };

  const deleteTopping = async (id) => {
    try {
      await axios.delete(`${API_URL_DEL_TOPPINGS}/${id}`);
      fetchToppings();
    } catch (error) {
      console.error("Error al eliminar topping:", error);
    }
};

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Administrar Toppings</h2>

      <div className="admin-input-container">
        <input
          type="text"
          placeholder="Nuevo topping..."
          value={newTopping}
          onChange={(e) => setNewTopping(e.target.value)}
          className="admin-input"
        />
        <button onClick={addTopping} className="admin-add-btn">
          <PlusCircle size={18} /> Agregar
        </button>
      </div>

      <div className="admin-list">
        {toppings.length === 0 ? (
          <p className="admin-empty">No hay toppings aún.</p>
        ) : (
          toppings.map((topping) => (
            <div key={topping.id} className="admin-item">
              <span>{topping.nombre}</span>
              <button onClick={() => deleteTopping(topping.id)} className="admin-delete-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ToppingsManager;