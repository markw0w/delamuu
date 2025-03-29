import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Check } from "lucide-react";
import AlertComponent from "../components/alerts/AlertComponent";

const CreateProduct = forwardRef(
  (
    {
      toppingOptions,
      sauceOptions,
      fruitOptions,
      flavorOptions,
      maxSelections,
      currentToppings,
      currentSauces,
      currentFruits,
      currentFlavors,
      onSave,
      isIcreCream,
    },
    ref
  ) => {
    const [selectedFlavors, setSelectedFlavors] = useState(
      currentFlavors || []
    );
    const [selectedToppings, setSelectedToppings] = useState(
      currentToppings || []
    );
    const [selectedSauces, setSelectedSauces] = useState(currentSauces || []);
    const [selectedFruits, setSelectedFruits] = useState(currentFruits || []);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    const showAlertMessage = (msg, type = "success") => {
      setMessage({ text: msg, type });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };

    const handleFlavorSelection = (itemNombre) => {
      const newSelection = selectedFlavors.includes(itemNombre)
        ? selectedFlavors.filter((f) => f !== itemNombre)
        : [...selectedFlavors, itemNombre];

      if (newSelection.length > maxSelections) {
        showAlertMessage(
          `Máximo permitido: ${maxSelections} selecciones`,
          "error"
        );
        return;
      }
      setSelectedFlavors(newSelection);
    };

    const handleSelection = (type, itemNombre) => {
      let newSelection;
      let currentTotal =
        selectedToppings.length + selectedSauces.length + selectedFruits.length;

      switch (type) {
        case "topping":
          newSelection = selectedToppings.includes(itemNombre)
            ? selectedToppings.filter((t) => t !== itemNombre)
            : [...selectedToppings, itemNombre];
          currentTotal =
            newSelection.length + selectedSauces.length + selectedFruits.length;
          if (currentTotal > maxSelections) {
            showAlertMessage(
              `Máximo permitido: ${maxSelections} selecciones`,
              "error"
            );
            return;
          }
          setSelectedToppings(newSelection);
          break;
        case "sauce":
          newSelection = selectedSauces.includes(itemNombre)
            ? selectedSauces.filter((s) => s !== itemNombre)
            : [...selectedSauces, itemNombre];
          currentTotal =
            selectedToppings.length +
            newSelection.length +
            selectedFruits.length;
          if (currentTotal > maxSelections) {
            showAlertMessage(
              `Máximo permitido: ${maxSelections} selecciones`,
              "error"
            );
            return;
          }
          setSelectedSauces(newSelection);
          break;
        case "fruit":
          newSelection = selectedFruits.includes(itemNombre)
            ? selectedFruits.filter((f) => f !== itemNombre)
            : [...selectedFruits, itemNombre];
          currentTotal =
            selectedToppings.length +
            selectedSauces.length +
            newSelection.length;
          if (currentTotal > maxSelections) {
            showAlertMessage(
              `Máximo permitido: ${maxSelections} selecciones`,
              "error"
            );
            return;
          }
          setSelectedFruits(newSelection);
          break;
        default:
          return;
      }
    };

    useImperativeHandle(ref, () => ({
      resetSelection: () => {
        setSelectedFlavors([]);
        setSelectedToppings([]);
        setSelectedSauces([]);
        setSelectedFruits([]);
      },
    }));

    return (
      <section className="optionsContainer">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`openOptions ${
            (isIcreCream === "1"
              ? selectedFlavors.length
              : selectedToppings.length +
                selectedSauces.length +
                selectedFruits.length) > 0
              ? "selected"
              : ""
          }`}
        >
          {(isIcreCream === "1"
            ? selectedFlavors.length
            : selectedToppings.length +
              selectedSauces.length +
              selectedFruits.length) > 0 ? (
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

              {isIcreCream === "1" ? (
                <div className="categorySection flavorsCategory">
                  <h4>Sabores</h4>
                  {flavorOptions.map((option) => (
                    <label key={option.id}>
                      <input
                        type="checkbox"
                        checked={selectedFlavors.includes(option.nombre)}
                        onChange={() => handleFlavorSelection(option.nombre)}
                      />
                      {option.nombre}
                    </label>
                  ))}
                </div>
              ) : (
                <>
                  <div className="categorySection toppingsCategory">
                    <h4>Toppings</h4>
                    {toppingOptions.map((option) => (
                      <label key={option.id}>
                        <input
                          type="checkbox"
                          checked={selectedToppings.includes(option.nombre)}
                          onChange={() =>
                            handleSelection("topping", option.nombre)
                          }
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
                          onChange={() =>
                            handleSelection("sauce", option.nombre)
                          }
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
                          onChange={() =>
                            handleSelection("fruit", option.nombre)
                          }
                        />
                        {option.nombre}
                      </label>
                    ))}
                  </div>
                </>
              )}

              <div className="selectionCounter">
                Selecciones:{" "}
                {isIcreCream === "1"
                  ? selectedFlavors.length
                  : selectedToppings.length +
                    selectedSauces.length +
                    selectedFruits.length}
                /{maxSelections}
              </div>

              <button
                className="saveBtn"
                type="button"
                onClick={() => {
                  if (isIcreCream === "1") {
                    onSave([], [], [], selectedFlavors);
                  } else {
                    onSave(selectedToppings, selectedSauces, selectedFruits);
                  }
                  setIsOpen(false);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        )}
        {showAlert && <AlertComponent message={message} />}
      </section>
    );
  }
);

export default CreateProduct;
