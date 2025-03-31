import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

function GramajesManager() {
  const [gramajes, setGramajes] = useState([]);
  const [newGramaje, setNewGramaje] = useState("");

  const API_URL_GET_GRAMAJES = "https://delamuu.com/gramajes/get-gramajes";
  const API_URL_ADD_GRAMAJES = "https://delamuu.com/gramajes/add-gramaje";
  const API_URL_DEL_GRAMAJES = "https://delamuu.com/gramajes/delete-gramaje";

  useEffect(() => {
    fetchGramajes();
  }, []);

  const fetchGramajes = async () => {
    try {
      const response = await axios.get(API_URL_GET_GRAMAJES);
      setGramajes(response.data);
    } catch (error) {
      console.error("Error al obtener las gramajes:", error);
    }
  };

  const addGramaje = async () => {
    if (!newGramaje.trim()) return;
    try {
      await axios.post(API_URL_ADD_GRAMAJES, { nombre: newGramaje });
      setNewGramaje("");
      fetchGramajes();
    } catch (error) {
      console.error("Error al agregar la gramaje:", error);
    }
  };

  const deleteGramaje = async (id) => {
    try {
      await axios.delete(`${API_URL_DEL_GRAMAJES}/${id}`);
      fetchGramajes();
    } catch (error) {
      console.error("Error al eliminar la gramaje:", error);
    }
  };

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Administrar Gramajes</h2>

      <div className="admin-input-container">
        <input
          type="text"
          placeholder="Nueva gramaje..."
          value={newGramaje}
          onChange={(e) => setNewGramaje(e.target.value)}
          className="admin-input"
        />
        <button
          onClick={addGramaje}
          className="admin-add-btn"
        >
          <PlusCircle size={18} /> Agregar
        </button>
      </div>

      <div className="admin-list">
        {gramajes.length === 0 ? (
          <p className="admin-empty">No hay gramajes aún.</p>
        ) : (
          gramajes.map((gramaje) => (
            <div
              key={gramaje.id}
              className="admin-item"
            >
              <span>{gramaje.nombre}</span>
              <button
                onClick={() => deleteGramaje(gramaje.id)}
                className="admin-delete-btn"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GramajesManager;
