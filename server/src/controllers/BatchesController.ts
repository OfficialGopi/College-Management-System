import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../utils/TryCatch.js";
import { BatchModel } from "../models/BatchModel.js";
import { ErrorHandler } from "../utils/utility-class.js";

export const postBatches = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { startingYear } = req.body
        console.log(startingYear)
        const batches = await BatchModel.findOne({ startingYear: new Date(startingYear) })
        if (batches) {
            return next(new ErrorHandler("Batch already exists", 400))
        }
        const batch = await BatchModel.create({ startingYear: new Date(startingYear) })
        return res.status(200).json({
            success: true,
            data: batch,
            message: "Batch created successfully"
        })
    }
)

export const getBatches = TryCatch(
    async (req, res, next) => {
        const batches = await BatchModel.find({ isRunning: true })
        return res.status(200).json({
            success: true,
            data: batches,
            message: "Batches fetched successfully"
        })
    }
)

export const updateBatch = TryCatch(
    async (req, res, next) => {
        const { _id } = req.params
        const { startingYear } = req.body
        const batches = await BatchModel.findOne({ startingYear: new Date(startingYear) })
        if (batches) {
            return next(new ErrorHandler("Batch already exists", 400))
        }
        const batch = await BatchModel.findByIdAndUpdate(_id, { startingYear: new Date(startingYear) })
        if (!batch) {
            return next(new ErrorHandler("Batch not found", 404))
        }
        return res.status(200).json({
            success: true,
            data: batch,
            message: "Batch updated successfully"
        })
    })

export const deleteBatch = TryCatch(
    async (req, res, next) => {
        const { _id } = req.params
        const batch = await BatchModel.findByIdAndDelete(_id)
        if (!batch) {
            return next(new ErrorHandler("Batch not found", 404))
        }
        return res.status(200).json({
            success: true,
            data: batch,
            message: "Batch deleted successfully"
        })
    }
)


export const closeBatch = TryCatch(
    async (req, res, next) => {
        const { _id } = req.params
        const batch = await BatchModel.findByIdAndUpdate(_id, { isRunning: false })
        if (!batch) {
            return next(new ErrorHandler("Batch not found", 404))
        }
        return res.status(200).json({
            success: true,
            data: batch,
            message: "Batch closed successfully"

        })
    }
)