import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, PlusCircle } from "lucide-react";

function BriefcaseManager() {
  const [briefcase, setBriefcase] = useState([]);
  const [newBriefcase, setNewBriefcase] = useState("");

  const API_URL_GET_BRIEFCASE = "https://delamuu.com/briefcase/get-briefcase";
  const API_URL_ADD_BRIEFCASE = "https://delamuu.com/briefcase/add-briefcase";
  const API_URL_DEL_BRIEFCASE = "https://delamuu.com/briefcase/delete-briefcase";

  useEffect(() => {
    fetchBriefcase();
  }, []);

  const fetchBriefcase = async () => {
    try {
      const response = await axios.get(API_URL_GET_BRIEFCASE);
      setBriefcase(response.data);
    } catch (error) {
      console.error("Error al obtener la carta:", error);
    }
  };

  const addBriefcase = async () => {
    if (!newBriefcase.trim()) return;
    try {
      await axios.post(API_URL_ADD_BRIEFCASE, { nombre: newBriefcase, file_path: "/ruta/a/archivo.pdf" });
      setNewBriefcase("");
      fetchBriefcase();
    } catch (error) {
      console.error("Error al agregar la carta:", error);
    }
  };

  const deleteBriefcase = async (id) => {
    try {
      await axios.delete(`${API_URL_DEL_BRIEFCASE}/${id}`);
      fetchBriefcase();
    } catch (error) {
      console.error("Error al eliminar la carta:", error);
    }
  };

  return (
    <div className="admin-detail-container">
      <h2 className="admin-detail-title">Administrar Carta</h2>
      <div className="admin-input-container">
        <label className="custom-file-label" htmlFor="file">
          Subir archivo
        </label>
        <input
          type="file"
          id="file"
          placeholder="Nueva carta..."
          value={newBriefcase}
          onChange={(e) => setNewBriefcase(e.target.value)}
          className="admin-input input-file"
        />
        <button onClick={addBriefcase} className="admin-add-btn">
          <PlusCircle size={18} /> Agregar
        </button>
      </div>
      <div className="admin-list">
        {briefcase.length === 0 ? (
          <p className="admin-empty">No hay alguna carta aún.</p>
        ) : (
          briefcase.map((briefc) => (
            <div key={briefc.id} className="admin-item">
              <span>{briefc.nombre}</span>
              <button onClick={() => deleteBriefcase(briefc.id)} className="admin-delete-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BriefcaseManager;
