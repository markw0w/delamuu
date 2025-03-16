import React, { useRef } from "react";
import ChoosePackage from "../../utils/ChoosePackage";
import ChooseToppings from "../../utils/ChooseToppings";

function FormComponent() {
  const GramajeOptions = [
    { gramaje: "1/4 kg" },
    { gramaje: "1/2 kg" },
    { gramaje: "3/4 kg" },
    { gramaje: "1 kg" },
  ];

  const ToppingOptions = [
    { topping: "Nueces" },
    { topping: "Maní Crocante" },
    { topping: "Marroc" },
    { topping: "Oreo" },
    { topping: "Almendra" },
  ];

  // Refs para acceder a funciones en los componentes hijos
  const packageRef = useRef(null);
  const toppingsRef = useRef(null);

  const handleAddOrder = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = JSON.parse(localStorage.getItem("currentOrder"));
    
    if (newOrder && newOrder.gramaje) {
      storedOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(storedOrders));
      localStorage.removeItem("currentOrder");
      alert("Pedido agregado exitosamente.");

      // Reinicia el estado en los componentes hijos
      if (packageRef.current) packageRef.current.resetSelection();
      if (toppingsRef.current) toppingsRef.current.resetSelection();
    } else {
      alert("Por favor, completa todos los campos antes de agregar el pedido.");
    }
  };

  return (
    <form className="formComponentContainer">
      <h4>1. Elige el envase</h4>
      <ChoosePackage ref={packageRef} options={GramajeOptions} />

      <h4>2. Elige tus toppings</h4>
      <ChooseToppings ref={toppingsRef} options={ToppingOptions} />

      <button type="button" onClick={handleAddOrder}>
        Agregar Pedido
      </button>
    </form>
  );
}

export default FormComponent;