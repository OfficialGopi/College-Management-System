import mongoose, { model, Schema } from 'mongoose';
import { IStudentAcademicDetails } from '../interfaces/IStudentAcademicDetails.js';

const StudentAcademicDetailsSchema = new Schema({
    _id: { type: String, ref: 'Users', required: true },
    batchId: { type: Schema.Types.ObjectId, ref: 'Batches', required: true },
    department: { type: String, required: true, enum: [ 'CSE', 'IT', 'LT' ] },
    semester: { type: Number, required: true, enum: [ 1, 2, 3, 4, 5, 6, 7, 8 ] },
    status: { type: String, required: true, enum: [ 'Studying', 'Graduated', 'Left' ], default: 'Studying' },
}, {
    timestamps: true
});


const StudentAcademicDetailsModel = model<IStudentAcademicDetails>(
    'StudentAcademicDetails',
    StudentAcademicDetailsSchema
);

export { StudentAcademicDetailsModel };

