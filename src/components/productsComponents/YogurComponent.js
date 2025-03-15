import React from "react";
import { products } from "../../utils/Images"; 
import CarouselComponent from "../CarouselComponent";

function YogurComponent() { 
    const images = [
        products.yogur1,
        products.yogur4,
        products.yogur5,
    ];

    return (
        <section className="productComponent yogur" id="yogur">
            <CarouselComponent images={images} />
            <h2>Yogur Component</h2>
        </section>
    );
}

export default YogurComponent;
