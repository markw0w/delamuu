import React from "react";
import { others } from "../utils/Images.js";

function ProductInfoComponent() {
  return (
    <article className="productInfoComponentContainer">
      <h2>Sabores Únicos</h2>
      <div className="productInfoContent">
        <img
          className="productInfoImg"
          src={others.allProducts}
          alt="Producto de Delamuu de Referencia"
        />
        <p className="productInfoText">
          Desde la intensidad vibrante del açaí amazónico, perfecto para
          comenzar el día con energía, hasta nuestros helados artesanales,
          elaborados con leche de vaca Jersey para lograr una textura
          inigualable y un sabor que conquista. <br />
          <br /> Sumamos yogures cremosos y naturales, pensados para cuidar el
          cuerpo sin resignar placer. Y para los fanáticos del dulce, tenemos
          una colección de candy que despierta sonrisas y antojos sin culpa.{" "}
          <br />
          <br /> Cada producto es una experiencia distinta, pero todos comparten
          lo mismo: frescura, calidad y un toque de felicidad en cada sabor.
        </p>
      </div>
    </article>
  );
}

export default ProductInfoComponent;
