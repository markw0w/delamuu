import React from "react";

function AlertComponent({message}){
    return(
        <div className="alertContainer">
            <span>{message}</span>
        </div>
    )
}

export default AlertComponent;