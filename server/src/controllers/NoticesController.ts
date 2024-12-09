import { NoticeModel } from "../models/NoticesModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/utility-class.js";

export const getNotices = TryCatch(async (req, res, next) => {
  const notices = (await NoticeModel.find({}))
    .filter(
      (notice) =>
        notice.createdAt.getDate() === new Date().getDate() &&
        notice.createdAt.getMonth() === new Date().getMonth() &&
        notice.createdAt.getFullYear() === new Date().getFullYear()
    )

    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return res.json({
    message: "Notices fetched successfully",
    data: notices,
    success: true,
  });
});

export const postNotices = TryCatch(async (req, res, next) => {
  const { title, details } = req.body;
  if (!title || !details)
    next(new ErrorHandler("Title and content are required", 400));
  const newNotice = new NoticeModel({ title, details });
  const Notice = await newNotice.save();
  return res.status(200).json({
    message: "Notice created successfully",
    data: Notice,
    success: true,
  });
});

export const updateNotices = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { title, details } = req.body;
  if (!title || !details)
    next(new ErrorHandler("Title and content are required", 400));
  const updatedNotice = await NoticeModel.findByIdAndUpdate(
    id,
    { title, details },
    { new: true }
  );
  if (!updatedNotice) return next(new ErrorHandler("Notice not found", 400));
  return res.status(200).json({
    message: "Notice updated successfully",
    data: updatedNotice,
    success: true,
  });
});

export const deleteOneNotice = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const deletedNotice = await NoticeModel.findByIdAndDelete(id);
  if (!deletedNotice) return next(new ErrorHandler("Notice not found", 400));
  return res.status(200).json({
    message: "Notice deleted successfully",
    success: true,
    data: deletedNotice,
  });
});

export const deleteAllNotices = TryCatch(async (req, res, next) => {
  const notices = await NoticeModel.deleteMany({});
  return res.status(200).json({
    message: "All notices deleted successfully",
    success: true,
    data: notices,
  });
});
