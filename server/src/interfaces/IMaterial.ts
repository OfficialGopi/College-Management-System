import { Document, Types } from "mongoose";

export interface IMaterial extends Document {
    batchId: Types.ObjectId;
    subjectCode: string;
    title: string;
    description: string;
    materialUrl: string;
    date?: Date;
}
