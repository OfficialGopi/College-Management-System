import { model, Schema } from 'mongoose';
import { IAttendance, IStudentAttendance } from '../interfaces/IAttendance.js';

const StudentAttendanceSchema = new Schema<IStudentAttendance>({
    _id: { type: String, ref: 'StudentAcademicDetails', required: true },
    isPresent: { type: Boolean, required: true, default: false },
});

const AttendanceSchema = new Schema<IAttendance>({
    subjectId: { type: String, ref: 'Subjects', required: true },
    date: { type: Date, required: true },
    students: [ StudentAttendanceSchema ]
}, {
    timestamps: true
});

export const AttendanceModel = model<IAttendance>('Attendance', AttendanceSchema);
