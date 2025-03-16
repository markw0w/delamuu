import React, { useState, forwardRef, useImperativeHandle } from "react";

const ChooseToppings = forwardRef(({ options }, ref) => {
  const [toppings, setToppings] = useState(() => {
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    return storedOrder?.toppings || [];
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

    setToppings(updatedToppings);

    const currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || {};
    currentOrder.toppings = updatedToppings;
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  };

  useImperativeHandle(ref, () => ({
    resetSelection() {
      setToppings([]); 
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
