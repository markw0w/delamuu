import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, PlusCircle } from "lucide-react";

function BriefcaseManager() {
  const [briefcase, setBriefcase] = useState([]);
  const [newBriefcase, setNewBriefcase] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const API_URL_GET_BRIEFCASE = "https://delamuu.com/briefcase/get-briefcase";
  const API_URL_ADD_BRIEFCASE = "https://delamuu.com/briefcase/add-briefcase";
  const API_URL_DEL_BRIEFCASE =
    "https://delamuu.com/briefcase/delete-briefcase";

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

  const addBriefcase = async (event) => {
    event.preventDefault();
    if (!newBriefcase.trim() || !selectedFile) return;

    const formData = new FormData();
    formData.append("nombre", newBriefcase);
    formData.append("file", selectedFile); // Enviar el archivo

    try {
      await axios.post(API_URL_ADD_BRIEFCASE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewBriefcase("");
      setSelectedFile(null);
      fetchBriefcase();
    } catch (error) {
      console.error("Error al agregar el archivo:", error);
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
        <label
          className="custom-file-label"
          htmlFor="file"
        >
          Subir archivo
        </label>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button
          onClick={addBriefcase}
          className="admin-add-btn"
        >
          <PlusCircle size={18} /> Agregar
        </button>
      </div>
      <div className="admin-list">
        {briefcase.length === 0 ? (
          <p className="admin-empty">No hay alguna carta aún.</p>
        ) : (
          briefcase.map((briefc) => (
            <div
              key={briefc.id}
              className="admin-item"
            >
              <span>{briefc.nombre}</span>
              <button
                onClick={() => deleteBriefcase(briefc.id)}
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

export default BriefcaseManager;
