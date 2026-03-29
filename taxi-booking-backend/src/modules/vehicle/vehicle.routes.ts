import { Router } from "express";
import {
  createVehicleHandler,
  getVehiclesHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
} from "./vehicle.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = Router();

// public (users can view vehicles)
router.get("/", getVehiclesHandler);

// admin only
router.post("/", authMiddleware, adminMiddleware, createVehicleHandler);
router.put("/:id", authMiddleware, adminMiddleware, updateVehicleHandler);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVehicleHandler);

export default router;