import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const ChoosePackage = forwardRef(({ options, onGramajeChange, onPriceChange, selectedGramaje, selectedPrice, packagePrices }, ref) => {
  const [selected, setSelected] = useState(selectedGramaje || "1/4 kg");
  const [priceSelected, setSelectedPrice] = useState(selectedPrice || packagePrices?.[0]?.price || "N/A");

  useEffect(() => {
    const foundPrice = packagePrices?.find(pkg => pkg.gramaje === selectedGramaje)?.price || packagePrices?.[0]?.price || "N/A";

    setSelected(selectedGramaje || "1/4 kg");
    setSelectedPrice(foundPrice);
  }, [selectedGramaje, packagePrices]);

  const handleChange = (newGramaje) => {
    setSelected(newGramaje);

    const foundPackage = packagePrices?.find(pkg => pkg.gramaje === selectedGramaje);
    const newPrice = foundPackage ? foundPackage.price : "N/A";
  
    setSelectedPrice(newPrice);
    onGramajeChange(newGramaje);
    onPriceChange(newPrice);
  };

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      setSelected("1/4 kg");
      setSelectedPrice(packagePrices?.[0]?.price || "N/A");
    }
  }));

  return (
    <article className="choosePackageContainer">
      {options.map((option, index) => {
        const currentPrice = packagePrices?.find(pkg => pkg.gramaje === option.gramaje)?.price || "N/A";

        return (
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
            <span className="packagePrice">${currentPrice}</span>
          </label>
        );
      })};
    </article>
  );
});

export default ChoosePackage;