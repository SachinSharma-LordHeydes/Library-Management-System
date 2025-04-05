"use server";

import dbConnect from "../dbConnect";

export async function createUser(user){
    try {
        await dbConnect();
        
        
    } catch (error) {
        console.log("error occured while creating user-->",error)
    }
}