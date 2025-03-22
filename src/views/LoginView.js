import React, { useState } from "react";

function LoginView() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const authLogin = () => {

  }
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
