import { Document, Types } from "mongoose";

export interface IStudentAttendance extends Document {
  _id: string;
  isPresent: boolean;
}

export interface IAttendance extends Document {
  batchId: Types.ObjectId;
  teacherId: string;
  subjectId: string;
  date: Date;
  students: IStudentAttendance[];
}
