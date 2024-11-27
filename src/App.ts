import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
import { Request, Response } from 'express';
import handleChooseDriver from './frontend/opcoesViagem';


dotenv.config();
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

app.use(express.json());
app.use(express.static(path.join(__dirname, 'index.html')));

const api = axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/directions/json`
})

app.get("/ride/estimate", async (req: Request, res: Response) => {
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
        } else {
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
