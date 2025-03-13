import React from "react";
import { Link } from "react-router-dom";
import { products, effects } from "../utils/Images";

function HomeView() {
    return (
        <section className="fatherContainer">
            <section className="presentationContainer">
                <h1>Heladería y yogures en Junín, Bs. As.</h1>
                <img className="principalIceCream" src={products.heladoPrincipal} alt="Helado Principal" />

                {/* EFECTOS FONDO */}
                <img className="backgroundEffect backgroundEffect-1" src={effects.arandanos} alt="Frutilla y/o arándano flotando"/>
                <img className="backgroundEffect backgroundEffect-2" src={effects.arandanos} alt="Frutilla y/o arándano flotando"/>
                <img className="backgroundEffect backgroundEffect-3" src={effects.arandanos} alt="Frutilla y/o arándano flotando"/>
                <img className="backgroundEffect backgroundEffect-4" src={effects.strawberries} alt="Frutilla y/o arándano flotando"/>
                <img className="backgroundEffect backgroundEffect-5" src={effects.strawberries} alt="Frutilla y/o arándano flotando"/>
                <img className="backgroundEffect backgroundEffect-6" src={effects.strawberries} alt="Frutilla y/o arándano flotando"/>
            </section>

            <section className="productContainer">
                <h2>Yogur</h2>
                <img className="principalIceCream" src={products.yogur5} alt="Helado Principal" />
                <Link className="productLink" to="/order/yogur">
                    <button>Quiero pedir</button>
                </Link>
            </section>

            <section className="productContainer">
                <h2>Helado</h2>
                <img className="principalIceCream" src={products.yogur4} alt="Helado Principal" />
                <Link className="productLink" to="/order/helado">
                    <button>Quiero pedir</button>
                </Link>
            </section>

            <section className="productContainer">
                <h2>Azair</h2>
                <img className="principalIceCream" src={products.yogur1} alt="Helado Principal" />
                <Link className="productLink" to="/order/azair">
                    <button>Quiero pedir</button>
                </Link>
            </section>

            <section className="productContainer">
                <h2>Helado combinado</h2>
                <img className="principalIceCream" src={products.yogur6} alt="Helado Principal" />
                <Link className="productLink" to="/order/helado-combinado">
                    <button>Quiero pedir</button>
                </Link>
            </section>
        </section>
    );
}

export default HomeView;
