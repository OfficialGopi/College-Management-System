import { model, Schema } from "mongoose";
import { IBatch } from "../interfaces/IBatch.js";

const BatchSchema = new Schema({
  isRunning: {
    type: Boolean,
    required: true,
    default: true
  },
  startingYear: {
    type: Date,
    required: true,
    unique: true,
  }
},
  {
    timestamps: true,
  },
);

const BatchModel = model<IBatch>("Batches", BatchSchema);
export { BatchModel };
