import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes";
import monitoringRoutes from "./routes/monitoring.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Product Dashboard Demo API is running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/monitoring", monitoringRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});