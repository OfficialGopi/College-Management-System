import { Document } from "mongoose";

export interface IRoutine extends Document {
    subjectId: string;
    day: 1 | 2 | 3 | 4 | 5 | 6;
    shift: 1 | 2 | 3 | 4;
}
