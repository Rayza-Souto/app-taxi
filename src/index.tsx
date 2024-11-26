import axios from "axios";
import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import App from "./frontend/tela inicial";

dotenv.config();
const app = express();
const port = 8080;

app.use(express.json());

const api = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/directions/json`
});

app.get("/ride/estimate", async (req: Request, res: Response) => {
  console.log("Received query parameters:", req.query);
  const { origin, destination } = req.query;
  const key = process.env.GOOGLE_API_KEY;

  if (typeof origin !== "string" || typeof destination !== "string") {
    res.status(400).json({ message: "Parâmetros inválidos" });
    return;
  }

  if (!origin || !destination) {
    res.status(400).json({ message: "Todos os campos são obrigatórios" });
    return;
  }

  try { //vai tentar fazer a requisição
    const response = await api.get("", {
      params: {
        origin,
        destination,
        key,
      },
    });
    

    if (response.data.routes && response.data.routes.length > 0) { //se a resposta retornar uma rota
      res.status(200).json(response.data.routes[0].legs[0]);
      console.log("Resultado:", response.data.routes[0].legs[0]);
    } else {
      console.log("Resultado:", response.data);
      res.status(404).json({ message: "Não foram encontradas rotas com esses parametros" });
    }
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
  res.send(<App />); ;
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});