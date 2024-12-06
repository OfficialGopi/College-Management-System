import { ResultModel } from "../models/ResultModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";

export const getResult = TryCatch(
    async (req, res, next) => {
        const { _id } = req.params;
        if (!_id) {
            return next(new ErrorHandler("Invalid request", 400));
        }
        const result = await ResultModel.findById(_id).populate("_id").populate("subjects._id").exec();
        if (!result) {
            return next(new ErrorHandler("Result not found", 404));
        }
        res.status(200).json({
            success: true,
            data: result,
            message: "Result retrieved successfully"
        });
    }
)


export const postResult = TryCatch(
    async (req, res, next) => {
        const { _id, subjectId, pointsAchieved } = req.body
        if (!_id || !subjectId || !pointsAchieved) {
            return next(new ErrorHandler("Invalid request", 400));
        }
        const result = await ResultModel.findByIdAndUpdate(_id, { $push: { subjects: { _id: subjectId, pointsAchieved } } }, { new: true }).exec();
        if (!result) {
            return next(new ErrorHandler("Student Doesnot exist", 404));
        }
        return res.status(200).json({
            success: true,
            data: result,
            message: "Result added successfully"
        })
    }
)

export const deleteResult = TryCatch(
    async (req, res, next) => {
        const { _id, subjectId } = req.params;
        if (!_id || !subjectId) {
            return next(new ErrorHandler("Invalid request", 400));
        }
        const result = await ResultModel.findByIdAndUpdate(_id, { $pull: { subjects: { _id: subjectId } } }, { new: true }).exec();
        if (!result) {
            return next(new ErrorHandler("Student Doesnot exist", 404));
        }
        return res.status(200).json({
            success: true,
            data: result,
            message: "Result deleted successfully"
        })
    }
)