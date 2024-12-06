import mongoose, { Schema, Document } from 'mongoose';
import { IResult, IResultItem } from '../interfaces/IResult.js';

const ResultItemSchema = new Schema<IResultItem>({
    _id: { type: String, ref: 'Subjects', required: true },
    pointsAchieved: { type: Number, required: true, enum: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] },
}, {
    timestamps: true,
});
ResultItemSchema.virtual('grade').get(function () {
    if (this.pointsAchieved == 10) {
        return 'O'
    }
    if (this.pointsAchieved == 9) {
        return 'E'
    }
    if (this.pointsAchieved == 8) {
        return 'A'
    }
    if (this.pointsAchieved == 7) {
        return 'B'
    }
    if (this.pointsAchieved == 6) {
        return 'C'
    }
    if (this.pointsAchieved == 5) {
        return 'D'
    }
    if (this.pointsAchieved < 5) {
        return 'F'
    }
})

const ResultSchema = new Schema<IResult>({
    _id: {
        type: String,
        required: true,
        unique: true,
        ref: 'StudentAcademicDetails',
    },
    subjects: [ ResultItemSchema ]
});

const ResultModel = mongoose.model<IResult>('Result', ResultSchema);

export { ResultModel };
