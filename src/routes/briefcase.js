import { Router } from "express";
import sequelize from "../db/cnn.js"; 
import { QueryTypes } from "sequelize";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

const router = Router();


router.get("/get-briefcase", async (req, res) => {
  try {
    // Se selecciona el primer registro de la tabla
    const [row] = await sequelize.query(
      "SELECT file_data FROM briefcases ORDER BY id ASC LIMIT 1",
      { type: QueryTypes.SELECT }
    );
    
    if (!row || !row.file_data) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }
    
    // Aseguramos que file_data es un Buffer
    const pdfBuffer = Buffer.isBuffer(row.file_data)
      ? row.file_data
      : Buffer.from(row.file_data);
      
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error al obtener el archivo:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
/* router.get("/get-briefcase", async (req, res) => {
  try {
    const rows = await sequelize.query(
      "SELECT id, nombre, file_data FROM briefcases",
      { type: QueryTypes.SELECT }
    );

    res.json(rows.length > 0 ? rows : []);
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
}); */

router.post("/add-briefcase", upload.single("file"), async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ningún archivo" });
    }
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Solo se permiten archivos PDF" });
    }

    const fileBuffer = req.file.buffer;

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
