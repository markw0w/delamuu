import express from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/get-gramajes", async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * FROM envases");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-gramaje", async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    await sequelize.query("INSERT INTO envases (nombre) VALUES (:nombre)", {
      replacements: { nombre },
      type: QueryTypes.INSERT,
    });
    res.status(201).json({ message: "✅ Gramaje agregado con éxito" });
  } catch (error) {
    console.error("❌ Error al agregar el gramaje:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-gramaje/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await sequelize.query(
      "DELETE FROM envases WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE,
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Gramaje no encontrado" });
    }

    res.json({ message: "✅ Gramaje eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar el gramaje:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;