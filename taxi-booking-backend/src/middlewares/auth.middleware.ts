import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    // 🔥 STEP 1: Check header
    console.log("AUTH HEADER:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    // 🔥 STEP 2: Check token extraction
    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    // 🔥 STEP 3: Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // 🔥 STEP 4: Check decoded user
    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    // 🔥 STEP 5: Catch actual error
    console.log("JWT ERROR:", error);

    res.status(401).json({ message: "Invalid token" });
  }
};