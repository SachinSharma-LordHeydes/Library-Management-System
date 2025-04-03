import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    bookID: {
      type: mongoose.Types.ObjectId,
      ref: "BookMoel",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    indexes: [{ key: { user: 1, book: 1 }, unique: true }],
  }
);
const ReviewModel =
  mongoose.models.ReviewModel || mongoose.model("ReviewModel", reviewSchema);
export default ReviewModel;
