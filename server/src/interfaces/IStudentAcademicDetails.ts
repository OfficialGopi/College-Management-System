import { Document, Types } from "mongoose";

export interface IStudentAcademicDetails extends Document {
  _id: String;
  batchId: Types.ObjectId;
  department: 'CSE' | 'IT' | 'LT';
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  status: 'Studying' | 'Graduated' | 'Left';
  createdAt: Date;
  updatedAt: Date;
}
