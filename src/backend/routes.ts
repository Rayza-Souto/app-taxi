import express from "express";
import { estimateRide } from "../controllers/estimateController";
import { confirmRide } from "../controllers/confirmController";
import { getRideHistory } from "../controllers/historyController";

const router = express.Router();

router.post("/estimate", estimateRide);
router.patch("/confirm", confirmRide);
router.get("/:customer_id", getRideHistory);

export default router;
