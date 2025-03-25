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

    const handleSelection = (type, itemNombre) => {
      const currentTotal = selectedToppings.length + selectedSauces.length + selectedFruits.length;
      let newTotal = currentTotal;
      let newSelection;

      switch (type) {
        case "topping":
          newSelection = selectedToppings.includes(itemNombre)
            ? selectedToppings.filter(t => t !== itemNombre)
            : [...selectedToppings, itemNombre];
          newTotal = newSelection.length + selectedSauces.length + selectedFruits.length;
          break;
        case "sauce":
          newSelection = selectedSauces.includes(itemNombre)
            ? selectedSauces.filter(s => s !== itemNombre)
            : [...selectedSauces, itemNombre];
          newTotal = selectedToppings.length + newSelection.length + selectedFruits.length;
          break;
        case "fruit":
          newSelection = selectedFruits.includes(itemNombre)
            ? selectedFruits.filter(f => f !== itemNombre)
            : [...selectedFruits, itemNombre];
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
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      checked={selectedToppings.includes(option.nombre)}
                      onChange={() => handleSelection("topping", option.nombre)}
                    />
                    {option.nombre}
                  </label>
                ))}
              </div>

              <div className="categorySection saucesCategory">
                <h4>Salsas</h4>
                {sauceOptions.map((option) => (
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      checked={selectedSauces.includes(option.nombre)}
                      onChange={() => handleSelection("sauce", option.nombre)}
                    />
                    {option.nombre}
                  </label>
                ))}
              </div>

              <div className="categorySection fruitsCategory">
                <h4>Frutas</h4>
                {fruitOptions.map((option) => (
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      checked={selectedFruits.includes(option.nombre)}
                      onChange={() => handleSelection("fruit", option.nombre)}
                    />
                    {option.nombre}
                  </label>
                ))}
              </div>

              <div className="selectionCounter">
                Selecciones: {selectedToppings.length + selectedSauces.length + selectedFruits.length}/{maxSelections}
              </div>

              <button
                className="saveBtn"
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
