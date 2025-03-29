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

  const transaction = await sequelize.transaction();
  try {
    const [result] = await sequelize.query(
      "INSERT INTO productos (nombre) VALUES (:nombre)",
      {
        replacements: { nombre },
        type: QueryTypes.INSERT,
        transaction,
      }
    );
    const productId = typeof result === "number"
      ? result
      : result.insertId || (Array.isArray(result) ? result[0] : null);
    if (!productId) {
      throw new Error("No se pudo obtener el id del producto insertado");
    }

    const [envases] = await sequelize.query("SELECT id FROM envases", { transaction });
    
    for (let envase of envases) {
      await sequelize.query(
        "INSERT INTO envases_productos (envase_id, producto_id, precio) VALUES (:envaseId, :productoId, :precio)",
        {
          replacements: { envaseId: envase.id, productoId: productId, precio: 0 },
          type: QueryTypes.INSERT,
          transaction,
        }
      );
    }

    await transaction.commit();
    res.status(201).json({ message: "✅ Producto agregado con éxito" });
  } catch (error) {
    await transaction.rollback();
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

router.post("/update-price/:id", async (req, res) => {
  const { id } = req.params;
  const { newPrice } = req.body;
  try {
    await sequelize.query(
      "UPDATE envases_productos SET precio = :newPrice WHERE id = :id",
      {
        replacements: { newPrice, id },
        type: sequelize.QueryTypes.UPDATE,
      }
    );
    res.status(200).json({ message: "Precio actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el precio:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-prices", async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        p.id, 
        e.nombre AS envaseNombre, 
        pr.nombre AS productoNombre, 
        p.precio
      FROM envases_productos p
      JOIN envases e ON p.envase_id = e.id
      JOIN productos pr ON p.producto_id = pr.id
      ORDER BY p.id ASC
    `);
    res.json(results);
  } catch (error) {
    console.error("❌ Error al obtener los precios de productos:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;