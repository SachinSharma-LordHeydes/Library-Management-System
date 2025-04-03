import UserModel from "@/app/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const {
      userName,
      contactNumber,
      email,
      address,
      dateOfBirth,
      faculty,
      imageURL,
      role,
    } = await req.json();

    if (
      !userName ||
      !role ||
      !email ||
      !faculty ||
      !contactNumber ||
      !address ||
      !dateOfBirth ||
      !imageURL
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        fields: {
          userName,
          role,
          contactNumber,
          email,
          address,
          dateOfBirth,
          faculty,
        },
      });
    }

    const createUserResponse = await UserModel.create({
      userName,
      contactNumber,
      email,
      address,
      dateOfBirth,
      faculty,
      imageURL,
      role,
    });

    console.log("CreateuserRtesponse----->", createUserResponse);

    if (!createUserResponse) {
      return NextResponse.json({
        success: false,
        message: "unable to create user!! Internal server Error",
      });
    }

    return NextResponse.json({
      success: true,
      message: "user profile created successfully",
      data: createUserResponse,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "unable to create user Profile",
      error: error.message,
    });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { userID } = await req.json();
    console.log("userid to delete-->", userID);

    if (!userID) {
      return NextResponse.json({
        success: false,
        message: "user Id not avilable!!",
      });
    }

    const deleteUserResponse = await UserModel.findByIdAndDelete(userID);
    if (!deleteUserResponse) {
      return NextResponse.json({
        success: false,
        message: "Invalid user!! unable to delete user",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully deleted user",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error occured while deleting user",
      error: error.message,
    });
  }
}
//need to make some changes/improvement
export async function GET(req) {
  try {
    await dbConnect();
    console.log(getAuth(req));
    const { userId, email } = getAuth(req);
    console.log(userId);
    console.log(email);

    return NextResponse.json({
      success: true,
      message: "Successfully fetched user",
      data:""
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error occured while grtting user",
      error: error.message,
    });
  }
}
