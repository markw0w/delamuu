import React from "react";
import { logos, socialMedia } from "../utils/Images";
//import { Link } from 'react-router-dom';

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
                        <img src={socialMedia.ig} alt="Instagram Logo"/>
                    </li>
                    <li>
                        <img src={socialMedia.fb} alt="Facebook Logo"/>
                    </li>
                    <li>
                        <img src={socialMedia.wp} alt="Whatsapp Logo"/>
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