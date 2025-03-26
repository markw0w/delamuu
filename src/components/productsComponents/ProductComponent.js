import React from "react";
import YogurComponent from './YogurComponent'
import HeladoComponent from './HeladoComponent'
import AzaiComponent from './AzaiComponent'
import CandyComponent from './CandyComponent'

function ProductComponent({ activeModal, setActiveModal }){
    return(
        <section className="productComponentContainer">
            {activeModal === "yogur" && <YogurComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "helado" && <HeladoComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "azai" && <AzaiComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "candy" && <CandyComponent onClose={() => setActiveModal("inicio")}/>}
        </section>
    )
}

export default ProductComponent;
