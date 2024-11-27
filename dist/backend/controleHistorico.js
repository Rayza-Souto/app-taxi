var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { verCorridas } from "./modeloViagem";
export const getRideHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
