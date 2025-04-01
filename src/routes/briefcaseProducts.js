import { Router } from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await sequelize.query(
      "SELECT * FROM briefcase_products",
      { type: QueryTypes.SELECT }
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos de una categoría específica
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await sequelize.query(
      "SELECT * FROM briefcase_products WHERE category_id = ?",
      {
        replacements: [categoryId],
        type: QueryTypes.SELECT,
      }
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo producto dentro de una categoría
router.post("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { name, description, price } = req.body;
  try {
    const result = await sequelize.query(
      "INSERT INTO briefcase_products (category_id, name, description, price) VALUES (?, ?, ?, ?)",
      {
        replacements: [categoryId, name, description, price],
        type: QueryTypes.INSERT,
      }
    );
    res.json({ message: "Producto creado", productId: result[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    await sequelize.query(
      "UPDATE briefcase_products SET name = ?, description = ?, price = ? WHERE id = ?",
      {
        replacements: [name, description, price, id],
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query(
      "DELETE FROM briefcase_products WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE,
      }
    );
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;