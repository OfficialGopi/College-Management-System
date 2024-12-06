import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser.js";
import bcrypt from "bcryptjs";
import { ErrorHandler } from "../utils/utility-class.js";

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: [ "student", "teacher" ]
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: [ "male", "female", "others" ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String,
        default: "https://www.gravatar.com/avatar?d=identicon&s=200"
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: [ "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ]
    }
}, {
    timestamps: true,
})






UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(null)

    try {
        this.password = await bcrypt.hash(this.password, 10)

    } catch (error) {
        next(new ErrorHandler("Failed to hash password", 500))
    }
})


const UserModel = model<IUser>("Users", UserSchema);



export { UserModel };