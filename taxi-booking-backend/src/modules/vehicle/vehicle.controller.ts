import { Request, Response } from "express";
import {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "./vehicle.service";

export const createVehicleHandler = async (req: Request, res: Response) => {
  try {
    const vehicle = await createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getVehiclesHandler = async (req: Request, res: Response) => {
  const vehicles = await getVehicles();
  res.json(vehicles);
};

export const updateVehicleHandler = async (req: Request, res: Response) => {
  try {
    const vehicle = await updateVehicle(req.params.id as string, req.body);
    res.json(vehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVehicleHandler = async (req: Request, res: Response) => {
  await deleteVehicle(req.params.id as string);
  res.json({ message: "Vehicle removed" });
};