import { Router } from "express";
import { ErrorHandler } from "../utils/utility-class.js";
import { TryCatch } from "../utils/TryCatch.js";

const admin = Router();

admin.post(
  "/login",
  TryCatch(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(
        new ErrorHandler("Please provide both username and password", 400)
      );
    }

    // Perform authentication logic here
    if (
      !(
        username == process.env.ADMIN_USERNAME &&
        password == process.env.ADMIN_PASSWORD
      )
    ) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    return res.json({
      success: true,
      message: "Login successful",
      data: {
        role: "admin",
      },
    });
  })
);

export { admin };
