import { Document } from "mongoose";

export interface INotice extends Document {
  date: Date;
  title: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}
