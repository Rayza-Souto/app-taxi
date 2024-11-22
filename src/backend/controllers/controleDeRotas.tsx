import axios from "axios";
import { motoristas } from '../models/motoristas';
///import drivers from "./models/motoristas.ts";

//rota POST /ride/estimate
import { Request, Response } from "express";

export const estimateRide = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body; // Recebe os dados da requisição

  if (!customer_id || !origin || !destination) {
    return res.status(400).json({ error: "Favor preencher todos os campos" }); // Retorna erro se faltar algum parâmetro
  }
  try {
    const api_key = process.env.GOOGLE_API_KEY; // Chave de API do Google Maps
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', // Faz a requisição para a API do Google Maps
      {
        params: {
          origin: origin,
          destination: destination,
          key: api_key
        }, //parametros da busca
      }
    );

    const route = response.data.routes[0].legs[0]; // Pega a rota da resposta da API
    const distanceKm = route.distance.value / 1000; // Pega a distância em quilômetros
    const duration = route.duration.text; // Pega a duração da viagem

    // Filtra motoristas pela distância mínima
    const availableDrivers = motoristas.filter((driver) => distanceKm >= driver.minDistance).map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.review,
      value: (distanceKm * driver.rate).toFixed(2),
    }));
    // Vai pegar a distancia da viagem e verificar se é maior ou igual a distancia minima do motorista
    // Feito isso, vai apresentar os motoristas disponíveis para a viagem

    return res.status(200).json({
      origin: route.start_location,
      destination: route.end_location,
      distance: distanceKm,
      duration,
      options: availableDrivers,
      routeResponse: response.data,
    });
    // Retorno da rota, distancia, duração e motoristas disponíveis
  } catch (error) {
    return res.status(500).json({ error: "Erro ao calcular rota." });
  }
};

// rota PATCH /ride/confirm
// Criando a função para confirmar a viagem e salvar no banco de dados

const db = require("../database/connection");

export const confirmRide = async (req: Request, res: Response) => {
  const { customer_id, origin, destination, driver, distance, value } = req.body;

  if (!customer_id || !origin || !destination || !driver || origin === destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Dados inválidos fornecidos.",
    });
  }

  try {
    await db.run(
      `INSERT INTO rides (customer_id, origin, destination, driver_id, distance, value) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [customer_id, origin, destination, driver.id, distance, value]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao confirmar viagem." });
  }
};

export default { estimateRide, confirmRide };