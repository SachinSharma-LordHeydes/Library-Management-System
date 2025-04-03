import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

const dbConnect = async () => {
  try {
    const dbConnectResponse = await mongoose.connect(DB_URL);
    if (dbConnectResponse) console.log("Data Base Connected Succesfully");
  } catch (error) {
    console.log("Unable to Connect with Data base!! error--->", error);
  }
};

export default dbConnect;
