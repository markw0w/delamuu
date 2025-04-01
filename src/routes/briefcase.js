import { Router } from "express";
import sequelize from "../db/cnn.js"; 
import { QueryTypes } from "sequelize";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }  // 10 MB
});

const router = Router();

router.get("/get-briefcase/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await sequelize.query(
      "SELECT file_data FROM briefcases WHERE id = ?",
      { replacements: [id], type: QueryTypes.SELECT }
    );
    if (rows.length === 0 || !rows[0].file_data) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }
    // Ajusta el Content-Type al que corresponda; en este caso, asumiremos PDF
    res.setHeader("Content-Type", "application/pdf");
    res.send(rows[0].file_data);
  } catch (error) {
    console.error("Error al obtener el archivo:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/add-briefcase", upload.single("file"), async (req, res) => {
  console.log('Intentando subir la carta');
  try {
    const { nombre } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ningún archivo" });
    }
    const fileBuffer = req.file.buffer;

    // Insertar en la base de datos, guardando el buffer en file_data
    await sequelize.query(
      "INSERT INTO briefcases (nombre, file_data) VALUES (?, ?)",
      {
        replacements: [nombre, fileBuffer],
        type: QueryTypes.INSERT
      }
    );

    res.json({ message: "Archivo subido con éxito" });
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).json({ error: "Error en el servidor" });
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
