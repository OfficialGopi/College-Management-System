import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { user } from "./routes/user.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectDb } from "./utils/features.js";
import { admin } from "./routes/admin.js";
import { notices } from "./routes/notices.js";
import { batches } from "./routes/batches.js";
import { subject } from "./routes/subjects.js";
import { studentAcademicDetails } from "./routes/studentAcademicDetails.js";
import { routine } from "./routes/routine.js";
import { result } from "./routes/result.js";
import { attendence } from "./routes/attendence.js";
import { upload } from "./utils/multer.js";
import bodyParser from "body-parser";
import { assignments } from "./routes/assignments.js";
import { v2 as cloudinary } from "cloudinary";
import { materials } from "./routes/materials.js";
import { others } from "./routes/others.js";
import path from "path";

const app = express();

dotenv.config();
connectDb();
cloudinary.config({
  cloud_name: process.env.API_CLOUD_NAME,
  api_key: process.env.API_CLOUD_KEY,
  api_secret: process.env.API_CLOUD_SECRET,
  secure: true,
});
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  try {
    throw {
      name: "hello",
    };
  } catch (err) {
    res.json(err);
  }
});

app.use("/api/v1/user", user);
app.use("/api/v1/admin", admin);
app.use("/api/v1/notices", notices);
app.use("/api/v1/batches", batches);
app.use("/api/v1/subjects", subject);
app.use("/api/v1/studentacademicdetails", studentAcademicDetails);
app.use("/api/v1/routine", routine);
app.use("/api/v1/result", result);
app.use("/api/v1/attendence", attendence);
app.use("/api/v1/assignments", assignments);
app.use("/api/v1/materials", materials);
app.use("/api/v1/others", others);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => console.log(process.env.PORT));
