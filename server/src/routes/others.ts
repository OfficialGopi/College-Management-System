import { Router } from "express";
import {
  changeAvatar,
  getAllTeacherDetails,
  getPhoto,
  getTotalStudents,
  getTotalTeachers,
} from "../controllers/Others.js";
import multer from "multer";
import { uploadAvatar } from "../utils/multer.js";
const others = Router();

others.get("/getallstudents", getTotalStudents);
others.get("/getallstudentsdata", getTotalStudents);
others.get("/getallteachers", getTotalTeachers);
others.get("/getallteachersdetails", getAllTeacherDetails);
others.post("/changeavatar/:_id", uploadAvatar.single("avatar"), changeAvatar);
others.get("/avatar/tmp/avatar/:filename", getPhoto);

export { others };
