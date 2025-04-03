import express from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/get-toppings", async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * FROM toppings");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-topping", async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    await sequelize.query("INSERT INTO toppings (nombre) VALUES (:nombre)", {
      replacements: { nombre },
      type: QueryTypes.INSERT,
    });
    res.status(201).json({ message: "✅ Topping agregado con éxito" });
  } catch (error) {
    console.error("❌ Error al agregar topping:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-topping/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await sequelize.query(
      "DELETE FROM toppings WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE,
      }
    );

    console.log("Filas afectadas:", affectedRows); 

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Topping no encontrado" });
    }

    res.json({ message: "✅ Topping eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar topping:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
