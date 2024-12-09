import { Router } from "express";
import {
  addTeacher,
  deleteSubject,
  getSubject,
  getSubjectBySem,
  postSubject,
  removeTeacher,
  updateSubject,
} from "../controllers/SubjectsController.js";

const subject = Router();

subject.get("/", getSubject);
subject.get("/:department/:semester", getSubjectBySem);

subject.post("/", postSubject);

subject.put("/teacher/:_id", addTeacher);
subject.put("/:_id", updateSubject);

subject.delete("/teacher/:_id", removeTeacher);
subject.delete("/", deleteSubject);
subject.delete("/:_id", deleteSubject);

export { subject };
