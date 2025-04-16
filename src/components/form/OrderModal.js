import React, { useState } from "react";

const OrderModal = ({ isOpen, onClose, onConfirm, deliveryPrice }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState("");
  const [payment, setPayment] = useState("Pago contraentrega");

  if (!isOpen) return null;

  const handleDeliveryChange = (value) => {
    setDelivery((prev) => (prev === value ? "" : value));
  };

  const handleConfirm = () => {
    if (delivery === "Retiro en local") {
      onConfirm(name, "", delivery, "");
    } else {
      onConfirm(name, address, delivery, payment);
    }
  };

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

        <div className="delivery-options">
          <label>Forma de retiro:</label>
          <div>
            <input
              type="checkbox"
              checked={delivery === "Entregar en domicilio"}
              onChange={() => handleDeliveryChange("Entregar en domicilio")}
            />
            <span>
              Entregar en domicilio{" "}
              {deliveryPrice && (
                <span>(${Number(deliveryPrice).toLocaleString("es-ES")})</span>
              )}
            </span>
          </div>
          <div>
            <input
              type="checkbox"
              checked={delivery === "Retiro en local"}
              onChange={() => handleDeliveryChange("Retiro en local")}
            />
            <span>Retiro en local</span>
          </div>
        </div>

        {delivery === "Entregar en domicilio" && (
          <>
            <label>Dirección:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej: Avenida República 999, Junin"
            />

            <div className="payment-option">
              <label>Forma de pago:</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="Pago contraentrega">Pago contraentrega</option>
                <option value="Pago virtual">Pago virtual</option>
              </select>
            </div>
          </>
        )}

        <div className="modal-buttons">
          <button
            className="confirm"
            onClick={handleConfirm}
            disabled={
              !name ||
              !delivery ||
              (delivery === "Entregar en domicilio" && (!address || !payment))
            }
          >
            Enviar pedido
          </button>
          <button
            className="cancel"
            onClick={onClose}
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
