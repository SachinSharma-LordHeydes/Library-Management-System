import UserModel from "@/app/models/userModel";
import dbConnect from "../dbConnect";

export async function createUser(user) {
    try {
      await dbConnect();
      const newUser = await UserModel.create(user);
      return JSON.parse(JSON.stringify(newUser));
    } catch (e) {
      console.error("Error creating user:", e);
      throw e; // or return a structured error response
    }
  }
  