import { Document, Types } from "mongoose";

export interface IBatch extends Document {
  _id: Types.ObjectId;
  isRunning: boolean;
  isCreatedAt: Date;
  updatedAt: Date;
  startingYear: Date
}
