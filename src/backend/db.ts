import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDb = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  // Criação da tabela de motoristas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS drivers (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      vehicle TEXT,
      rating INTEGER,
      comment TEXT,
      rate_per_km REAL,
      min_km REAL
    );
  `);

  // Inserir motoristas padrão (se não existirem)
  await db.exec(`
    INSERT OR IGNORE INTO drivers (id, name, description, vehicle, rating, comment, rate_per_km, min_km)
    VALUES
      (1, 'Homer Simpson', '...', 'Plymouth Valiant', 2, '...', 2.5, 1),
      (2, 'Dominic Toretto', '...', 'Dodge Charger', 4, '...', 5.0, 5),
      (3, 'James Bond', '...', 'Aston Martin DB5', 5, '...', 10.0, 10);
  `);

  return db;
};
