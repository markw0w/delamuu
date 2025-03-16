import React from "react";
import ChoosePackage from "./ChoosePackage";

function FormComponent(){
    // Si los vasos son estandars de todos los productos, 
    // entonces traer crear la conexion y traerlos aquí
    const items = [
        { id: 1, label: "1/4 kg" },
        { id: 2, label: "1/2 kg" },
        { id: 3, label: "1 Kg" },
        { id: 4, label: "2 Kg" },
        { id: 5, label: "3 kg" },
        { id: 6, label: "4 kg" },
    ];
    return(
        <form className="formComponentContainer">
            <h4>1. Elige el envase</h4>

            <ChoosePackage options={items} />
        </form>
    )
}

export default FormComponent;