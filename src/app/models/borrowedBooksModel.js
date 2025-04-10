import mongoose from "mongoose";
import UserModel from "@/app/models/userModel";
import BooksModel from "@/app/models/booksModel";

const borrowedBookSchema = new mongoose.Schema({
  borrowerID: [
    {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
      index: true,
    }
  ],
  bookID: [
    {
      type: mongoose.Types.ObjectId,
      ref: "BooksModel",
      required: true,
      index: true,
    }
  ],
  borrowedDate: {
    type: Date,
    default: Date.now,
  },
  returnedDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
    required: true,
    default: function () {
      return new Date(Date.now() +60 * 1000);
    },
  },
  status:{
    enum:["idont","pending","ihave"]
  },
  fine: {
    type: Number,
    default: 0,
  },
});

borrowedBookSchema.pre("save", function (next) {
  if (
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

const BorrowedBookModel =
  mongoose.models.BorrowedBookModel ||
  mongoose.model("BorrowedBookModel", borrowedBookSchema);
export default BorrowedBookModel;
