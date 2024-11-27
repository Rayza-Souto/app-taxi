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
exports.estimateRide = void 0;
const googleMapsService_1 = require("./googleMapsService");
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const estimateRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination } = req.body; // Dados da requisição
    // Validações
    if (!customer_id || !origin || !destination) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Missing required fields.' });
    }
    if (origin === destination) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Origin and destination must differ.' });
    }
    try {
        // Calcular rota
        const { distance, duration } = yield (0, googleMapsService_1.calculateRoute)(origin, destination); //pegando os dados da rota para calcular a distancia e duração
        // Obter motoristas do banco
        const db = yield (0, sqlite_1.open)({ filename: './database.sqlite', driver: sqlite3_1.default.Database });
        const drivers = yield db.all('SELECT * FROM drivers WHERE min_km <= ?', [distance]);
        // Calcular valores para cada motorista
        const options = drivers.map((driver) => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: {
                rating: driver.rating,
                comment: driver.comment,
            },
            value: (driver.rate_per_km * distance).toFixed(2),
        }));
        // Responder ao cliente
        res.status(200).render('corrida', {
            customer_id,
            origin,
            destination,
            distance,
            duration,
            options
        });
    }
    catch (error) {
        res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: 'Algo deu errado' });
    }
});
exports.estimateRide = estimateRide;
exports.default = exports.estimateRide;
