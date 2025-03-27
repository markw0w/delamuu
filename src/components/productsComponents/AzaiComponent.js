import React from "react";
import { products } from "../../utils/Images"; 
import CarouselComponent from "../CarouselComponent";
import FormComponent from "../form/FormComponent";
import { ChevronsDown } from "lucide-react";

function AcaiComponent() { 
    const productName = "Acai"

    const images = [
        products.acai,
        products.acai2,
        products.acai1,
    ];

    return (
        <section className="productComponent yogur" id="acai">
            <h2>Açaí</h2>
            <CarouselComponent images={images} />
            <h3>
                <ChevronsDown size={35}/>
                Desliza para comenzar
            </h3>

            <FormComponent product={productName} />     
        </section>
    );
}

export default AcaiComponent;