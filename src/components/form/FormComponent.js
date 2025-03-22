import React, { useRef, useState, useEffect } from "react";
import { useCart } from "../../utils/CartContext";
import ChoosePackage from "../../utils/ChoosePackage";
import CreateProduct from "../../utils/CreateProduct";
import AlertComponent from "../alerts/AlertComponent";

function FormComponent() {
  const { addOrder } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const packageRef = useRef(null);
  const toppingsRef = useRef(null);
  const saucesRef = useRef(null);
  const fruitsRef = useRef(null);
  const priceRef = useRef(null);

  const [currentOrder, setCurrentOrder] = useState(() => {
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    return (
      storedOrder || {
        gramaje: "1/4 kg",
        toppings: [],
        sauces: [],
        fruits: [],
        prices: "10000",
      }
    );
  });

  const GramajeOptions = [
    { gramaje: "1/4 kg" },
    { gramaje: "1/2 kg" },
    { gramaje: "3/4 kg" },
    { gramaje: "1 kg" },
  ];

  const packagePrices = [
    { gramaje: "1/4 kg", price: "10000" },
    { gramaje: "1/2 kg", price: "20000" },
    { gramaje: "3/4 kg", price: "30000" },
    { gramaje: "1 kg", price: "40000" },
  ];

  const toppingOptions = [
    { topping: "Alfajor" },
    { topping: "Almendras" },
    { topping: "Almohaditas" },
    { topping: "Anillitos" },
    { topping: "Chips Chocolate" },
    { topping: "Bananitas" },
    { topping: "Bon o Bon" },
    { topping: "Cereal con chocolate" },
    { topping: "Chocolinas" },
    { topping: "Coco rallado" },
    { topping: "Frutos secos" },
    { topping: "Gomitas" },
    { topping: "Granola" },
    { topping: "Granas multicolor" },
    { topping: "Leche en Polvo Nido" },
    { topping: "Maní con chocolate" },
    { topping: "Maní crocante" },
    { topping: "Mantecol" },
    { topping: "Marroc" },
    { topping: "Merenguitos" },
    { topping: "Mini galletitas con choco" },
    { topping: "Micro cereales de color" },
    { topping: "Moritas" },
    { topping: "Óperas" },
    { topping: "Oreo" },
    { topping: "Pasas de uva con choco" },
    { topping: "Pepitos" },
    { topping: "Quinoa con chocolate" },
    { topping: "Rocklets" },
    { topping: "Zucarita" },
  ];

  const sauceOptions = [
    { sauce: "Banana Split" },
    { sauce: "Chocotorta" },
    { sauce: "Cream de coco" },
    { sauce: "Dulce de leche" },
    { sauce: "Dulce de leche granizado" },
    { sauce: "Frutilla" },
    { sauce: "Frutos del bosque" },
    { sauce: "Leche condensada" },
    { sauce: "Nutella" },
    { sauce: "Maracuyá" },
    { sauce: "Crema oreo" },
    { sauce: "Bon o bon" },
    { sauce: "Brownie" },
    { sauce: "Choco & Naranja" },
    { sauce: "Chocolate blanco" },
    { sauce: "Gran fondente" },
    { sauce: "Kinder" },
    { sauce: "Mantequilla de maní" },
    { sauce: "Maní crunch" },
    { sauce: "Mentita felfort" },
    { sauce: "Miel" },
  ];

  const fruitOptions = [
    { fruit: "Ananá" },
    { fruit: "Arándanos" },
    { fruit: "Cerezas" },
    { fruit: "Durazno" },
    { fruit: "Frutilla" },
    { fruit: "Frutos rojos" },
    { fruit: "Higo en almibar" },
    { fruit: "Kiwi" },
    { fruit: "Melón" },
    { fruit: "Sandía" },
    { fruit: "Uva" },
    { fruit: "Zapallo en almíbar" },
    { fruit: "Ensalada de frutas" },
  ];

  const toppingLimits = {
    "1/4 kg": 3,
    "1/2 kg": 4,
    "3/4 kg": 4,
    "1 kg": 5,
  };

  const handleGramajeChange = (newGramaje,newPrice) => {
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      gramaje: newGramaje,
      prices: newPrice,
      toppings: [],
      sauces: [],
      fruits: [],
    }));

    if (toppingsRef.current) toppingsRef.current.resetSelection();
    if (saucesRef.current) saucesRef.current.resetSelection();
    if (fruitsRef.current) saucesRef.current.resetSelection();
    if (priceRef.current) priceRef.current.resetSelection();
  };

  const handlePriceChange = (newPrice) => {
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      prices: newPrice, 
    }));
  };

  const handleSelectionChange = (newToppings, newSauces, newFruits) => {
    const maxSelections = toppingLimits[currentOrder.gramaje];
    const total = newToppings.length + newSauces.length + newFruits.length;

    if (total > maxSelections) {
      showAlertMessage(
        `Límite: ${maxSelections} selecciones totales (toppings, salsas y frutas)`,
        "error"
      );
      return false;
    }

    setCurrentOrder(prev => ({
      ...prev,
      toppings: newToppings,
      sauces: newSauces,
      fruits: newFruits,
    }));
    return true;
  };

  const showAlertMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddOrder = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = { ...currentOrder };

    if (!currentOrder.gramaje) {
      showAlertMessage("Debes seleccionar un gramaje.", "error");
      return;
    }

    const totalSelections =
      currentOrder.toppings.length + currentOrder.sauces.length + currentOrder.fruits.length;
    if (totalSelections === 0) {
      showAlertMessage(
        "Debes seleccionar al menos un topping, salsa o fruta",
        "error"
      );
      return;
    }

    addOrder(newOrder);
    storedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(storedOrders));
    showAlertMessage("Pedido agregado con éxito.", "success");

    const updatedOrder = {
      gramaje: "1/4 kg",
      prices: packagePrices[0].price,
      toppings: [],
      sauces: [],
      fruits: [],
    };

    localStorage.setItem("currentOrder", JSON.stringify(updatedOrder));
    setCurrentOrder(updatedOrder);

    if (packageRef.current) packageRef.current.resetSelection();
    if (toppingsRef.current) toppingsRef.current.resetSelection();
    if (saucesRef.current) saucesRef.current.resetSelection();
    if (fruitsRef.current) fruitsRef.current.resetSelection();
    if (priceRef.current) priceRef.current.resetSelection();
  };

  useEffect(() => {
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  }, [currentOrder]);

  return (
    <form className="formComponentContainer">
      <h2 id="titleForm">1. Elige el envase</h2>
      <ChoosePackage
        ref={packageRef}
        options={GramajeOptions}
        onGramajeChange={handleGramajeChange}
        onPriceChange={handlePriceChange}
        selectedGramaje={currentOrder.gramaje}
        selectedPrice={currentOrder.prices}
        packagePrices={packagePrices}
      />
      <hr/>
      <h2 id="titleForm" className="titleStep-2">2. ¡Ármalo!</h2>
      <CreateProduct
        ref={toppingsRef}
        toppingOptions={toppingOptions}
        sauceOptions={sauceOptions}
        fruitOptions={fruitOptions}
        gramaje={currentOrder.gramaje}
        maxSelections={toppingLimits[currentOrder.gramaje]}
        currentToppings={currentOrder.toppings}
        currentSauces={currentOrder.sauces}
        currentFruits={currentOrder.fruits}
        onSave={handleSelectionChange}
      />
      <hr/>
      <button
        type="button"
        onClick={handleAddOrder}
        className="addOrderButton"
      >
        Agregar al carrito
      </button>

      {showAlert && <AlertComponent message={message} />}
    </form>
  );
}

export default FormComponent;