import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";
import fareRoutes from "./modules/fare/fare.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import errorMiddleware from "./middlewares/error.middleware";





const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/fare", fareRoutes);   
app.use("/api/bookings", bookingRoutes);
app.use(errorMiddleware);

export default app;