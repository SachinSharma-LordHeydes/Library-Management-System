"use server";

import UserModel from "@/app/models/userModel";
import dbConnect from "../dbConnect";

export async function createUser(user){
    try{
        await dbConnect();
        const newUser = await UserModel.create(user);
        return JSON.parse(JSON.stringify(newUser));
    }catch(e){
        handleError(e);
    }
}