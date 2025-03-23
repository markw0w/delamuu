import express from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/get-products", async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-product", async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    await sequelize.query("INSERT INTO productos (nombre) VALUES (:nombre)", {
      replacements: { nombre },
      type: QueryTypes.INSERT,
    });
    res.status(201).json({ message: "✅ Producto agregado con éxito" });
  } catch (error) {
    console.error("❌ Error al agregar el producto:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await sequelize.query(
      "DELETE FROM productos WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE,
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "✅ Producto eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;