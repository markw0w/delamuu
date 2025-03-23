import express from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/get-fruits", async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * FROM frutas");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-fruit", async (req, res) => {
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
});

router.delete("/delete-fruit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await sequelize.query(
      "DELETE FROM frutas WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE,
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Fruta no encontrada" });
    }

    res.json({ message: "✅ Fruta eliminada con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar la fruta:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;