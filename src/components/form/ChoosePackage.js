import React, { useState } from "react";

const ChoosePackage = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOption") || ""
  );

  const handleChange = (id) => {
    setSelectedOption(id);
    localStorage.setItem("selectedOption", id); // Guarda en localStorage
  };

  return (
    <div className="choosePackageContainer">
      {options.map((option) => (
        <label
          key={option.id}
          htmlFor={option.id}
          className={`packageOption ${
            selectedOption === option.id ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            id={option.id}
            name="radioGroup"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => handleChange(option.id)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default ChoosePackage;

