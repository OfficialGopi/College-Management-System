import { Router } from "express";
import { upload } from "../utils/multer.js";
import { assignmentCreate, assignmentList, assignmentListStudent, assignmentSubmit, deleteAssignment, updateAssignment } from "../controllers/AssignmentsController.js";
const assignments = Router()


assignments.put('/:assignmentId/:_id', upload.single('file'), updateAssignment)
assignments.post('/create', assignmentCreate)
assignments.post('/submit', upload.single('file'), assignmentSubmit)
assignments.get('/:batchId/:subjectCode', assignmentList)
assignments.get('/:batchId/:_id/:subectCode', assignmentListStudent)
assignments.delete('/:assignmentId', deleteAssignment)







export { assignments }