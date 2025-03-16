import React, { useState, forwardRef, useImperativeHandle } from "react";

const ChooseToppings = forwardRef(({ options }, ref) => {
  const [toppings, setToppings] = useState(() => {
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    
    // Si no hay toppings guardados en el localStorage, asignamos el primero
    if (storedOrder?.toppings && storedOrder.toppings.length > 0) {
      return storedOrder.toppings;
    } else {
      // Si no hay toppings en localStorage, asignamos el primer topping
      const defaultTopping = options[0].topping;
      const currentOrder = storedOrder || {};
      currentOrder.toppings = [defaultTopping]; // Guardamos el topping predeterminado en el localStorage
      localStorage.setItem("currentOrder", JSON.stringify(currentOrder)); // Guardamos el cambio
      return [defaultTopping]; // Retornamos el topping predeterminado
    }
  });

  const handleChange = (topping) => {
    let updatedToppings = [...toppings];

    if (updatedToppings.includes(topping)) {
      updatedToppings = updatedToppings.filter((item) => item !== topping);
    } else if (updatedToppings.length < 5) {
      updatedToppings.push(topping);
    } else {
      alert("Puedes seleccionar un máximo de 5 toppings.");
      return;
    }

    // Asegurarnos de que siempre haya al menos un topping seleccionado
    if (updatedToppings.length === 0) {
      updatedToppings.push(options[0].topping); // Si no hay toppings, seleccionamos el primero
    }

    setToppings(updatedToppings);

    const currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || {};
    currentOrder.toppings = updatedToppings;
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  };

  useImperativeHandle(ref, () => ({
    resetSelection() {
      setToppings([options[0].topping]); 
      const currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || {};
      delete currentOrder.toppings; 
      localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    },
  }));

  return (
    <div className="chooseToppingsContainer">
      {options.map((option) => (
        <label
          key={option.topping}
          htmlFor={option.topping}
          className={`toppingOption ${
            toppings.includes(option.topping) ? "selected" : ""
          }`}
        >
          <input
            type="checkbox"
            id={option.topping}
            value={option.topping}
            checked={toppings.includes(option.topping)}
            onChange={() => handleChange(option.topping)}
          />
          <span>{option.topping}</span>
        </label>
      ))}
    </div>
  );
});

export default ChooseToppings;
