import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const ChoosePackage = forwardRef(({ options, onGramajeChange, selectedGramaje }, ref) => {
  const [selected, setSelected] = useState(selectedGramaje || "1/4 kg");

  useEffect(() => {
    setSelected(selectedGramaje); 
  }, [selectedGramaje]);

  const handleChange = (newGramaje) => {
    setSelected(newGramaje);
    onGramajeChange(newGramaje);
  };

  useImperativeHandle(ref, () => ({
    resetSelection: () => setSelected("1/4 kg"),
  }));

  return (
    <div className="choosePackageContainer">
      {options.map((option) => (
        <label
          key={option.gramaje}
          className={`packageOption ${selected === option.gramaje ? "selected" : ""}`} 
          onClick={() => handleChange(option.gramaje)}
        >
          <input
            type="checkbox"
            checked={selected === option.gramaje}
            readOnly 
          />
          {option.gramaje}
        </label>
      ))}
    </div>
  );
});

export default ChoosePackage;