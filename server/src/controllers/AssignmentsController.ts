import { IStudentAssignment } from "../interfaces/IAssignment.js";
import { AssignmentModel } from "../models/AssignmentModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { v2 as cloudinary } from "cloudinary";

export const assignmentCreate = TryCatch(async (req, res, next) => {
  const { batchId, subjectCode, title, description, dueDate } = req.body;

  // Check for missing fields
  if (!(batchId && subjectCode && title && description && dueDate)) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Validate due date format and future date
  const dueDateObject = new Date(dueDate);
  if (isNaN(dueDateObject.getTime()) || dueDateObject <= new Date()) {
    return next(new ErrorHandler("Due date must be a valid future date", 400));
  }

  // Create assignment
  const assignment = await AssignmentModel.create({
    batchId,
    subjectCode,
    title,
    description,
    dueDate: dueDateObject,
    submissions: [],
  });

  return res.status(201).json({
    success: true,
    message: "Assignment created successfully",
    assignment,
  });
});

export const assignmentList = TryCatch(async (req, res, next) => {
  const { subjectCode, batchId } = req.params;
  const assignments = await AssignmentModel.find({ subjectCode, batchId });
  return res.status(200).json({
    success: true,
    data: assignments,
    message: "Assignments fetched successfully",
  });
});

export const assignmentListStudent = TryCatch(async (req, res, next) => {
  const { _id, subjectCode, batchId } = req.params;

  // Validate required parameters
  if (!_id || !subjectCode || !batchId) {
    return next(
      new ErrorHandler("Student ID and subject code are required", 400)
    );
  }

  // Fetch assignments by subject code
  const assignments = await AssignmentModel.find({ subjectCode, batchId })
    .populate("submissions", "_id url date") // Populate only needed fields in submissions
    .exec();

  // Filter to include only the specific student's submissions
  const studentAssignments = assignments
    .map((assignment) => {
      const studentSubmission = assignment.submissions.find(
        (submission) => submission._id.toString() === _id
      );

      // Only return assignment if the student has a submission for it
      return studentSubmission
        ? {
            ...assignment.toObject(),
            submissions: [studentSubmission], // Include only this student's submission
          }
        : null;
    })
    .filter(Boolean); // Remove assignments where the student has no submissions

  return res.status(200).json({
    success: true,
    message: "Assignments retrieved successfully",
    assignments: studentAssignments,
  });
});

export const assignmentSubmit = TryCatch(async (req, res, next) => {
  const { batchId, subjectCode, assignmentId, _id } = req.body;

  if (!(batchId && subjectCode && assignmentId && _id)) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment) {
    return next(new ErrorHandler("Assignment not found", 404));
  }

  if (!assignment.isOpen) {
    return next(new ErrorHandler("Assignment is not open for submission", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  // Upload file to Cloudinary
  const upload = await cloudinary.uploader.upload(req.file.path, {
    folder: "/cms/assignments",
    resource_type: "raw",
    public_id: `${assignmentId}_${_id}`,
    overwrite: true,
  });

  // Check for existing submission
  if (assignment.submissions.some((sub) => sub._id.toString() === _id)) {
    return next(
      new ErrorHandler("Student has already submitted this assignment", 400)
    );
  }

  // Add new submission
  assignment.submissions.push(<IStudentAssignment>{
    _id,
    url: upload.secure_url,
    date: new Date(),
  });

  await assignment.save();

  return res.status(201).json({
    success: true,
    message: "Assignment submitted successfully",
    assignment,
  });
});

export const deleteAssignment = TryCatch(async (req, res, next) => {
  const { assignmentId } = req.params;
  if (!assignmentId) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const assignment = await AssignmentModel.findByIdAndDelete(assignmentId);
  if (!assignment) {
    return next(new ErrorHandler("Assignment not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Assignment deleted successfully",
    assignment,
  });
});

export const updateAssignment = TryCatch(async (req, res, next) => {
  const { assignmentId, _id } = req.params;

  if (!assignmentId) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("Please upload a file", 400));
  }

  // Check if assignment exists
  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment) {
    return next(new ErrorHandler("Assignment not found", 404));
  }

  // Find the specific submission by ID
  const target = assignment.submissions.find(
    (sub) => sub._id.toString() === _id
  );
  if (!target) {
    return next(new ErrorHandler("Submission not found", 404));
  }

  // Upload file to Cloudinary and update the submission URL
  const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "raw",
    upload_preset: "assignment",
  });
  target.url = uploadResult.secure_url;

  // Save the updated assignment
  const updatedAssignment = await assignment.save();

  return res.status(200).json({
    message: "Assignment updated successfully",
    data: updatedAssignment,
    success: true,
  });
});
