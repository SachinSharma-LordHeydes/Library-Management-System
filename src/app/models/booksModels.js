import mongoose from "mongoose";

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
      type: mongoose.Types.ObjectId,
      ref: "authorModel",
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
      maxLength: 100,
    },
    bookPublication: {
      type: String,
      required: false,
      default: "unknown",
    },
    booksQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: function () {
        return this.booksQuantity;
      },
    },
    reserved: {
      type: mongoose.Types.ObjectId,
      ref: "ReservedBookModel",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const BooksModel =
  mongoose.models.BooksModel || mongoose.model("BooksModel", booksSchema);
export default BooksModel;
