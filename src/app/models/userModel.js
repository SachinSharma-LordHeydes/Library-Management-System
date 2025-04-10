import mongoose from "mongoose";
import ProfileModel from "./profileModel";
import BorrowedBookModel from "./borrowedBooksModel";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 1,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default:"student",
      required:true,
      index: true,
    },
    imageURL: {
      type: String,
      required: true, ////https://ui-avatars.com/api/?name=Sachin
    },
    fine: {
      type: Number,
      default: 0,
    },
    borrowedBooks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BorrowedBookModel",
        unique:true
      },
    ],
    profile:{
      type:mongoose.Types.ObjectId,
      ref:"ProfileModel"
    }
  },
  {
    timestamps: true,
  }
);
  

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
export default UserModel;
