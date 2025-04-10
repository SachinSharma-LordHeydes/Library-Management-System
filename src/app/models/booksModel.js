import mongoose from "mongoose";
import UserModel from "./userModel";

const booksSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 1,
      index: true,
    },
    bookCatagory: {
      type: String,
      required: true,
    },
    bookAuthor: {
      type: String,
      required: true,
    },
    bookImageURL: {
      type: String,
      required: true,
    },
    authorImageURL: {
      type: String,
      required: true, //https://ui-avatars.com/api/?name=Sachin
    },
    bookDescription: {
      required: true,
      type: String,
      minLength: 5,
    },
    booksQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: function () {
        return this.booksQuantity;
      },
    },
    requests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "RequestedBookModel",
        unique:true
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const BooksModel =
  mongoose.models.BooksModel || mongoose.model("BooksModel", booksSchema);
export default BooksModel;
