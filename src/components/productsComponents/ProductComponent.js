import React from "react";
import YogurComponent from './YogurComponent'
import HeladoComponent from './HeladoComponent'
import AzairComponent from './AzairComponent'
import HeladoCombinadoComponent from './HeladoCombinadoComponent'

function ProductComponent({ activeModal, setActiveModal }){
    return(
        <section>
            {activeModal === "yogur" && <YogurComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "helado" && <HeladoComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "azair" && <AzairComponent onClose={() => setActiveModal("inicio")}/>}
            {activeModal === "helado-combinado" && <HeladoCombinadoComponent onClose={() => setActiveModal("inicio")}/>}
        </section>
    )
}

export default ProductComponent;
