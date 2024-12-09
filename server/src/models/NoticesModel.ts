import { Schema, model } from "mongoose";
import { INotice } from "../interfaces/INotice.js";

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const NoticeModel = model<INotice>("Notice", NoticeSchema);
NoticeModel.createCollection();
export { NoticeModel };
