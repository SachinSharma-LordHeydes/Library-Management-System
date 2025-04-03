import mongoose from "mongoose";

const reservedBookSchema = new mongoose.Schema({
  reserverNameID: {
    type: mongoose.Types.ObjectId,
    ref: "UserModel",
    required: true,
    index: true,
  },
  reservedBookID: {
    type: mongoose.Types.ObjectId,
    ref: "BooksModel",
    required: true,
    index: true,
  },
  reservedDate: {
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
  fine: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["reserved", "avilabe"],
    default: "reserved",
  },
});

reservedBookSchema.pre("save", function (next) {
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

const ReservedBookModel =
  mongoose.models.ReservedBookModel ||
  mongoose.model("ReservedBookModel", reservedBookSchema);
export default ReservedBookModel;
