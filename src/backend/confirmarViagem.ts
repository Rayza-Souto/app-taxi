import { Request, Response } from "express";
import { motoristas } from "./models/motoristas";
import { salvarCorrida } from "./modeloViagem";

export const confirmRide = async (req: Request, res: Response): Promise<void> => {
  const { customer_id, origin, destination, distance, duration, driver, value } = req.body; //recebe os dados da requisição

  // Validações
  if (!customer_id || !origin || !destination || !driver || !value) { //se algum campo estiver vazio
     res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Todos os campos são obrigatórios",
    });
    return;
  }
  if (origin === destination) { //se a origem for igual ao destino
     res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Origem e destino não podem ser iguais",
    });
    return;
  }
  const selectedDriver = motoristas.find((d) => d.id === driver.id);
  if (!selectedDriver) { //se o motorista não for encontrado
     res.status(404).json({
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Motorista não encontrado",
    });
    return;
  }
  if (distance < selectedDriver.minDistance) { //se a distância for menor que a distância mínima do motorista
     res.status(406).json({
      error_code: "INVALID_DISTANCE",
      error_description: "Quilometragem inválida para o motorista",
    });
    return;
  }

  // Salvar viagem
  salvarCorrida({
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

export default confirmRide;