import express from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/get-flavors", async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * FROM sabores");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-flavor", async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    await sequelize.query("INSERT INTO sabores (nombre) VALUES (:nombre)", {
      replacements: { nombre },
      type: QueryTypes.INSERT,
    });
    res.status(201).json({ message: "✅ Sabor agregado con éxito" });
  } catch (error) {
    console.error("❌ Error al agregar el sabor:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-flavor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await sequelize.query(
      "DELETE FROM sabores WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE,
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Sabor no encontrado" });
    }

    res.json({ message: "✅ Sabor eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar el sabor:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;