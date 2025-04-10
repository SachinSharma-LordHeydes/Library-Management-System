import mongoose from "mongoose";

const requestBookSchema = new mongoose.Schema({
  requestedBy: {
    type: mongoose.Types.ObjectId,
    ref: "UserModel",
    required: true,
    index: true,
  },
  requestedBook: {
    type: mongoose.Types.ObjectId,
    ref: "BooksModel",
    required: true,
    index: true,
  },
  requestedDate: {
    type: Date,
    default: Date.now,
  },
  returnedDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["success",'pending','not-requested'],
    default:"not-requested"
  },
});


const RequestedBookModel =
  mongoose.models.RequestedBookModel ||
  mongoose.model("RequestedBookModel", requestBookSchema);
export default RequestedBookModel;
