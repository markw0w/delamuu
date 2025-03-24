import express from "express";
import sequelize from "../db/cnn.js";
//import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/get-delivery", async (req, res) => {
  try {
    const [results] = await sequelize.query(
      "SELECT price FROM delivery LIMIT 1"
    );
    res.json([results[0]]);
  } catch (error) {
    console.error("❌ Error al obtener el costo de envío:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/update-price", async (req, res) => {
  const { newDeliveryPrice } = req.body;
  if (!newDeliveryPrice) {
    return res.status(400).json({ error: "El precio es obligatorio" });
  }

  try {
    await sequelize.query(
      "UPDATE delivery SET price = :newDeliveryPrice",
      {
        replacements: { newDeliveryPrice },
        type: sequelize.QueryTypes.UPDATE,
      }
    );
    res.status(201).json({ message: "✅ Precio actualizado con éxito" });
  } catch (error) {
    console.error("❌ Error al actualizar el precio:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
