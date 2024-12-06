import { Document } from "mongoose";

export interface IStudentAssignment extends Document {
  _id: string;
  url?: string;
  date?: Date;
}

export interface IAssignment extends Document {
  batchId: string;
  subjectCode: string;
  title: string;
  description: string;
  date: Date;
  dueDate: Date;
  submissions: IStudentAssignment[];
  isOpen: boolean;
}
