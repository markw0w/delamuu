import React from "react";
import { products } from "../../utils/Images.js";
import CarouselComponent from "../CarouselComponent.js";
import IceCreamFormComponent from "../form/IceCreamFormComponent.js";
import { ChevronsDown } from "lucide-react";

function HeladoComponent() {
  const images = [products.Helado1, products.Helado2];

  return (
    <section className="fatherProductContainer">
      <h2>Helado</h2>
      <CarouselComponent images={images} />
      <article
        className="productComponent yogur"
        id="yogur"
      >
        <h3>
          <ChevronsDown size={35} />
          Desliza para comenzar
        </h3>

        <IceCreamFormComponent />
      </article>
    </section>
  );
}

export default HeladoComponent;
