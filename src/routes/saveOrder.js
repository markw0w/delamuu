import express from "express";
import sequelize from "../db/cnn.js";

const router = express.Router();

router.get("/get-orders", async (req,res) => {
  try {
    const [results] = await sequelize.query(
      "SELECT * FROM orders"
    );
    res.json(results);
  } catch (error) {
    console.error("❌ Error al obtener las ordenes:", error);
    res.status(500).json({ error: error.message });
  }
})

router.post("/add-order", async (req, res) => {
    const { nombre_cliente, direccion, pedidos, total, forma_pago, forma_retiro } = req.body;

    try {
        await sequelize.query(
            "CALL sp_insert_order(?, ?, ?, ?, ?, ?)",
            {
              replacements: [
                nombre_cliente, 
                direccion, 
                JSON.stringify(pedidos), 
                total, 
                forma_pago, 
                forma_retiro
              ],
              type: sequelize.QueryTypes.RAW,
            }
        );

        res.status(201).json({ message: "Pedido almacenado con éxito" });
    } catch (error) {
        console.error("❌ Error al almacenar el pedido:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
