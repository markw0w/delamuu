import express from "express";
import sequelize from "../db/cnn.js";
//import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/get-delivery", async (req, res) => {
  try {
    const [results] = await sequelize.query(
      "SELECT price FROM delivery LIMIT 1"
    );
    res.json(results[0]);
  } catch (error) {
    console.error("❌ Error al obtener el costo de envío:", error);
    res.status(500).json({ error: error.message });
  }
});

/* router.post("/update-delivery-price", async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    await sequelize.query("INSERT INTO frutas (nombre) VALUES (:nombre)", {
      replacements: { nombre },
      type: QueryTypes.INSERT,
    });
    res.status(201).json({ message: "✅ Fruta agregada con éxito" });
  } catch (error) {
    console.error("❌ Error al agregar la fruta:", error);
    res.status(500).json({ error: error.message });
  }
}); */

export default router;
