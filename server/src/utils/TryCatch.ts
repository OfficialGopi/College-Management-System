import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "./utility-class.js";
import { ControllerType } from "../types/types.js";

export const TryCatch =
  (func: ControllerType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      const typedError = error as Error;
      return next(new ErrorHandler(typedError.message, 500));
    }
  };
