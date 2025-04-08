import mongoose from "mongoose";
import ReservedBookModel from "@/app/models/reservedBookModel";

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
      maxLength: 100,
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


booksSchema.pre("save", function (next) {
  if (
    this.status === "returned" &&
    this.returnedDate &&
    this.returnedDate > this.dueDate
  ) {
    const daysLate = Math.ceil(
      (this.returnedDate - this.dueDate) / (1000 * 60 * 60 * 24)
    );
    this.fine = daysLate * 10; // 10 per day late
  }
  next();
});

const BooksModel =
  mongoose.models.BooksModel || mongoose.model("BooksModel", booksSchema);
export default BooksModel;
