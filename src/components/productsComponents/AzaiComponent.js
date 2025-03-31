import React from "react";
import { products } from "../../utils/Images.js"; 
import CarouselComponent from "../CarouselComponent.js";
import FormComponent from "../form/FormComponent.js";
import { ChevronsDown } from "lucide-react";

function AcaiComponent() { 
    const productName = "Acai"

    const images = [
        products.acai1,
        products.acai2,
        products.acaiBowl,
        products.acai3,
        products.acai4,
        products.acai5,
        products.acai6,
        products.acai7,
    ];

    return (
        <section className="fatherProductContainer">
            <h2>Açaí</h2>
            <CarouselComponent images={images} />

            <article className="productComponent yogur" id="acai">
            
            <h3>
                <ChevronsDown size={35}/>
                Desliza para comenzar
            </h3>

            <FormComponent product={productName} />     
        </article>
        </section>
    );
}

export default AcaiComponent;