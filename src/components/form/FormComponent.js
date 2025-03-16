import React, { useRef, useState, useEffect } from "react";
import { useCart } from "../../utils/CartContext"; 
import ChoosePackage from "../../utils/ChoosePackage";
import ChooseToppings from "../../utils/ChooseToppings";
import AlertComponent from "../alerts/AlertComponent";

function FormComponent() {
  const { addOrder } = useCart(); 
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(""); 

  const [currentOrder, setCurrentOrder] = useState(() => {
    // Obtener currentOrder desde localStorage o usar valores predeterminados
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    return storedOrder || {
      toppings: ["Nueces"], // Topping predeterminado
    };
  });

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

  // Función para mostrar la alerta con un mensaje
  const showAlertMessage = (msg) => {
    setMessage(msg); 
    setShowAlert(true); 

    setTimeout(() => {
      setShowAlert(false); 
    }, 3000);
  };

  const closeAlert = () => {
    setShowAlert(false); 
  };

  const packageRef = useRef(null);
  const toppingsRef = useRef(null);

  // Actualizar currentOrder en localStorage cada vez que cambie el estado
  useEffect(() => {
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  }, [currentOrder]);

  const handleAddOrder = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = JSON.parse(localStorage.getItem("currentOrder"));
    
    // Si no hay toppings seleccionados, asignar los predeterminados
    if (!newOrder.toppings || newOrder.toppings.length === 0) {
      newOrder.toppings = ["Nueces"]; 
    }

    if (currentOrder && newOrder.gramaje && currentOrder.toppings) {
      addOrder(newOrder);
      storedOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(storedOrders));
      localStorage.removeItem("currentOrder");
      showAlertMessage("Pedido agregado con éxito.");

      // Guardar los datos de currentOrder después de cada nuevo pedido
      const updatedOrder = {
        toppings: newOrder.toppings,
      };
      localStorage.setItem("currentOrder", JSON.stringify(updatedOrder));

      // Reinicia el estado en los componentes hijos
      if (packageRef.current) packageRef.current.resetSelection();
      if (toppingsRef.current) toppingsRef.current.resetSelection();

       // Limpiar el estado actual del pedido
       setCurrentOrder({
        toppings: ["Nueces"], // Topping predeterminado
      });
    } else {
      alert("Por favor, completa todos los campos antes de agregar el pedido.");
    }
  };

  return (
    <form className="formComponentContainer">
      <h4>1. Elige el envase</h4>
      <ChoosePackage ref={packageRef} options={GramajeOptions} />

      <h4 className="titleStep-2">2. Elige tus toppings</h4>
      <ChooseToppings ref={toppingsRef} options={ToppingOptions} />

      <button type="button" onClick={handleAddOrder}>
        Agregar Pedido
      </button>

      {/* Mostrar el AlertComponent si showAlert es true */}
      {showAlert && <AlertComponent message={message} />}
    </form>
  );
}

export default FormComponent;