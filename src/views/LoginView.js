import React, { useState } from "react";
import AlertComponent from "../components/alerts/AlertComponent.js";

function LoginView() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://delamuu.com/api/auth";

  const showAlertMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const authLogin = async (e) => {
    e.preventDefault();

    if (!user || !password) {
      showAlertMessage("Campos incompletso", "error");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("isAdmin", true);

        showAlertMessage("Inicio de sesión exitoso");
        window.location.href = "/admin/delamuu";
      } else {
        showAlertMessage("Error al iniciar sesión", "error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      showAlertMessage("Error al iniciar sesión");
    }
  };

  return (
    <section className="loginViewContainer">
      <form className="loginContent">
        <h2>Ingresa con tus credenciales</h2>

        <label>Usuario:</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Tu usuario aquí"
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña aquí"
        />

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm"
            disabled={!user || !password}
            onClick={authLogin}
          >
            Confirmar
          </button>
          {showAlert && <AlertComponent message={message} />}
        </div>
      </form>
    </section>
  );
}

export default LoginView;
