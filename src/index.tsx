import axios from "axios";
import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import handleChooseDriver from "./frontend/opcoesViagem";
import path from "path";  // Importando path para servir arquivos estáticos

dotenv.config();
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});




