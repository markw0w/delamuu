import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const ChoosePackage = forwardRef(
  ({ options, onGramajeChange, onPriceChange, selectedGramaje, selectedPrice, packagePrices, product }, ref) => {
    const [selected, setSelected] = useState(selectedGramaje || "1/4 kg");
    const [priceSelected, setSelectedPrice] = useState(selectedPrice || "N/A");
        
    useEffect(() => {
      const foundPrice =
        packagePrices
          ?.filter(pkg => pkg.productoNombre === product) 
          .find((pkg) => pkg.envaseNombre === selectedGramaje)?.precio ||
        (packagePrices
          ?.filter(pkg => pkg.productoNombre === product)[0]?.precio) ||
        "N/A";
      setSelected(selectedGramaje || "1/4 kg");
      setSelectedPrice(foundPrice);
    }, [selectedGramaje, packagePrices, product]);

    const handleChange = (newGramaje) => {
      if ((product === "Candy" || product === "Yogurt") && newGramaje === "3/4 kg") {
        return;
      }
      setSelected(newGramaje);
      const foundPackage = packagePrices
        ?.filter(pkg => pkg.productoNombre === product)
        .find((pkg) => pkg.envaseNombre === newGramaje);
      const newPrice = foundPackage ? foundPackage.precio : "N/A";
      setSelectedPrice(newPrice);
      onGramajeChange(newGramaje, newPrice);
      onPriceChange(newPrice);
    };

    useImperativeHandle(ref, () => ({
      resetSelection: () => {
        setSelected("1/4 kg");
        setSelectedPrice(
          packagePrices?.filter(pkg => pkg.productoNombre === product)[0]?.precio || "N/A"
        );
      },
    }));

    return (
      <article className="choosePackageContainer">
        {options.map((option, index) => {
          const currentPrice =
            packagePrices
              ?.filter(pkg => pkg.productoNombre === product)
              .find((pkg) => pkg.envaseNombre === option.nombre)?.precio || "N/A";
          
          const isDisabled = (product === "Candy" || product === "Yogur") && option.nombre === "3/4 kg";
          
          return (
            <label
              key={`${option.nombre}-${index}`}
              className={`packageOption ${selected === option.nombre ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
              onClick={() => { if (!isDisabled) handleChange(option.nombre); }}
            >
              <input
                type="checkbox"
                disabled={isDisabled}
                checked={selected === option.nombre}
                readOnly
              />
              {option.nombre}
              <span className="packagePrice">${currentPrice}</span>
            </label>
          );
        })}
      </article>
    );
  }
);

export default ChoosePackage;