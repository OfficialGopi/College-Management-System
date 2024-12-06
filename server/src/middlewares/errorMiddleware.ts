import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/utility-class.js";

export const errorMiddleware = (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    error.message = error.message || "Internal Server Error";
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).json({
        success: false,
        error: error.message
    });
}