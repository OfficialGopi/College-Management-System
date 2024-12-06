import { createReadStream, readFile } from "fs";
import { IUser } from "../interfaces/IUser.js";
import { StudentAcademicDetailsModel } from "../models/StudentAcademicDetailsModel.js";
import { UserModel } from "../models/UserModel.js";
import { IGetTotalStudentsTypes } from "../types/types.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";
import path from "path";

export const getTotalStudents = TryCatch(async (req, res, next) => {
  const students = (await StudentAcademicDetailsModel.find().populate(
    "_id"
  )) as Array<IGetTotalStudentsTypes>;
  console.log(students.length);
  const totalStudents = students.length;
  let male = 0;
  let female = 0;
  let others = 0;
  for (const student of students) {
    if (student._id.gender === "male") {
      male += 1;
    } else if (student._id.gender === "female") {
      female += 1;
    } else {
      others += 1;
    }
  }
  return res.json({
    success: true,
    data: {
      totalStudents,
      male,
      female,
      others,
    },
    message: "Total students fetched successfully",
  });
});

export const getTotalTeachers = TryCatch(async (req, res, next) => {
  const teachers = await UserModel.find({ role: "teacher" });
  const totalTeachers = teachers.length;
  return res.json({
    success: true,
    data: {
      totalTeachers,
    },
    message: "Total teachers fetched successfully",
  });
});

export const getAllTeacherDetails = TryCatch(async (req, res, next) => {
  const teachers = await UserModel.find({ role: "teacher" });

  return res.json({
    success: true,
    data: {
      teachers,
    },
    message: "Total teachers fetched successfully",
  });
});

export const changeAvatar = TryCatch(async (req, res, next) => {
  const file = req.file;
  const { _id } = req.params;
  if (!file || !_id) {
    throw new ErrorHandler("Field Empty", 400);
  }
  const user = await UserModel.findById(_id);
  if (!user) {
    throw new ErrorHandler(`User not found`, 404);
  }
  console.log(file.path);
  let path = "";
  for (let i = 0; i < file.path.length; i++) {
    if (file.path[i] === "\\") {
      path += "/";
    } else {
      path += file.path[i];
    }
  }
  user.avatarUrl = "http://localhost:8080/api/v1/others/avatar/" + path;
  console.log(user.avatarUrl);
  await user.save();
  return res.json({
    success: true,
    data: {
      avatar: file,
    },
    message: "Avatar uploaded successfully",
  });
});

export const getPhoto = TryCatch(async (req, res, next) => {
  const { filename } = req.params;
  console.log(filename);
  if (!filename) {
    return res.send(404);
  }
  res.sendFile(path.join(process.cwd(), `tmp/avatar/${filename}`));
});
