import { ISubject } from "../interfaces/ISubject.js";
import { RoutineModel } from "../models/RoutineModels.js";
import { SubjectModel } from "../models/SubjectModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";

export const getRoutineBySubject = TryCatch(async (req, res, next) => {
  const { subjects } = req.body;
  const routine = await RoutineModel.find({ subjectId: { $in: subjects } })
    .populate("subjectId")
    .exec();
  if (!routine) {
    return next(new ErrorHandler("Routine not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: routine,
    message: "Routine fetched successfully",
  });
});
export const getRoutineBySemesterAndDept = TryCatch(async (req, res, next) => {
  const { semester, department } = req.params;
  const routines = (await RoutineModel.find({})
    .populate("subjectId")
    .exec()) as unknown as Array<{
    subjectId: {
      _id: string;
      subjectName: string;
      department: "CSE" | "IT" | "LT";
      semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      credit: number;
      type: "Theory" | "Practical";
      teacher: string;
    };
    day: number;
    shift: number;
  }>;
  const routine = routines.filter(
    (r) =>
      r.subjectId.semester === Number(semester) &&
      r.subjectId.department === department
  );
  if (!routine) {
    return next(new ErrorHandler("Routine not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: routine,
    message: "Routine fetched successfully",
  });
});

export const postRoutine = TryCatch(async (req, res, next) => {
  const { subjectId, day, shift } = req.body;
  const alreadyExist = await RoutineModel.findOne({ subjectId, day, shift });
  if (alreadyExist) {
    return next(new ErrorHandler("Routine already exist", 400));
  }
  const isTeacherAssigned = await SubjectModel.findById(subjectId);
  if (!isTeacherAssigned || !isTeacherAssigned.teacher) {
    return next(
      new ErrorHandler(
        "Teacher not assigned to subject or Subject not Ezist",
        400
      )
    );
  }
  const { teacher } = isTeacherAssigned;

  const teacherTimeAssignedAll = (await RoutineModel.find({ day, shift })
    .populate("subjectId")
    .exec()) as unknown as Array<{
    subjectId: {
      _id: string;
      subjectName: string;
      department: "CSE" | "IT" | "LT";
      semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      credit: number;
      type: "Theory" | "Practical";
      teacher: string;
    };
    day: number;
    shift: number;
  }>;
  const teacherTimeAssigned = teacherTimeAssignedAll.filter(
    (routine) => routine.subjectId.teacher === teacher
  );
  if (teacherTimeAssigned.length > 0) {
    return next(new ErrorHandler("Teacher already assigned to this time", 400));
  }
  const routine = await RoutineModel.create({ subjectId, day, shift });
  return res.status(200).json({
    success: true,
    data: routine,
    message: "Routine created successfully",
  });
});

export const deleteRoutine = TryCatch(async (req, res, next) => {
  const { subjectId, day, shift } = req.params;
  if (!subjectId || !day || !shift) {
    return next(new ErrorHandler("Invalid request", 400));
  }
  const routine = await RoutineModel.findOneAndDelete({
    subjectId,
    day,
    shift,
  });
  if (!routine) {
    return next(new ErrorHandler("Routine not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: routine,
    message: "Routine deleted successfully",
  });
});
