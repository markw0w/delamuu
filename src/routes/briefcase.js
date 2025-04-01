import { Router } from "express";
import sequelize from "../db/cnn.js"; 
import { QueryTypes } from "sequelize";

const router = Router();

router.get("/get-briefcase", async (req, res) => {
  try {
    const briefcase = await sequelize.query(
      "SELECT * FROM briefcases",
      { type: QueryTypes.SELECT }
    );
    res.json(briefcase);
  } catch (error) {
    console.error("❌ Error al obtener la carta:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-briefcase", async (req, res) => {
  const { nombre, file_path } = req.body;
  try {
    await sequelize.query(
      "INSERT INTO briefcases (nombre, file_path) VALUES (:nombre, :file_path)",
      { replacements: { nombre, file_path }, type: QueryTypes.INSERT }
    );
    res.status(200).json({ message: "Carta agregada exitosamente" });
  } catch (error) {
    console.error("❌ Error al agregar la carta:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-briefcase/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query(
      "DELETE FROM briefcases WHERE id = :id",
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Carta eliminada exitosamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la carta:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
