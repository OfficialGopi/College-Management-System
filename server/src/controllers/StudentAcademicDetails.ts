import { BatchModel } from "../models/BatchModel.js";
import { ResultModel } from "../models/ResultModel.js";
import { StudentAcademicDetailsModel } from "../models/StudentAcademicDetailsModel.js";
import { SubjectModel } from "../models/SubjectModel.js";
import { UserModel } from "../models/UserModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";

export const getStudent = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const student = await StudentAcademicDetailsModel.findOne({ _id: _id })
    .populate("_id")
    .populate("batchId")
    .exec();
  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }
  return res.json({
    success: true,
    data: student,
    message: "Student fetched successfully",
  });
});
export const postStudent = TryCatch(async (req, res, next) => {
  const { _id, batchId, department, semester = 1 } = req.body;
  if (!(_id && batchId && department && semester)) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  const isStudentExists = await UserModel.findOne({
    _id: _id,
    role: "student",
  });
  if (!isStudentExists) {
    return next(new ErrorHandler("_id doesnot exist as user", 400));
  }
  const student = await StudentAcademicDetailsModel.findOne({ _id });
  if (student) {
    return next(new ErrorHandler("Student already exists", 404));
  }
  const isBatchExists = await BatchModel.findById(batchId);
  if (!isBatchExists) {
    return next(new ErrorHandler("Batch doesnot exists", 404));
  }
  const newStudent = await StudentAcademicDetailsModel.create({
    _id,
    batchId,
    department,
    semester,
  });
  const resultCreate = await ResultModel.create({
    _id: _id,
    subjects: [],
  });
  return res.json({
    success: true,
    data: newStudent,
    message: "Student created successfully",
  });
});
export const updateStudent = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const { batchId, department, semester } = req.body;
  if (!(_id && batchId && department && semester)) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  const student = await StudentAcademicDetailsModel.findOne({ _id });
  if (!student) {
    return next(new ErrorHandler("Student doesnot exists", 404));
  }
  const isBatchExists = await BatchModel.findById(batchId);
  if (!isBatchExists) {
    return next(new ErrorHandler("Batch doesnot exists", 404));
  }
  if (student.batchId != batchId) {
    student.batchId = batchId;
  }
  if (student.department != department) {
    student.department = department;
  }
  if (student.semester != semester) {
    student.semester = semester;
  }

  const newStudent = await student.save();
  return res.json({
    success: true,
    data: newStudent,
    message: "Student updated successfully",
  });
});
export const deleteStudent = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const student = await StudentAcademicDetailsModel.findOneAndDelete({ _id });
  if (!student) {
    return next(new ErrorHandler("Student doesnot exists", 404));
  }
  return res.json({
    success: true,
    data: student,
    message: "Student deleted successfully",
  });
});

export const updateStatusToLeft = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const student = await StudentAcademicDetailsModel.findOneAndUpdate(
    { _id },
    { status: "Left" },
    { new: true }
  );
  if (!student) {
    return next(new ErrorHandler("Student doesnot exists", 404));
  }
  return res.json({
    success: true,
    data: student,
    message: "Student status updated to left successfully",
  });
});
export const updateStatusToGraduated = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const student = await StudentAcademicDetailsModel.findOneAndUpdate(
    { _id },
    { status: "Graduated" },
    { new: true }
  );
  if (!student) {
    return next(new ErrorHandler("Student doesnot exists", 404));
  }
  return res.json({
    success: true,
    data: student,
    message: "Student status updated to left successfully",
  });
});
