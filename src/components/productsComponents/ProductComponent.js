import React from "react";
import YogurComponent from './YogurComponent.js'
import HeladoComponent from './HeladoComponent.js'
import AcaiComponent from './AzaiComponent.js'
import CandyComponent from './CandyComponent.js'

function ProductComponent({ activeModal, setActiveModal }){
    return(
        <section className="productComponentContainer">
            {activeModal === "yogur" && <YogurComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "helado" && <HeladoComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "acai" && <AcaiComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "candy" && <CandyComponent onClose={() => setActiveModal("inicio")}/>}
        </section>
    )
}

export default ProductComponent;
