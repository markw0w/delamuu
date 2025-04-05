import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products, logos, effects, local } from "../utils/Images.js";
import AboutUsComponent from "../components/AboutUsComponent.js";
import CarouselComponent from "../components/CarouselComponent.js";
import ContactComponent from "../components/ContactComponent.js";
import ProductInfoComponent from "../components/ProductInfoComponent.js";
import '../styles/home.css'
import '../styles/cart.css'

function HomeView() {
  const [scrollY, setScrollY] = useState(0);

  const images = [
    products.handYogur,
    products.acai1,
    products.yogur1,
    products.yogur2,
    products.Helado1,
    products.Candy2,
    products.Candy1,
    products.Helado2,
    products.acaiBowl,
    products.yogurStrawberries,
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="fatherContainer">
      <section className="introductionContainer">
        <img className="introductionBgImage" src={local.local1} alt="Local Delamuu en funcionamiento" loading="eager"/>
        <h1>
          Helados artesanales, yogures, açaí (azaí) y helados combinados en
          Junín, Buenos Aires
        </h1>
        <h2>
          <img
            src={logos.shortDark}
            alt="Logo marca Delamuu"
          />
          delamuu
        </h2>
      </section>

      <section className="presentationContainer">
        <img
          className="animatedImg animatedImg1"
          src={effects.yogur}
          alt="Imagen de Yogur"
          loading="lazy"
        />
        <img
          className="animatedImg animatedImg3"
          src={effects.azai}
          alt="Imagen de Azaí en Bowl"
          loading="lazy"
        />

        <article className="informationContainer">
          <div className="titleInformation">
            <h2>
              Helados, yogures, candy y açaí <br></br> Sabores artesanales
              únicos e irresistibles.
            </h2>
          </div>
          <div className="cardsContainer">
            <div>
              <span>+30</span>
              <span>Toppings</span>
            </div>
            <div>
              <span>+20</span>
              <span>Salsas</span>
            </div>
            <div>
              <span>+45</span>
              <span>Gustos</span>
            </div>
          </div>
        </article>

        <ProductInfoComponent/>
        
        <div className="allProductsContainer">
          <article className="productContainer">
            <h2>Yogures</h2>
            <img
              className="principalIceCream"
              src={products.yogur2}
              alt="Producto: Yogur"
              loading="lazy"
            />
            <Link
              className="productLink"
              to="/order/yogur"
            >
              <button>Quiero pedir</button>
            </Link>
          </article>

          <article className="productContainer">
            <h2>Helados Artesanales</h2>
            <img
              className="principalIceCream"
              src={products.Helado1}
              alt="Producto: Helado artesanal"
              loading="lazy"
            />
            <Link
              className="productLink"
              to="/order/helado"
            >
              <button>Quiero pedir</button>
            </Link>
          </article>

          <article className="productContainer">
            <h2>Açaí</h2>
            <img
              className="principalIceCream"
              src={products.acai1}
              alt="Producto: Azaí"
              loading="lazy"
            />
            <Link
              className="productLink"
              to="/order/acai"
            >
              <button>Quiero pedir</button>
            </Link>
          </article>

          <article className="productContainer">
            <h2>Candy</h2>
            <img
              className="principalIceCream"
              src={products.Candy2}
              alt="Producto: Candy"
              loading="lazy"
            />
            <Link
              className="productLink"
              to="/order/candy"
            >
              <button>Quiero pedir</button>
            </Link>
          </article>
        </div>

        <img
          className="backgroundEffect backgroundEffect-1"
          src={logos.shortDark}
          alt="Logo Delamuu"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          loading="lazy"
        />

        <img
          className="backgroundEffect backgroundEffect-6"
          src={logos.shortDark}
          alt="Logo Delamuu"
          style={{ transform: `translateY(-${scrollY * 0.7}px)` }}
          loading="lazy"
        />
      </section>
      <div className="degradeBackgroundContainer">
        <CarouselComponent images={images} />
        <AboutUsComponent/>
        <ContactComponent />
      </div>
    </section>
  );
}

export default HomeView;
