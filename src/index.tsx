import axios from "axios";
import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import handleChooseDriver from "./frontend/opcoesViagem";
import path from "path";  // Importando path para servir arquivos estáticos

dotenv.config();
const app = express();
const port = 8080;

app.use(express.json());

const api = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/directions/json`
});

app.get("/", (req: Request, res: Response) => {
  // Envia o arquivo index.html do build do React
  res.sendFile(path.join(__dirname,  "..", "src", "index.html"));
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
      const leg = response.data.routes[0].legs[0];
      const filtro = {
        origin: leg.start_location.lat,
        destination: leg.end_location.lat,
        distance: leg.distance.text,
        duration: leg.duration.text,
        options: handleChooseDriver,
        value: 0,
      };
      res.status(200).json(filtro);
      console.log("Resultado:", filtro);
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
