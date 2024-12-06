import multer from "multer";
import { ErrorHandler } from "./utility-class.js";

const storagePdf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".pdf"); // renaming the file to original name + current timestamp +.pdf)
  },
});

export const upload = multer({
  storage: storagePdf,
  fileFilter(req, file, cb) {
    if (!file) {
      return cb(new ErrorHandler("No file uploaded", 400));
    }
    if (file.mimetype != "application/pdf") {
      return cb(new ErrorHandler("Please upload a PDF file", 400));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/avatar/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploadAvatar = multer({
  storage: storageAvatar,
  fileFilter(req, file, cb) {
    if (!file) {
      return cb(new ErrorHandler("No file uploaded", 400));
    }
    if (!file.mimetype.startsWith("image/")) {
      return cb(new ErrorHandler("Please upload a Image file", 400));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});
