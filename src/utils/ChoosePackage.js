import React, { useState, forwardRef, useImperativeHandle } from "react";

const ChoosePackage = forwardRef(({ options }, ref) => {
  const [gramaje, setGramaje] = useState(() => {
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    return storedOrder?.gramaje || "";
  });

  const handleChange = (selectedGramaje) => {
    setGramaje(selectedGramaje);

    const currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || {};
    currentOrder.gramaje = selectedGramaje;
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  };

  // Define una función para reiniciar el estado desde el padre
  useImperativeHandle(ref, () => ({
    resetSelection() {
      setGramaje(""); // Reinicia el estado local
      const currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || {};
      delete currentOrder.gramaje; // Elimina el gramaje del currentOrder
      localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    },
  }));

  return (
    <div className="choosePackageContainer">
      <h3>Elige Gramaje</h3>
      {options.map((option) => (
        <label
          key={option.gramaje}
          htmlFor={option.gramaje}
          className={`packageOption ${
            gramaje === option.gramaje ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            id={option.gramaje}
            name="radioGroup"
            value={option.gramaje}
            checked={gramaje === option.gramaje}
            onChange={() => handleChange(option.gramaje)}
          />
          <span>{option.gramaje}</span>
        </label>
      ))}
    </div>
  );
});

export default ChoosePackage;
