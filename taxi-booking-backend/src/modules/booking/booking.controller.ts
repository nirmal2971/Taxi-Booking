import { Request, Response } from "express";
import { createBooking, getAllBookings } from "./booking.service";

export const createBookingHandler = async (req: any, res: Response) => {
  try {
    // 🔥 ADD THIS CHECK
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const booking = await createBooking(req.body, req.user.id);

    res.status(201).json({
      message: "Booking successful",
      bookingId: booking.id,
      booking,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookingsHandler = async (req: Request, res: Response) => {
  const bookings = await getAllBookings();
  res.json(bookings);
};