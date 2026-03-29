import prisma from "../../config/db";

export const createBooking = async (data: any, userId: string) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  const fare =
    vehicle.baseFare + data.distance * vehicle.perKmRate;

  const booking = await prisma.booking.create({
    data: {
      userId,
      vehicleId: data.vehicleId,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      distance: data.distance,
      fare,
    },
  });

  return booking;
};

export const getAllBookings = async () => {
  return prisma.booking.findMany();
};