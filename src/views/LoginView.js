/* import React, { useState } from "react";

function LoginView() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:3001/api/auth";

  const authLogin = async (e) => {
    e.preventDefault();

    if (!user || !password) {
      alert("Por favor, completa todos los campos.");
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
        alert(data.message || "Inicio de sesión exitoso");
        window.location.href = "/admin/delamuu"
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Hubo un problema al conectar con el servidor.");
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
          type="text"
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
        </div>
      </form>
    </section>
  );
}

export default LoginView; */

import React, { useState } from "react";

function LoginView() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:3001/api/auth"; // Asegúrate de tener el endpoint correcto

  const authLogin = async (e) => {
    e.preventDefault();

    if (!user || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }), // Enviar los datos al backend
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token JWT en el localStorage
        localStorage.setItem("token", data.token);

        alert(data.message || "Inicio de sesión exitoso");

        // Redirigir al panel admin
        window.location.href = "/admin/delamuu"; // Aquí asegúrate de que la ruta exista
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Hubo un problema al conectar con el servidor.");
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
        </div>
      </form>
    </section>
  );
}

export default LoginView;
