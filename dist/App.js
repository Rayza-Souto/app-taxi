"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const opcoesViagem_1 = __importDefault(require("./frontend/opcoesViagem"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'index.html')));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
});
const api = axios_1.default.create({
    baseURL: `https://maps.googleapis.com/maps/api/directions/json`
});
app.get("/ride/estimate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        const response = yield api.get("", {
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
                options: opcoesViagem_1.default,
                value: 0,
            };
            res.status(200).json(filtro);
        }
        else {
            res.status(404).json({ message: "Não foram encontradas rotas com esses parametros" });
        }
    }
    catch (error) {
        console.error(error);
        if (axios_1.default.isAxiosError(error)) {
            res.status(500).json({
                message: "API Error",
                details: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || "No details available",
            });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}));
