import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 1,
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
      required: true,
      index: true,
    },
    // contactNumber: {
    //   type: String,
    //   required: true,
    //   minLength: 10,
    //   maxLength: 10,
    //   match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
    // },
    imageURL: {
      type: String,
      required: true, ////https://ui-avatars.com/api/?name=Sachin
    },
    // address: {
    //   type: String,
    //   required: true,
    //   minLength: 3,
    //   maxLength: 70,
    // },
    // dateOfBirth: {
    //   type: Number, //convert to Date
    //   required: true,
    // },
    // faculty: {
    //   type: String,
    //   minlength: 2,
    //   maxlength: 50,
    //   validate: {
    //     validator: function (value) {
    //       if (this.role === "student" && !value) {
    //         return false;
    //       }
    //       return true;
    //     },
    //     message: "Faculty is required for students",
    //   },
    // },
    borrowedBooks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ReservedBookModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
export default UserModel;
