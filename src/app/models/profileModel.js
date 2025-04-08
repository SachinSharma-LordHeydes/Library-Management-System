import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    about: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      minLenght: 10,
      maxLenght: 10,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProfileModel =
  mongoose.models.ProfileModel || mongoose.model("ProfileModel", profileSchema);
export default ProfileModel;
