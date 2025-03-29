import React from "react";
import { products } from "../../utils/Images";
import CarouselComponent from "../CarouselComponent";
import FormComponent from "../form/FormComponent";
import { ChevronsDown } from "lucide-react";

function YogurComponent() {
  const productName = "Yogur";

  const images = [
    products.yogur1,
    products.yogur2,
    products.yogur4,
    products.yogur5,
    products.yogur6,
    products.yogurStrawberries,
    products.handYogur,
  ];

  return (
    <section className="fatherProductContainer">
      <h2>Yogures</h2>
      <CarouselComponent images={images} />

      <article
        className="productComponent yogur"
        id="yogur"
      >
        <h3>
          <ChevronsDown size={35} />
          Desliza para comenzar
        </h3>

        <FormComponent product={productName} />
      </article>
    </section>
  );
}

export default YogurComponent;
