import React from "react";
import { useParams } from "react-router-dom";
import ProductComponent from "../components/productsComponents/ProductComponent";

function OrderView() {
    const { product } = useParams();

    return (
        <section>
            <ProductComponent activeModal={product} />
        </section>
    );
}

export default OrderView;

