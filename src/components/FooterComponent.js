import React from "react";
import { logos } from "../utils/Images";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

function FooterComponent(){
    return(
        <footer>
            <div className="topFooterContainer">
                <ul>
                    <li>Inicio</li>
                    <li>Nosotros</li>
                    <li>Quiero pedir</li>
                </ul>
                <img src={logos.logoLogTrans} alt="Logo Cuadrado Delamuu"/>
                <ul className="socialMedia">
                    <li>
                        <Facebook size={30}/>
                    </li>
                    <li>
                        <Instagram size={30}/>
                    </li>
                    <li>
                        <MessageCircle size={30}/>
                    </li>
                </ul>
            </div>

            <span>
                Web Desarrollada por Marcos Escandar
            </span>
        </footer>
    )
}

export default FooterComponent;