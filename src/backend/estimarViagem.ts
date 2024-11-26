import { Request, Response } from "express";
import { calculateRoute } from "../services/googleMapsService";
import { drivers } from "../data/drivers";

export const estimateRide = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body;

  // Validações
  if (!customer_id || !origin || !destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Todos os campos são obrigatórios",
    });
  }
  if (origin === destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Origem e destino não podem ser iguais",
    });
  }

  try {
    const { distance, duration, fullResponse } = await calculateRoute(origin, destination);

    const availableDrivers = drivers
      .filter((driver) => distance >= driver.minKm)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: distance * driver.ratePerKm,
      }))
      .sort((a, b) => a.value - b.value);

    res.status(200).json({
      origin: fullResponse.routes[0].legs[0].startLocation,
      destination: fullResponse.routes[0].legs[0].endLocation,
      distance,
      duration,
      options: availableDrivers,
      routeResponse: fullResponse,
    });
  } catch (error) {
    res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao calcular a rota",
    });
  }
};
