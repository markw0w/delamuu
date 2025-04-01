import { Router } from "express";
import sequelize from "../db/cnn.js"; 
import { QueryTypes } from "sequelize";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

const router = Router();

router.get("/get-briefcase-user", async (req, res) => {
  try {
    const connection = await sequelize.getConnection();
    const [rows] = await connection.query("SELECT archivo FROM briefcases ORDER BY id DESC LIMIT 1"); // Trae el último PDF
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "No hay archivos disponibles" });
    }

    const pdfBuffer = rows[0].archivo; // Asegúrate de que 'archivo' es un BLOB
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="documento.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("❌ Error al obtener el PDF:", error);
    res.status(500).json({ error: "No se pudo obtener el PDF" });
  }
});

router.get("/get-briefcase", async (req, res) => {
  try {
    const rows = await sequelize.query(
      "SELECT id, nombre FROM briefcases",
      { type: QueryTypes.SELECT }
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los archivos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

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
