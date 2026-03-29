import { Router } from "express";
import {
  createBookingHandler,
  getBookingsHandler,
} from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware"; // 🔥 ADD

const router = Router();

// 🔥 PROTECT ROUTES
router.post("/", authMiddleware, createBookingHandler);
router.get("/", authMiddleware, getBookingsHandler);

export default router;