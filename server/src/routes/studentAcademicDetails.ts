import { Router } from "express";
import { deleteStudent, getStudent, postStudent, updateStatusToGraduated, updateStatusToLeft, updateStudent } from "../controllers/StudentAcademicDetails.js";
const studentAcademicDetails = Router();



studentAcademicDetails.get("/:_id", getStudent)
studentAcademicDetails.post("/", postStudent)
studentAcademicDetails.put("/:_id", updateStudent)
studentAcademicDetails.put("/statustoleft/:_id", updateStatusToLeft)
studentAcademicDetails.put("/statustograduated/:_id", updateStatusToGraduated)
studentAcademicDetails.delete("/:_id", deleteStudent)





export { studentAcademicDetails }











