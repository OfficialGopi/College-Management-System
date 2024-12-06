import { NextFunction, Request, Response } from "express";
import { IUserReqBody } from "../interfaces/IUser.js";
import { TryCatch } from "../utils/TryCatch.js";
import { UserModel } from "../models/UserModel.js";
import { ErrorHandler } from "../utils/utility-class.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StudentAcademicDetailsModel } from "../models/StudentAcademicDetailsModel.js";

export const postUser = TryCatch(
  async (
    req: Request<{}, {}, IUserReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      _id,
      name,
      role,
      bloodGroup,
      address,
      dateOfBirth,
      mobileNumber,
      email,
      gender,
    } = req.body;

    if (
      !_id ||
      !gender ||
      !name ||
      !role ||
      !bloodGroup ||
      !address ||
      !dateOfBirth ||
      !mobileNumber ||
      !email
    ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const password = `${
      new Date(dateOfBirth).getDate().toString().length === 1 ? "0" : ""
    }${new Date(dateOfBirth).getDate().toString()}${
      (new Date(dateOfBirth).getMonth() + 1).toString().length === 1 ? "0" : ""
    }${(new Date(dateOfBirth).getMonth() + 1).toString()}${new Date(
      dateOfBirth
    ).getFullYear()}`;

    const user = new UserModel({
      _id,
      name,
      password,
      role,
      bloodGroup,
      address,
      dateOfBirth: new Date(dateOfBirth),
      mobileNumber,
      email,
      gender,
    });
    const saved = await user.save();
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: saved,
    });
  }
);

export const getToken = TryCatch(
  async (
    req: Request<
      {},
      {},
      {},
      {
        _id?: string;
        password?: string;
        role?: string;
      }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { _id, password, role } = req.query;

    if (!_id || !password || !role) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const user = await UserModel.findById(_id).select(["password", "role"]);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    if (user.role !== role) {
      return next(new ErrorHandler("Invalid Input", 401));
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid password", 401));
    }
    if (user.role === "student") {
      const student = await StudentAcademicDetailsModel.findOne({ _id });
      if (!student) {
        return next(
          new ErrorHandler("Student Academic Details not found", 404)
        );
      }
    }
    const secret: string = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user._id }, secret);

    return res.json({ token });
  }
);

export const getUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token: string = authorization as string;
    if (!token) {
      return next(new ErrorHandler("Token is required", 401));
    }
    const { id } = <{ id: string }>(
      jwt.verify(token, process.env.JWT_SECRET as string)
    );

    if (!id) {
      return next(new ErrorHandler("Invalid token", 401));
    }
    const user = await UserModel.findById(id).select([
      "_id",
      "name",
      "role",
      "bloodGroup",
      "address",
      "dateOfBirth",
      "mobileNumber",
      "email",
      "gender",
      "avatarUrl",
    ]);
    if (!user) {
      return next(new ErrorHandler("Token Invalid", 404));
    }
    if (user.role === "student") {
      const student = await StudentAcademicDetailsModel.findOne({ _id: id })
        .select(["batchId", "department", "semester"])
        .populate("batchId");
      if (!student) {
        return next(
          new ErrorHandler("User does not have student details", 404)
        );
      }
      return res.json({
        _id: user._id,
        name: user.name,
        role: user.role,
        bloodGroup: user.bloodGroup,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        mobileNumber: user.mobileNumber,
        email: user.email,
        gender: user.gender,
        avatarUrl: user.avatarUrl,
        batchId: student.batchId,
        department: student.department,
        semester: student.semester,
      });
    }
    return res.json(user);
  }
);

export const updateUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const {
      name,
      address,
      bloodGroup,
      dateOfBirth,
      mobileNumber,
      email,
      avatarUrl,
      gender,
    } = req.body;
    const user = await UserModel.findById(_id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.name != name) {
      user.name = name;
    }
    if (user.address != address) {
      user.address = address;
    }
    if (user.bloodGroup != bloodGroup) {
      user.bloodGroup = bloodGroup;
    }
    if (user.dateOfBirth != dateOfBirth) {
      user.dateOfBirth = dateOfBirth;
    }
    if (user.mobileNumber != mobileNumber) {
      user.mobileNumber = mobileNumber;
    }
    if (user.email != email) {
      user.email = email;
    }
    if (user.avatarUrl != avatarUrl) {
      user.avatarUrl = avatarUrl;
    }
    if (user.gender != gender) {
      user.gender = gender;
    }

    const newUserData = await user.save();
    res.status(200).json({ success: true, data: newUserData });
  }
);

export const forgetPassword = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      _id,
      role,
      email,
      mobileNumber,
      bloodGroup,
      dateOfBirth,
      password,
      forgetPassword,
    } = req.body;
    if (
      !(
        _id &&
        role &&
        email &&
        mobileNumber &&
        bloodGroup &&
        dateOfBirth &&
        password &&
        forgetPassword
      )
    ) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }
    const user = await UserModel.findById(_id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    if (
      user.role != role &&
      user.email != email &&
      user.mobileNumber != mobileNumber &&
      user.dateOfBirth != dateOfBirth
    ) {
      return next(new ErrorHandler("Invalid user", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid password", 404));
    }

    const isMatchForgetpass = await bcrypt.compare(
      forgetPassword,
      user.password
    );
    if (isMatchForgetpass) {
      return next(
        new ErrorHandler("New Password can not be old password", 404)
      );
    }
    user.password = forgetPassword;

    const newUserData = await user.save();
    res.status(200).json({ success: true, data: newUserData });
  }
);

export const deleteUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;
    if (!_id) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }
    const user = await UserModel.findById(_id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  }
);
