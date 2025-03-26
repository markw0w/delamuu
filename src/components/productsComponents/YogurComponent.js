import React from "react";
import { products } from "../../utils/Images"; 
import CarouselComponent from "../CarouselComponent";
import FormComponent from "../form/FormComponent";
import { ChevronsDown } from "lucide-react";

function YogurComponent() { 
    const productName = "Yogur"

    const images = [
        products.yogur5,
        products.yogur1,
        products.yogur4,
    ];

    return (
        <section className="productComponent yogur" id="yogur">
            <h2>Yogures</h2>
            <CarouselComponent images={images} />
            <h3>
                <ChevronsDown size={35}/>
                Desliza para comenzar
            </h3>

            <FormComponent product={productName}/>     
        </section>
    );
}

export default YogurComponent;
