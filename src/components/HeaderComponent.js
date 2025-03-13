import React from "react";
import { logos, uiIcons } from "../utils/Images";
import { Link } from 'react-router-dom';

function HeaderComponent(){
    return(
        <header className="header">
            <Link className="navLinks" to="/">
                <img src={logos.shortDark} alt="Logo/Inicio de Delamuu"/>
            </Link>

            <div className="rightNavContainer">
                <button id="toOrderBtn">Quiero pedir</button>
                <img id="burguerMenuIcon" src={uiIcons.burguerMenuIcon} alt="Menú Navegación"/>
            </div>
        </header>
    )
}

export default HeaderComponent;