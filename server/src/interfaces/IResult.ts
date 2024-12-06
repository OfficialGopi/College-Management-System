
import { Document } from "mongoose";

export interface IResultItem extends Document {
    _id: string;
    pointsAchieved: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 7 | 8 | 9 | 10 | 0;
    grade: "O" | "E" | "A" | "B" | "C" | "D" | "F";
}

export interface IResult extends Document {
    _id: string,
    subjects: IResultItem[];
}
