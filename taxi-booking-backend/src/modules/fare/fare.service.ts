import prisma from "../../config/db";

export const calculateFare = async (vehicleId: string, distance: number) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  const fare = vehicle.baseFare + distance * vehicle.perKmRate;

  return {
    vehicle: vehicle.name,
    fare,
  };
};