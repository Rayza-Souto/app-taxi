import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import rideRoutes from "./routes/rideRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/ride", rideRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});