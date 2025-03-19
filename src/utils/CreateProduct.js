import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Check } from "lucide-react";

const CreateProduct = forwardRef(
  (
    {
      toppingOptions,
      sauceOptions,
      fruitOptions,
      maxSelections,
      currentToppings,
      currentSauces,
      currentFruits,
      onSave,
    },
    ref
  ) => {
    const [selectedToppings, setSelectedToppings] = useState(currentToppings || []);
    const [selectedSauces, setSelectedSauces] = useState(currentSauces || []);
    const [selectedFruits, setSelectedFruits] = useState(currentFruits || []);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelection = (type, item) => {
      const currentTotal = selectedToppings.length + selectedSauces.length + selectedFruits.length;
      let newTotal = currentTotal;
      let newSelection;

      switch (type) {
        case "topping":
          newSelection = selectedToppings.includes(item)
            ? selectedToppings.filter(t => t !== item)
            : [...selectedToppings, item];
          newTotal = newSelection.length + selectedSauces.length + selectedFruits.length;
          break;
        case "sauce":
          newSelection = selectedSauces.includes(item)
            ? selectedSauces.filter(s => s !== item)
            : [...selectedSauces, item];
          newTotal = selectedToppings.length + newSelection.length + selectedFruits.length;
          break;
        case "fruit":
          newSelection = selectedFruits.includes(item)
            ? selectedFruits.filter(f => f !== item)
            : [...selectedFruits, item];
          newTotal = selectedToppings.length + selectedSauces.length + newSelection.length;
          break;
        default:
          return;
      }

      if (newTotal > maxSelections) {
        alert(`Máximo permitido: ${maxSelections} selecciones`);
        return;
      }

      switch (type) {
        case "topping":
          setSelectedToppings(newSelection);
          break;
        case "sauce":
          setSelectedSauces(newSelection);
          break;
        case "fruit":
          setSelectedFruits(newSelection);
          break;
        default:
          setSelectedToppings(newSelection);
      }
    };

    useImperativeHandle(ref, () => ({
      resetSelection: () => {
        setSelectedToppings([]);
        setSelectedSauces([]);
        setSelectedFruits([]);
      }
    }));

    return (
      <section className="optionsContainer">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`openOptions ${
            (selectedToppings.length + selectedSauces.length + selectedFruits.length) > 0 ? "selected" : ""
          }`}
        >
          {(selectedToppings.length + selectedSauces.length + selectedFruits.length) > 0 ? (
            <>
              <Check className="icon" /> Armado
            </>
          ) : (
            "Empezar a armarlo"
          )}
        </button>

        {isOpen && (
          <div className="optionsModal">
            <div className="optionsContent">
              <h4>Selecciona hasta {maxSelections} opciones en total</h4>
              
              <div className="categorySection toppingsCategory">
                <h4>Toppings</h4>
                {toppingOptions.map((option) => (
                  <label key={option.topping}>
                    <input
                      type="checkbox"
                      checked={selectedToppings.includes(option.topping)}
                      onChange={() => handleSelection("topping", option.topping)}
                    />
                    {option.topping}
                  </label>
                ))}
              </div>

              <div className="categorySection saucesCategory">
                <h4>Salsas</h4>
                {sauceOptions.map((option) => (
                  <label key={option.sauce}>
                    <input
                      type="checkbox"
                      checked={selectedSauces.includes(option.sauce)}
                      onChange={() => handleSelection("sauce", option.sauce)}
                    />
                    {option.sauce}
                  </label>
                ))}
              </div>

              <div className="categorySection fruitsCategory">
                <h4>Frutas</h4>
                {fruitOptions.map((option) => (
                  <label key={option.fruit}>
                    <input
                      type="checkbox"
                      checked={selectedFruits.includes(option.fruit)}
                      onChange={() => handleSelection("fruit", option.fruit)}
                    />
                    {option.fruit}
                  </label>
                ))}
              </div>

              <div className="selectionCounter">
                Selecciones: {selectedToppings.length + selectedSauces.length + selectedFruits.length}/{maxSelections}
              </div>

              <button
                type="button"
                onClick={() => {
                  onSave(selectedToppings, selectedSauces, selectedFruits);
                  setIsOpen(false);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
);

export default CreateProduct;
