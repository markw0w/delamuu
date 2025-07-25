import React, { useRef, useState, useEffect } from "react";
import { useCart } from "../../utils/CartContext.js";
import ChoosePackage from "../../utils/ChoosePackage.js";
import CreateProduct from "../../utils/CreateProduct.js";
import AlertComponent from "../alerts/AlertComponent.js";
import axios from "axios";

function FormComponent({ product }) {
  const { addOrder } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const packageRef = useRef(null);
  const toppingsRef = useRef(null);
  const saucesRef = useRef(null);
  const fruitsRef = useRef(null);
  const priceRef = useRef(null);

  const [orderReady, setOrderReady] = useState(false);
  const [gramajes, setGramajes] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [prices, setPrices] = useState([]);

  const [currentOrder, setCurrentOrder] = useState({
    product: product,
    gramaje: "",
    toppings: [],
    sauces: [],
    fruits: [],
    prices: "",
  });

  const API_URL_GET_GRAMAJE = "https://delamuu.com/gramajes/get-gramajes";
  const API_URL_GET_PRICES = "https://delamuu.com/products/get-prices";
  const API_URL_GET_TOPPINGS_OPTIONS = "https://delamuu.com/toppings/get-toppings";
  const API_URL_GET_SAUCES_OPTIONS = "https://delamuu.com/sauces/get-sauces";
  const API_URL_GET_FRUITS_OPTIONS = "https://delamuu.com/fruits/get-fruits";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gramajesRes = await axios.get(API_URL_GET_GRAMAJE);
        const pricesRes = await axios.get(API_URL_GET_PRICES);
        const toppingsRes = await axios.get(API_URL_GET_TOPPINGS_OPTIONS);
        const saucesRes = await axios.get(API_URL_GET_SAUCES_OPTIONS);
        const fruitsRes = await axios.get(API_URL_GET_FRUITS_OPTIONS);

        setGramajes(gramajesRes.data);
        setPrices(pricesRes.data);
        setToppings(toppingsRes.data);
        setSauces(saucesRes.data);
        setFruits(fruitsRes.data);

        // Inicializar currentOrder con el primer gramaje y su precio
        if (gramajesRes.data.length > 0) {
          const defaultGramaje = gramajesRes.data[0].nombre || "";
          const defaultPrice =
            pricesRes.data.find(
              (p) =>
                p.productoNombre === product && p.envaseNombre === defaultGramaje
            )?.precio || "N/A";

          setCurrentOrder((prev) => ({
            ...prev,
            gramaje: defaultGramaje,
            prices: defaultPrice,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [product]);

  const toppingLimits = {
    "1/4 kg": 3,
    "1/2 kg": 4,
    "3/4 kg": 4,
    "1 kg": 5,
  };

  const handleGramajeChange = (newGramaje, newPrice) => {
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      gramaje: newGramaje,
      prices: newPrice,
      toppings: [],
      sauces: [],
      fruits: [],
    }));
    setOrderReady(false);

    if (toppingsRef.current) toppingsRef.current.resetSelection();
    if (saucesRef.current) saucesRef.current.resetSelection();
    if (fruitsRef.current) fruitsRef.current.resetSelection();
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

    setCurrentOrder((prev) => ({
      ...prev,
      toppings: newToppings,
      sauces: newSauces,
      fruits: newFruits,
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

    const totalSelections =
      currentOrder.toppings.length +
      currentOrder.sauces.length +
      currentOrder.fruits.length;

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

    // Reiniciar currentOrder con el primer gramaje y precio al agregar el pedido
    if (gramajes.length > 0) {
      const defaultGramaje = gramajes[0].nombre || "";
      const defaultPrice =
        prices.find(
          (p) => p.productoNombre === product && p.envaseNombre === defaultGramaje
        )?.precio || "N/A";

      const updatedOrder = {
        product: product,
        gramaje: defaultGramaje,
        prices: defaultPrice,
        toppings: [],
        sauces: [],
        fruits: [],
      };

      localStorage.setItem("currentOrder", JSON.stringify(updatedOrder));
      setCurrentOrder(updatedOrder);
    } else {
      // En caso de que no haya gramajes
      setCurrentOrder({
        product: product,
        gramaje: "",
        prices: "N/A",
        toppings: [],
        sauces: [],
        fruits: [],
      });
    }

    setOrderReady(false);

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
        options={gramajes}
        onGramajeChange={handleGramajeChange}
        onPriceChange={handlePriceChange}
        selectedGramaje={currentOrder.gramaje}
        selectedPrice={currentOrder.prices}
        packagePrices={prices}
        product={product}
      />
      <hr />
      <h2 id="titleForm" className="titleStep-2">
        2. ¡Ármalo!
      </h2>
      <CreateProduct
        ref={toppingsRef}
        toppingOptions={toppings}
        sauceOptions={sauces}
        fruitOptions={fruits}
        gramaje={currentOrder.gramaje}
        maxSelections={toppingLimits[currentOrder.gramaje]}
        currentProduct={currentOrder.product}
        currentToppings={currentOrder.toppings}
        currentSauces={currentOrder.sauces}
        currentFruits={currentOrder.fruits}
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

export default FormComponent;
