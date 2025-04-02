import React from "react";
import { logos } from "../utils/Images.js";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function FooterComponent() {
  return (
    <footer>
      <div className="topFooterContainer">
        <ul></ul>
        <img
          src={logos.logoLogTrans}
          alt="Logo Cuadrado Delamuu"
        />
        <ul className="socialMedia">
          <li>
            <Link
              className="socialLink"
              to="https://www.facebook.com/profile.php?id=61569838131209"
            >
              <Facebook
                size={30}
                color="white"
              />
            </Link>
          </li>
          <li>
            <Link
              className="socialLink"
              to="https://www.instagram.com/delamuuok/"
            >
              <Instagram
                size={30}
                color="white"
              />
            </Link>
          </li>
          <li>
            <Link
              className="socialLink"
              to="https://api.whatsapp.com/send?phone=+5492364512745&text=%C2%A1Hola!,%20vi%20su%20sitio%20web%20y%20quiero%20contactarlos"
            >
              <MessageCircle
                size={30}
                color="white"
              />
            </Link>
          </li>
        </ul>
      </div>

      <span>
        Web creada por{" "}
        <Link
          className="socialLink"
          to="https://www.linkedin.com/in/marcos-damian-escandar-6b5a57196/"
        >
          Marcos Escandar
        </Link>{" "}
        &{" "}
        <Link
          className="socialLink"
          to="https://www.linkedin.com/in/estanislaosprevite/"
        >
          Estanis Salinas
        </Link>
      </span>
    </footer>
  );
}

export default FooterComponent;
