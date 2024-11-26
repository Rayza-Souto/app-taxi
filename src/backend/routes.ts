import express from "express";
import {SolicitacaoViagens} from "../frontend/solicitacaoViagem";
import { confirmRide } from "./confirmarViagem";
import { getRideHistory } from "./controleHistorico";

const router = express.Router();

router.post("/ride/estimate", confirmRide);
router.patch("/ride/confirm", confirmRide);
router.get("/:customer_id", getRideHistory);


export default router;
