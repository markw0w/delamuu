import express from "express";
import path from "path";
import cors from "cors";
import sequelize from "./db/cnn.js"; 
import { fileURLToPath } from "url";
import loginRoutes from "./routes/login.js";
import orderRoutes from "./routes/saveOrder.js";
import toppingRoutes from "./routes/toppings.js";
import sauceRoutes from "./routes/sauces.js";
import fruitRoutes from "./routes/fruits.js";
import productRoutes from "./routes/products.js";
import gramajeRoutes from "./routes/gramajes.js";
import deliveryRoutes from "./routes/delivery.js";
import flavorRoutes from "./routes/flavors.js";


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
app.use("/toppings", toppingRoutes);
app.use("/sauces", sauceRoutes);
app.use("/fruits", fruitRoutes);
app.use("/products", productRoutes);
app.use("/gramajes", gramajeRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/flavors", flavorRoutes);

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});