import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDb = async () => { // Função para inicializar o banco de dados
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,

  });

  // Criação da tabela de motoristas
  await db.exec(`
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
  await db.exec(`
    INSERT INTO drivers (id, name, description, vehicle, rating, comment, rate_per_km, min_km)
    VALUES
      (1, 'Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada!', 'Plymouth Valiant', 2, 'Motorista simpático, mas errou o caminho 3 vezes.', 2.5, 1),
      (2, 'Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez.', 'Dodge Charger', 4, 'Que viagem incrível! O carro é um show à parte.', 5.0, 5),
      (3, 'James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto.', 'Aston Martin DB5', 5, 'Serviço impecável! O motorista é a própria definição de classe', 10.0, 10);
  `);

  // Criação da tabela de viagens
  await db.exec(`
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
  await db.exec(`
    INSERT INTO rides (id, customer_id, driver_id, date, distance, duration, cost, rating, comment)
    VALUES

  `);
};

export default initDb;
