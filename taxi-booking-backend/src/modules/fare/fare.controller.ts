import { Request, Response } from "express";
import { calculateFare } from "../fare/fare.service";

export const getFareEstimate = async (req: Request, res: Response) => {
  try {
    const { vehicleId, distance } = req.body;

    const result = await calculateFare(vehicleId, distance);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};