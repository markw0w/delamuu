import React from "react";
import { useParams } from "react-router-dom";
import ProductComponent from "../components/productsComponents/ProductComponent.js";
import '../styles/alert.css';
import '../styles/cart.css';
import '../styles/products.css';

function OrderView() {
    const { product } = useParams();

    return (
        <section className="orderViewContainer">
            <ProductComponent activeModal={product} />
        </section>
    );
}

export default OrderView;

