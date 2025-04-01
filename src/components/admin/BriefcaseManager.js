import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, PlusCircle } from "lucide-react";

function BriefcaseManager() {
  const [briefcase, setBriefcase] = useState([]);
  const [newBriefcase, setNewBriefcase] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const API_URL_GET_BRIEFCASE = "https://delamuu.com/briefcase/get-briefcase";
  const API_URL_ADD_BRIEFCASE = "https://delamuu.com/briefcase/add-briefcase";
  const API_URL_DEL_BRIEFCASE = "https://delamuu.com/briefcase/delete-briefcase";

  useEffect(() => {
    fetchBriefcase();
  }, []);

  const fetchBriefcase = async () => {
    try {
      const response = await axios.get(API_URL_GET_BRIEFCASE);
      console.log("Respuesta de la API:", response.data);
      if (Array.isArray(response.data)) {
        setBriefcase(response.data);
      } else {
        setBriefcase([]);
        console.error("La API no devolvió un array:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener la carta:", error);
      setBriefcase([]);
    }
  };

  const addBriefcase = async (event) => {
    event.preventDefault();

    console.log("Botón addBriefcase apretado");
    console.log("selectedFile antes del if:", selectedFile);
    console.log("newBriefcase antes del if:", newBriefcase);

    if (!newBriefcase.trim() || !selectedFile) {
      console.log("Falta el nombre o el archivo no ha sido seleccionado");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", newBriefcase);
    formData.append("file", selectedFile);

    try {
      console.log("Intentando enviar el archivo...");
      await axios.post(API_URL_ADD_BRIEFCASE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewBriefcase("");
      setSelectedFile(null);
      fetchBriefcase();
      console.log("Archivo enviado correctamente");
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
        {/* Input de texto para el nombre del documento */}
        <input
          type="text"
          placeholder="Nombre del documento..."
          value={newBriefcase}
          onChange={(e) => setNewBriefcase(e.target.value)}
          className="admin-input"
        />

        {/* Input de archivo, aceptando solo PDFs */}
        <label className="custom-file-label" htmlFor="file">
          Subir archivo
        </label>
        <input
          type="file"
          id="file"
          accept="application/pdf"
          onChange={(e) => {
            console.log("Archivo seleccionado:", e.target.files[0]);
            setSelectedFile(e.target.files[0]);
          }}
          className="input-file"
        />

        <button onClick={addBriefcase} className="admin-add-btn">
          <PlusCircle size={18} /> Agregar
        </button>
      </div>
      <div className="admin-list">
        {Array.isArray(briefcase) && briefcase.length > 0 ? (
          briefcase.map((briefc) => (
            <div key={briefc.id} className="admin-item">
              <span>{briefc.nombre}</span>
              <button onClick={() => deleteBriefcase(briefc.id)} className="admin-delete-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="admin-empty">No hay alguna carta aún.</p>
        )}
      </div>
    </div>
  );
}

export default BriefcaseManager;
