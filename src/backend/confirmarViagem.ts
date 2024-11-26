import { Request, Response } from "express";
import { drivers } from "../data/drivers";
import { saveRide } from "../models/rideModel";

export const confirmRide = (req: Request, res: Response) => {
  const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

  // Validações
  if (!customer_id || !origin || !destination || !driver || !value) {
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
  const selectedDriver = drivers.find((d) => d.id === driver.id);
  if (!selectedDriver) {
    return res.status(404).json({
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Motorista não encontrado",
    });
  }
  if (distance < selectedDriver.minKm) {
    return res.status(406).json({
      error_code: "INVALID_DISTANCE",
      error_description: "Distância inválida para o motorista",
    });
  }

  // Salvar viagem
  saveRide({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
    date: new Date(),
  });

  res.status(200).json({ success: true });
};
