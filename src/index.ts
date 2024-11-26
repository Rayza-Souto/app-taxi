import axios from "axios";
import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import App from "./frontend/tela inicial";

dotenv.config(); // Carrega as variáveis de ambiente
const app = express();
const port = 8080;
app.use(express.json()); // Permite que o express entenda JSON

const api = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/directions/json`
}); // Cria uma instância do axios com a URL da API do Google Maps

app.get("/ride/estimate", async (req: Request, res: Response): Promise<void> => {
    console.log("Received query parameters:", req.query);
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const response = await api.get("", {
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });
    res.status(200).json(response.data.routes[0]);
  } catch (error: any) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      res.status(500).json({
        message: "API Error",
        details: error.response?.data || "No details available",
      });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send(App);
});

app.get("/ride/estimate", (req: Request, res: Response) => {
    res.send("Use o método POST para acessar este endpoint.");
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});