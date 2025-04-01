import React from "react";
import YogurComponent from './YogurComponent.js'
import HeladoComponent from './HeladoComponent.js'
import AcaiComponent from './AzaiComponent.js'
import CandyComponent from './CandyComponent.js'
import { logos } from "../../utils/Images.js";

function ProductComponent({ activeModal, setActiveModal }){
    return(
        <section className="productComponentContainer">
            {activeModal === "yogur" && <YogurComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "helado" && <HeladoComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "acai" && <AcaiComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "candy" && <CandyComponent onClose={() => setActiveModal("inicio")}/>}
            
            <img className="backgroundEffect fx1" src={logos.shortLight} alt="Logo de Delamuu - Carita"/>
            <img className="backgroundEffect fx2" src={logos.shortLight} alt="Logo de Delamuu - Carita"/>
            <img className="backgroundEffect fx3" src={logos.shortLight} alt="Logo de Delamuu - Carita"/>
            <img className="backgroundEffect fx4" src={logos.shortLight} alt="Logo de Delamuu - Carita"/>
            <img className="backgroundEffect fx5" src={logos.shortLight} alt="Logo de Delamuu - Carita"/>
            <img className="backgroundEffect fx6" src={logos.shortLight} alt="Logo de Delamuu - Carita"/>
        </section>
    )
}

export default ProductComponent;
