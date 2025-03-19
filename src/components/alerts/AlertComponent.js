import React from "react";

const AlertComponent = ({ message }) => {
  if (!message) return null;

  const alertStyle =
    message.type === "error"
      ? { backgroundColor: "#ff9d9d", color: "black" } 
      : { backgroundColor: "#bcff9d", color: "black" }; 

  return (
    <div className="alertContainer" style={{ ...alertStyle}}>
      {message.text}
    </div>
  );
};

export default AlertComponent;