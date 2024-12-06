import { model, Schema } from 'mongoose'
import { ISubject } from '../interfaces/ISubject.js'

const SubjectSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    subjectName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
        enum: [ "CSE", "IT", "LT" ]
    },
    semester: {
        type: Number,
        required: true,
        enum: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
    },
    type: {
        type: String,
        required: true,
        enum: [ 'Theory', 'Practical' ]
    },
    credit: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    teacher: {
        type: String,
        ref: 'Users'
    }
},
    {
        timestamps: true
    }
)


const SubjectModel = model<ISubject>('Subjects', SubjectSchema)

SubjectModel.createCollection()
export { SubjectModel }