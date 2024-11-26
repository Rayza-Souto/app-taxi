import { Request, Response } from "express";
import { getRides } from "../models/rideModel";

export const getRideHistory = (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  if (!customer_id) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "ID do usuário é obrigatório",
    });
  }

  const rides = getRides(customer_id, driver_id ? Number(driver_id) : undefined);

  if (rides.length === 0) {
    return res.status(404).json({
      error_code: "NO_RIDES_FOUND",
      error_description: "Nenhuma viagem encontrada",
    });
  }

  res.status(200).json({ customer_id, rides });
};
