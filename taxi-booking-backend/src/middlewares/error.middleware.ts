import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message || "Something went wrong",
  });
};

export default errorMiddleware;