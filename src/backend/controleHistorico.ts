import { Request, Response } from "express";
import { verCorridas } from "./modeloViagem";

export const getRideHistory = async (req: Request, res: Response): Promise<void> => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  if (!customer_id) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "ID do usuário é obrigatório",
    });
  }

  const rides = verCorridas(customer_id, driver_id ? Number(driver_id) : undefined);

  if (rides.length === 0) {
     res.status(404).json({
      error_code: "NO_RIDES_FOUND",
      error_description: "Nenhuma viagem encontrada",
    });
  }

  res.status(200).json({ customer_id, rides });
};
