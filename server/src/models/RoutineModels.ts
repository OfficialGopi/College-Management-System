import { Schema, model } from 'mongoose';
import { IRoutine } from '../interfaces/IRoutine.js';

const RoutineSchema = new Schema<IRoutine>({
    subjectId: { type: String, ref: 'Subject', required: true },
    day: { type: Number, required: true, enum: [ 1, 2, 3, 4, 5, 6 ] },
    shift: { type: Number, required: true, enum: [ 1, 2, 3, 4 ] }
}, {
    timestamps: true
});

const RoutineModel = model<IRoutine>('Routine', RoutineSchema);
RoutineModel.createCollection();

export { RoutineModel };
