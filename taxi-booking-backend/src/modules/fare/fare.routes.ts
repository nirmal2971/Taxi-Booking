import { Router } from "express";
import { getFareEstimate } from "./fare.controller";

const router = Router();

router.post("/estimate", getFareEstimate);

export default router;