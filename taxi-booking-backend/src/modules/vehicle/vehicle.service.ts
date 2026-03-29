import prisma from "../../config/db";

export const createVehicle = async (data: any) => {
  return prisma.vehicle.create({ data });
};

export const getVehicles = async () => {
  return prisma.vehicle.findMany({
    where: { isActive: true },
  });
};

export const updateVehicle = async (id: string, data: any) => {
  return prisma.vehicle.update({
    where: { id },
    data,
  });
};

export const deleteVehicle = async (id: string) => {
  return prisma.vehicle.update({
    where: { id },
    data: { isActive: false }, // soft delete
  });
};