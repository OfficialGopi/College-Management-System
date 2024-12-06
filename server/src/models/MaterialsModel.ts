import mongoose, { model, Schema, Document, Mongoose } from 'mongoose';
import { IMaterial } from '../interfaces/IMaterial.js';

const MaterialSchema = new Schema<IMaterial>({
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    subjectCode: { type: String, ref: 'Subject', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    materialUrl: { type: String, required: true },
    date: { type: Date, default: new Date() }
},
    {
        timestamps: true
    });

const MaterialModel = model<IMaterial>('Material', MaterialSchema);

export { MaterialModel };
