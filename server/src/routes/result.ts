import { Router } from "express";
import { deleteResult, getResult, postResult } from "../controllers/ResultController.js";

const result = Router()


result.get("/:_id", getResult)
result.post("/", postResult)
result.delete("/:_id/:subjectId", deleteResult)






export { result }