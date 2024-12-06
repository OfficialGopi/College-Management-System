import { Document } from "mongoose";

export interface IUser extends Document {
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
}

export interface IUserReqBody {
  _id: string;
  role: "student" | "teacher";
  password: string;
  name: string;
  gender: "male" | "female";
  address: string;
  email: string;
  mobileNumber: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  dateOfBirth: Date;
  avatarUrl?: string;
}



