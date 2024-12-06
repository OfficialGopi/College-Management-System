import { Router } from "express";
import { upload } from "../utils/multer.js";
import { addMaterial, deleteMaterial, getMaterials } from "../controllers/MaterialsController.js";

const materials = Router();

materials.get('/:batchId/:subjectCode', getMaterials)
materials.post('/', upload.single('file'), addMaterial)
materials.delete('/:materialId', deleteMaterial)



export { materials }