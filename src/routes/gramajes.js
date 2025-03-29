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

  const transaction = await sequelize.transaction();
  try {
    const [result] = await sequelize.query(
      "INSERT INTO envases (nombre) VALUES (:nombre)",
      {
        replacements: { nombre },
        type: QueryTypes.INSERT,
        transaction,
      }
    );
    console.log("Resultado de inserción:", result);
    const envaseId =
      typeof result === "number"
        ? result
        : result.insertId || (Array.isArray(result) ? result[0] : null);
    if (!envaseId) {
      throw new Error("No se pudo obtener el id del envase insertado");
    }

    const [products] = await sequelize.query("SELECT id FROM productos", { transaction });
    
    for (let product of products) {
      await sequelize.query(
        "INSERT INTO envases_productos (envase_id, producto_id, precio) VALUES (:envaseId, :productoId, :precio)",
        {
          replacements: { envaseId, productoId: product.id, precio: 0 },
          type: QueryTypes.INSERT,
          transaction,
        }
      );
    }

    await transaction.commit();
    res.status(201).json({ message: "✅ Gramaje agregado con éxito" });
  } catch (error) {
    await transaction.rollback();
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