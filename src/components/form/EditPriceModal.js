import React, { useState, useEffect } from "react";

const EditPriceModal = ({ isOpen, productName, initialPrice, onClose, onSave }) => {
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  if (!isOpen) return null;

  return (
    <article className="modal-overlay">
      <div className="modal-content">
        <h2>Editar precio para {productName}</h2>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nuevo precio..."
        />
        <div className="modal-buttons">
          <button className="confirm" onClick={() => onSave(price)}>Guardar</button>
          <button className="cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </article>
  );
};

export default EditPriceModal;