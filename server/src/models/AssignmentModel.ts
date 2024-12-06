import { model, Schema } from 'mongoose';
import { IAssignment, IStudentAssignment } from '../interfaces/IAssignment.js';

const StudentAssignmentSchema = new Schema<IStudentAssignment>({
    _id: {
        type: String,
        ref: 'StudentAcademicDetails',
        required: true
    },
    url: String,
    date: Date
});

const AssignmentSchema = new Schema<IAssignment>({
    batchId: {
        type: String,
        ref: 'Batches',
        required: true
    },
    subjectCode: {
        type: String,
        required: true,
        ref: 'Subjects'
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    submissions: [ StudentAssignmentSchema ],
    isOpen: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const AssignmentModel = model<IAssignment>('Assignments', AssignmentSchema);

export { AssignmentModel };
