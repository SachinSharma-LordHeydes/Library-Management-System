import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      index: true,
    },
    authorDescription: {
      type: String,
      required: true,
    },
    authorimageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AuthorModel =
  mongoose.models.AuthorModel || mongoose.model("AuthorModel", authorSchema);
export default AuthorModel;
