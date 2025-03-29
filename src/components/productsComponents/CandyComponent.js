import React from "react";
import { products } from "../../utils/Images";
import CarouselComponent from "../CarouselComponent";
import FormComponent from "../form/FormComponent";
import { ChevronsDown } from "lucide-react";

function CandyComponent() {
  const productName = "Candy";

  const images = [products.Candy1, products.Candy2];

  return (
    <section className="fatherProductContainer">
      <h2>Candy</h2>
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

export default CandyComponent;
