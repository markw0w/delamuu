import React from "react";
import { Link } from "react-router-dom";
import { products } from "../utils/Images.js";

function WantOrderModal( {modalOpen} ) {
  return (
    <section className={`fatherWantOrderContainer ${modalOpen ? "openModal" : "closeModal"}`}> 
      <article className="productContainer">
        <h2>Yogures</h2>
        <img
          className="principalIceCream"
          src={products.yogur2}
          alt="Producto: Yogur"
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
        />
        <Link
          className="productLink"
          to="/order/candy"
        >
          <button>Quiero pedir</button>
        </Link>
      </article>
    </section>
  );
}

export default WantOrderModal;
