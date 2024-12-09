import { Router } from "express";
import {
  deleteAllNotices,
  deleteOneNotice,
  getNotices,
  postNotices,
  updateNotices,
} from "../controllers/NoticesController.js";

const notices = Router();

notices.get("/", getNotices);

notices.post("/", postNotices);
notices.put("/:id", updateNotices);

notices.delete("/", deleteAllNotices);
notices.delete("/one/:id", deleteOneNotice);

export { notices };
