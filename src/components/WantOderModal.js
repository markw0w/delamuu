import React from "react";
import { Link } from "react-router-dom";
import { products } from "../utils/Images";

function WantOrderModal( {modalOpen} ) {
  return (
    <section className={`fatherWantOrderContainer ${modalOpen ? "openModal" : "closeModal"}`}> 
      <article className="productContainer">
        <h2>Yogures</h2>
        <img
          className="principalIceCream"
          src={products.yogur5}
          alt="Helado Principal"
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
          src={products.yogur4}
          alt="Helado Principal"
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
          src={products.yogur1}
          alt="Helado Principal"
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
          src={products.yogur6}
          alt="Helado Principal"
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
