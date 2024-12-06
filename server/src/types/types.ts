import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
import { IUser } from "../interfaces/IUser.js";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | void>;

export interface IGetTotalStudentsTypes {
  _id: {
    _id: string;
    role: "student" | "teacher";
    password: string;
    name: string;
    address: string;
    email: string;
    mobileNumber: string;
    avatarUrl?: string;
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    dateOfBirth: Date;
    gender: "male" | "female" | "others";
    createdAt?: Date;
    updatedAt?: Date;
  };
}
