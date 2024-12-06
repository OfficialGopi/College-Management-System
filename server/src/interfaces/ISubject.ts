import { Document } from "mongoose";

export interface ISubject extends Document {
  _id: string;
  subjectName: string;
  department: "CSE" | "IT" | "LT";
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  credit: number;
  type: "Theory" | "Practical";
  teacher?: string;
}
