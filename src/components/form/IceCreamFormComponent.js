import React, { useRef, useState, useEffect } from "react";
import { useCart } from "../../utils/CartContext.js";
import ChoosePackage from "../../utils/ChoosePackage.js";
import CreateProduct from "../../utils/CreateProduct.js";
import AlertComponent from "../alerts/AlertComponent.js";
import axios from "axios";

function IceCreamFormComponent() {
  const { addOrder } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [orderReady, setOrderReady] = useState(false);

  const packageRef = useRef(null);
  const flavorRef = useRef(null);

  const [gramajes, setGramajes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [flavors, setFlavors] = useState([]);

  const [currentOrder, setCurrentOrder] = useState({
    product: "Helado",
    gramaje: "1/4 kg",
    flavors: [],
    toppings: [],
    sauces: [],
    fruits: [],
    prices: "10000",
  });

  const API_URL_GET_GRAMAJE = "https://delamuu.com/gramajes/get-gramajes";
  const API_URL_GET_PRICES = "https://delamuu.com/products/get-prices";
  const API_URL_GET_FLAVORS = "https://delamuu.com/flavors/get-flavors";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gramajesRes = await axios.get(API_URL_GET_GRAMAJE);
        setGramajes(gramajesRes.data);

        const pricesRes = await axios.get(API_URL_GET_PRICES);
        setPrices(pricesRes.data);

        const flavorsRes = await axios.get(API_URL_GET_FLAVORS);
        setFlavors(flavorsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const flavorsLimits = {
    "1/4 kg": 3,
    "1/2 kg": 3,
    "3/4 kg": 4,
    "1 kg": 5,
  };

  const handleGramajeChange = (newGramaje, newPrice) => {
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      gramaje: newGramaje,
      prices: newPrice,
      flavors: [],
    }));
    setOrderReady(false);
    if (flavorRef.current) flavorRef.current.resetSelection();
  };

  const handlePriceChange = (newPrice) => {
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      prices: newPrice,
    }));
  };

  const handleSelectionChange = (
    newToppings,
    newSauces,
    newFruits,
    newFlavors
  ) => {
    const flavorsArray = newFlavors !== undefined ? newFlavors : newToppings;
    const maxSelections = flavorsLimits[currentOrder.gramaje];

    if (flavorsArray.length > maxSelections) {
      showAlertMessage(
        `Límite: ${maxSelections} selecciones totales de sabores`,
        "error"
      );
      return false;
    }
    setCurrentOrder((prev) => ({
      ...prev,
      flavors: flavorsArray,
    }));
    setOrderReady(true);
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

    if (currentOrder.flavors.length === 0) {
      showAlertMessage("Debes seleccionar al menos un sabor", "error");
      return;
    }

    addOrder(newOrder);
    storedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(storedOrders));
    showAlertMessage("Pedido agregado con éxito.", "success");

    const updatedOrder = {
      product: "Helado",
      gramaje: "1/4 kg",
      prices: prices[0]?.price || "10000",
      flavors: [],
      toppings: [],
      sauces: [],
      fruits: [],
    };

    localStorage.setItem("currentOrder", JSON.stringify(updatedOrder));
    setCurrentOrder(updatedOrder);
    setOrderReady(false);

    if (packageRef.current) packageRef.current.resetSelection();
    if (flavorRef.current) flavorRef.current.resetSelection();
  };

  useEffect(() => {
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  }, [currentOrder]);

  return (
    <form className="formComponentContainer">
      <h2 id="titleForm">1. Elige el envase</h2>
      <ChoosePackage
        ref={packageRef}
        options={gramajes}
        onGramajeChange={handleGramajeChange}
        onPriceChange={handlePriceChange}
        selectedGramaje={currentOrder.gramaje}
        selectedPrice={currentOrder.prices}
        packagePrices={prices}
        product="Helado"
      />
      <hr />
      <h2
        id="titleForm"
        className="titleStep-2"
      >
        2. ¡Ármalo!
      </h2>
      <CreateProduct
        ref={flavorRef}
        flavorOptions={flavors}
        isIcreCream="1"
        gramaje={currentOrder.gramaje}
        maxSelections={flavorsLimits[currentOrder.gramaje]}
        currentProduct={currentOrder.product}
        onSave={handleSelectionChange}
      />
      <hr />
      {orderReady && (
        <button
          type="button"
          onClick={handleAddOrder}
          className="addOrderButton"
        >
          Agregar al carrito
        </button>
      )}
      {showAlert && <AlertComponent message={message} />}
    </form>
  );
}

export default IceCreamFormComponent;
