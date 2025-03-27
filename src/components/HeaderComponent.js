import React, { useState } from "react";
import { logos } from "../utils/Images";
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import MenuBurguer from "../components/BurguerMenuComponent";

function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const logout = () => {
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("token");
    window.location.href = "/"
  }
  return (
    <header className="header">
      <Link
        className="navLinks"
        to="/"
      >
        <img
          src={logos.shortDark}
          alt="Logo/Inicio de Delamuu"
        />
      </Link>
      {isAdmin ? (
        <div className="rightNavContainer">
          <button onClick={logout} id="logoutBtn"><LogOut size={50}/></button>
        </div>
      ) : (
        <div className="rightNavContainer">
          <button id="toOrderBtn">Quiero pedir</button>
          <button
            id="burguerMenuIcon"
            alt="Menú Navegación"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X
                size={45}
                color="#92a6d8"
              />
            ) : (
              <Menu
                size={45}
                color="#92a6d8"
              />
            )}
          </button>
        </div>
      )}
  
      <MenuBurguer isOpen={isOpen} />
    </header>
  );
}

export default HeaderComponent;
