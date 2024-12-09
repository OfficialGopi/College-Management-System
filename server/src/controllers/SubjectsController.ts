import { NextFunction, Request, Response } from "express";
import { SubjectModel } from "../models/SubjectModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { UserModel } from "../models/UserModel.js";

export const postSubject = TryCatch(
  async (
    req: Request<
      {},
      {},
      {
        _id: string;
        subjectName: string;
        department: "CSE" | "IT" | "LT";
        semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
        type: "Theory" | "Practical";
        credit: number;
      }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { _id, subjectName, department, semester, type, credit } = req.body;
    if (!(_id && subjectName && department && semester && type && credit)) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }
    const isExist = await SubjectModel.findOne({ _id });
    if (isExist) {
      return next(new ErrorHandler("SubjectCode already exist", 400));
    }
    const subject = await SubjectModel.create({
      _id,
      subjectName,
      department,
      semester,
      type,
      credit,
    });
    const result = await subject.save();
    return res.status(201).json({
      message: "Subject created successfully",
      data: result,
      success: true,
    });
  }
);

export const getSubject = TryCatch(async (req, res, next) => {
  const subjects = await SubjectModel.find({}).sort({
    semester: 1,
    credit: -1,
  });
  return res.status(200).json({
    success: true,
    data: subjects,
    message: "Subjects fetched successfully",
  });
});

export const getSubjectBySem = TryCatch(async (req, res, next) => {
  const { semester, department } = req.params;

  const subjects = await SubjectModel.find({ department, semester })
    .sort({
      semester: 1,
      credit: -1,
    })
    .populate(["teacher"]);
  return res.status(200).json({
    success: true,
    data: subjects,
    message: "Subjects fetched successfully",
  });
});

export const updateSubject = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const { subjectName, department, semester, type, credit } = req.body;

  if (!(_id && subjectName && department && semester && type && credit)) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const subject = await SubjectModel.findById(_id);
  if (!subject) {
    return next(new ErrorHandler("Subject not found", 404));
  }

  if (subject.subjectName !== subjectName) {
    subject.subjectName = subjectName;
  }
  if (subject.department !== department) {
    subject.department = department;
  }
  if (subject.semester !== semester) {
    subject.semester = semester;
  }
  if (subject.type !== type) {
    subject.type = type;
  }
  if (subject.credit !== credit) {
    subject.credit = credit;
  }
  const newSubject = await subject.save();

  return res.status(200).json({
    success: true,
    data: newSubject,
    message: "Subject updated successfully",
  });
});

export const deleteSubject = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const subject = await SubjectModel.findByIdAndDelete(_id);
  if (!subject) {
    return next(new ErrorHandler("Subject not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: subject,
    message: "Subject deleted successfully",
  });
});

export const addTeacher = TryCatch(async (req, res, next) => {
  const { _id } = req.params;

  const { teacher } = req.body;
  if (!teacher) {
    return next(new ErrorHandler("Teacher ID is required", 400));
  }
  const subject = await SubjectModel.findById(_id);
  if (!subject || subject.teacher === teacher) {
    return next(
      new ErrorHandler(
        "Subject not found or Teacher Already added to subject ",
        404
      )
    );
  }
  const teacherExists = await UserModel.findOne({
    _id: teacher,
    role: "teacher",
  });
  if (!teacherExists) {
    return next(new ErrorHandler("Teacher not found", 404));
  }
  subject.teacher = teacher;
  const newSubject = await subject.save();
  return res.status(200).json({
    success: true,
    data: newSubject,
    message: "Teacher added successfully to subject",
  });
});

export const removeTeacher = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const subject = await SubjectModel.findById(_id);
  if (!subject || !subject.teacher) {
    return next(
      new ErrorHandler(
        "Subject not found or Teacher not added to subject ",
        404
      )
    );
  }
  delete subject["teacher"];
  const newSubject = await subject.save();
  return res.status(200).json({
    success: true,
    data: newSubject,
    message: "Teacher added successfully to subject",
  });
});
