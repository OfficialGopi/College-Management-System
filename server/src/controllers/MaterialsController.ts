import { MaterialModel } from "../models/MaterialsModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { v2 as cloudinary } from "cloudinary";


export const getMaterials = TryCatch(
    async (req, res, next) => {
        // Your code here
        const { batchId, subjectCode } = req.params;
        const materials = await MaterialModel.find({ batchId, subjectCode });
        return res.json({
            success: true,
            data: materials,
            message: "Materials fetched successfully"
        });
    }
)

export const deleteMaterial = TryCatch(
    async (req, res, next) => {
        const { materialId } = req.params;
        const material = await MaterialModel.findOneAndDelete({ _id: materialId });
        return res.json({
            success: true,
            data: material,
            message: "Material deleted successfully"
        });
    }
)

export const addMaterial = TryCatch(
    async (req, res, next) => {
        const { batchId, subjectCode, title, description } = req.body

        const file = req.file
        if (!file) {
            return next(new ErrorHandler("Please upload a file", 400))
        }
        const fileUpload = await cloudinary.uploader.upload(file.path, {
            folder: "materials",
            resource_type: "raw",
            public_id: `${batchId}_${subjectCode}_${title}_${Date.now()}`,
        })

        const material = await MaterialModel.create({
            batchId,
            subjectCode,
            title,
            description,
            materialUrl: fileUpload.secure_url
        });

        return res.json({
            success: true,
            data: material,
            message: "Material added successfully"
        });
    }

)

