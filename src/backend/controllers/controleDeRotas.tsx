import axios from "axios";
import { motoristas } from '../models/motoristas';
import { Request, Response } from "express";

//rota POST /ride/estimate

export const estimateRide = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body; // Recebe os dados da requisição

  //validações dos campos
  if (!customer_id || !origin || !destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Todos os campos são obrigatórios",
    });
  }
// validação de origem e destino iguais
  if (origin === destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Origem e destino não podem ser iguais.",
    }); 
  }

// Chamando a API do Google Maps para calcular a rota:
  try {
    const axios = require("axios");
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
      return res.status(500).json({
        error_code: "MISSING_API_KEY",
        error_description: "Chave da API do Google não configurada.",
      });
    }

    const googleApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleApiKey}`;

    const response = await axios.get(googleApiUrl); //faz a chamada da API do Google

    // Verificando se a API retornou resultados válidos:
    if (!response.data || response.data.status !== "OK") {
      return res.status(400).json({
        error_code: "INVALID_API_RESPONSE",
        error_description: "Não foi possível calcular a rota com os dados fornecidos.",
      });
    }

    const route = response.data.routes[0];
    const distance = route.legs[0].distance.value / 1000; // distância em km
    const duration = route.legs[0].duration.text; // tempo estimado

    // Filtra motoristas pela distância mínima
    const availableDrivers = motoristas.filter((driver) => distance >= driver.minDistance).map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.review,
      value: (distance * driver.rate).toFixed(2),
    }));

    //retorno de motoristas disponíveis

    return res.status(200).json({
        origin: {
          latitude: route.legs[0].start_location.lat,
          longitude: route.legs[0].start_location.lng,
        },
        destination: {
          latitude: route.legs[0].end_location.lat,
          longitude: route.legs[0].end_location.lng,
        },
        distance,
        duration,
        routeResponse: response.data, // Retorno completo da API do Google
      });

  } catch (error) {
      console.error("Erro ao chamar a API do Google:", error);
      return res.status(500).json({
        error_code: "API_ERROR",
        error_description: "Erro ao comunicar com a API do Google Maps.",});
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