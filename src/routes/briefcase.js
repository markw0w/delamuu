import { Router } from "express";
import sequelize from "../db/cnn.js"; 
import { QueryTypes } from "sequelize";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: "uploads/", // Carpeta donde se guardan los archivos
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
  },
});
const upload = multer({ storage });
const router = Router();

router.get("/get-briefcase", async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT id, nombre, file_path FROM briefcases");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/add-briefcase", upload.single("file"), async (req, res) => {
  console.log('intentando obtener carta')
  try {
    const { nombre } = req.body;
    const filePath = `/uploads/${req.file.filename}`; // Ruta del archivo

    
    await sequelize.query("INSERT INTO briefcases (nombre, file_path) VALUES (?, ?)", [
      nombre,
      filePath,
    ]);

    res.json({ message: "Archivo subido con éxito", file_path: filePath });
    console.log(res)
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
