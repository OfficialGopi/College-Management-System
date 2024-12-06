import { Router } from "express";
import { getBatches, postBatches, updateBatch, deleteBatch, closeBatch } from "../controllers/BatchesController.js";

const batches = Router();



batches.get("/", getBatches);
batches.post("/", postBatches);
batches.put("/:_id", updateBatch);
batches.delete("/:_id", deleteBatch)
batches.put("/close/:_id", closeBatch)





export { batches }



