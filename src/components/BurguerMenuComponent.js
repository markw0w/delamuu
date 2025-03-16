import React from "react";
import { logos } from "../utils/Images";

function MenuBurguer({ isOpen }){
    return(
        <section className={`base-burguerMenuContainer ${isOpen ? "open" : "close"}`}>
                <ul>
                    <li>Inicio</li>
                    <li>Nosotros</li>
                    <li>Hacer pedido</li>
                    <img src={logos.shortDark} alt="Logo Delamuu"/>
                </ul>
                <span>Web creada por Marcos Escandar</span>
        </section>
    )
}

export default MenuBurguer;