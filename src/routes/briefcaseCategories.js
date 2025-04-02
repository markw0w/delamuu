import { Router } from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await sequelize.query(
      "SELECT * FROM briefcase_categories",
      { type: QueryTypes.SELECT }
    );
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await sequelize.query(
      "INSERT INTO briefcase_categories (name) VALUES (?)",
      {
        replacements: [name],
        type: QueryTypes.INSERT,
      }
    );
    res.json({ message: "Categoría creada", categoryId: result[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await sequelize.query(
      "UPDATE briefcase_categories SET name = ? WHERE id = ?",
      {
        replacements: [name, id],
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: "Categoría actualizada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query(
      "DELETE FROM briefcase_categories WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE,
      }
    );
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;