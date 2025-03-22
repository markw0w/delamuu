import express from "express";
import path from "path";
import cors from "cors";
import sequelize from "./db/cnn.js"; 
import { fileURLToPath } from "url";
import loginRoutes from "./routes/login.js";
import orderRoutes from "./routes/saveOrder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

sequelize.authenticate()
  .then(() => console.log("✅ Conexión con la base de datos establecida."))
  .catch((error) => console.error("❌ Error al conectar a la base de datos:", error));

sequelize.sync({ force: false })
  .then(() => console.log("🔄 Modelos sincronizados con la base de datos."))
  .catch(error => console.error("❌ Error sincronizando modelos:", error));

app.use("/api", loginRoutes);
app.use("/api", orderRoutes);

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});