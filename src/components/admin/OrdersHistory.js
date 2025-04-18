import React, { useState, useEffect } from "react";
import axios from "axios";

function OrdersHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [filterDate, setFilterDate] = useState(""); // Almacena la fecha seleccionada
  const ordersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const API_URL_GET_ORDERS = "https://delamuu.com/api/get-orders";
  const API_URL_FILTER_ORDERS = "https://delamuu.com/api/filter-orders";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL_GET_ORDERS);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  };

  const handleFilter = async () => {
    if (!filterDate) return;
    try {
      const response = await axios.get(API_URL_FILTER_ORDERS, {
        params: { date: filterDate },
      });
      setFilteredOrders(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error al filtrar las órdenes:", error);
    }
  };

  const ordersToDisplay = filteredOrders !== null ? filteredOrders : orders;

  const reversedOrders = [...ordersToDisplay].reverse();
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = reversedOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(ordersToDisplay.length / ordersPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="admin-detail-container">
      <h2 className="admin-detail-title">Historial de Órdenes</h2>

      <div className="filter-container">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>

      {ordersToDisplay.length > 0 ? (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Fecha</th>
                <th>Detalles</th>
                <th>Total</th>
                <th>Forma de Pago</th>
                <th>Forma de Retiro</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td data-label="ID">{order.id}</td>
                  <td data-label="Cliente">{order.nombre_cliente}</td>
                  <td data-label="Dirección">{order.direccion}</td>
                  <td data-label="Fecha">
                    {new Date(order.fecha).toLocaleString("es-ES", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td data-label="Detalles">
                    {(() => {
                      try {
                        const details = JSON.parse(order.detalles);
                        return details.map((item, index) => (
                          <div
                            key={index}
                            className="detalle-item"
                          >
                            <div>
                              <strong>Envase:</strong> {item.gramaje}
                            </div>
                            {item.product && (
                              <div>
                                <strong>Producto:</strong> {item.product}
                              </div>
                            )}
                            {item.product === "Helado" ? (
                              <div>
                                <strong>Sabores:</strong>{" "}
                                {item.sabores && item.sabores.length > 0
                                  ? item.sabores.join(", ")
                                  : "Sin sabores"}
                              </div>
                            ) : (
                              <>
                                <div>
                                  <strong>Toppings:</strong>{" "}
                                  {item.toppings && item.toppings.length > 0
                                    ? item.toppings.join(", ")
                                    : "Sin toppings"}
                                </div>
                                <div>
                                  <strong>Salsas:</strong>{" "}
                                  {item.salsas && item.salsas.length > 0
                                    ? item.salsas.join(", ")
                                    : "Sin salsas"}
                                </div>
                                <div>
                                  <strong>Frutas:</strong>{" "}
                                  {item.frutas && item.frutas.length > 0
                                    ? item.frutas.join(", ")
                                    : "Sin frutas"}
                                </div>
                              </>
                            )}
                            <div>
                              <strong>Precio:</strong> $
                              {Number(item.precio).toLocaleString("es-ES")}
                            </div>
                            <hr />
                          </div>
                        ));
                      } catch (error) {
                        return order.detalles;
                      }
                    })()}
                  </td>
                  <td data-label="Total">
                    ${Number(order.total).toLocaleString("es-ES")}
                  </td>
                  <td data-label="Forma de Pago">{order.forma_pago}</td>
                  <td data-label="Forma de Retiro">{order.forma_retiro}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="admin-empty">No hay órdenes realizadas en esta fecha.</p>
      )}
    </section>
  );
}

export default OrdersHistory;
