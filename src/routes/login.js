import { Router } from "express";
import sequelize from "../db/cnn.js";
import { QueryTypes } from "sequelize";

const router = Router();

router.post("/auth", async (req, res) => {
  const { user, password } = req.body;

  try {
    const result = await sequelize.query(
      "SELECT userName FROM users WHERE userName = :user AND password = :password",
      {
        replacements: { user, password },
        type: QueryTypes.SELECT,
      }
    );

    if (result.length === 0) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso", user: result[0].user });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

export default router;