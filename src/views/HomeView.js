import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { products, logos } from "../utils/Images";

function HomeView() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="fatherContainer">
            <section className="presentationContainer">
                <h1>Heladería y yogures en Junín, Bs. As.</h1>
                <img className="principalIceCream" src={products.heladoPrincipal} alt="Helado Principal" />

                {/* EFECTOS FONDO */}
                <img
                className="backgroundEffect backgroundEffect-1"
                src={logos.shortDark}
                alt="Logo Delamuu"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />

            <img
                className="backgroundEffect backgroundEffect-6"
                src={logos.shortDark}
                alt="Logo Delamuu"
                style={{ transform: `translateY(-${scrollY * 0.7}px)` }}
            />
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
