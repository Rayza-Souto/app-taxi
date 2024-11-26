import { Request, Response } from 'express';
import { calculateRoute } from './googleMapsService';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const estimateRide = async (req: Request, res: Response) => { 
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
    const { distance, duration } = await calculateRoute(origin, destination); //pegando os dados da rota para calcular a distancia e duração

    // Obter motoristas do banco
    const db = await open({ filename: './database.sqlite', driver: sqlite3.Database });
    const drivers = await db.all('SELECT * FROM drivers WHERE min_km <= ?', [distance]);

    // Calcular valores para cada motorista
    const options = drivers.map((driver: any) => ({
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
    console.log("corrida:")
    res.status(200).render('corrida',{
      customer_id,
      origin ,
      destination,
      distance,
      duration,
      options
    });
  } catch (error) {
    res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: 'Algo deu errado' });
  }
};
