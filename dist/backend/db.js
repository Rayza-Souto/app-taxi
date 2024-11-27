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
exports.initDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, sqlite_1.open)({
        filename: './database.sqlite',
        driver: sqlite3_1.default.Database,
    });
    // Criação da tabela de motoristas
    yield db.exec(`
    CREATE TABLE drivers (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      vehicle TEXT,
      review_rating INTEGER,
      review_comment TEXT,
      rate REAL,
      minDistance REAL
    );
  `);
    // Inserir motoristas padrão 
    yield db.exec(`
    INSERT INTO drivers (id, name, description, vehicle, rating, comment, rate_per_km, min_km)
    VALUES
      (1, 'Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada!', 'Plymouth Valiant', 2, 'Motorista simpático, mas errou o caminho 3 vezes.', 2.5, 1),
      (2, 'Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez.', 'Dodge Charger', 4, 'Que viagem incrível! O carro é um show à parte.', 5.0, 5),
      (3, 'James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto.', 'Aston Martin DB5', 5, 'Serviço impecável! O motorista é a própria definição de classe', 10.0, 10);
  `);
    // Criação da tabela de viagens
    yield db.exec(`
    CREATE TABLE rides (
      id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      driver_id INTEGER,
      date TEXT,
      distance REAL,
      duration INTEGER,
      cost REAL,
      rating INTEGER,
      comment TEXT
    );
  `);
    // Inserir viagens
    yield db.exec(`
    INSERT INTO rides (id, customer_id, driver_id, date, distance, duration, cost, rating, comment)
    VALUES

  `);
});
exports.initDb = initDb;
exports.default = exports.initDb;
