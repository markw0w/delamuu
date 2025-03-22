import React, { useState } from "react";

const OrderModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Completa tu información</h2>

        <label>Nombre:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ej: Juan Pérez" 
        />

        <label>Dirección:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Ej: Avenida República 999, Junin" 
        />

        <div className="modal-buttons">
          <button 
            className="confirm" 
            onClick={() => onConfirm(name, address)}
            disabled={!name || !address}
          >
            Confirmar
          </button>
          <button className="cancel" onClick={onClose}>Seguir comprando</button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;