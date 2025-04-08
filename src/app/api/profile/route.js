import ProfileModel from "@/app/models/profileModel";
import UserModel from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { about, phoneNumber, address, userID } = await req.json();
    if (!about || !phoneNumber || !address || !userID) {
      return NextResponse.json({
        successs: false,
        message: "All fields are required",
        fields: {
          about,
          phoneNumber,
          address,
          userID,
        },
      });
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    console.log("userData backedn<--->",user);

    if (user.profile) {
      return NextResponse.json(
        { message: "Profile already exists for this user" },
        { status: 400 }
      );
    }

    const createProfileRespone = await ProfileModel.create({
      about,
      phoneNumber,
      address,
    });

    console.log("Create profile response-->", createProfileRespone);

    if (!createProfileRespone) {
      return NextResponse.json({
        successs: false,
        message: "Internal server Error Unable to Create Profile!!",
      });
    }

    if (createProfileRespone) {
      const updatUser = await UserModel.findByIdAndUpdate(userID, {
        $push: { profile: createProfileRespone._id },
      });
      if (!updatUser) {
        return NextResponse({
          successs: false,
          message: "Internal server Error push profile in user!!",
        });
      }
    }

    return NextResponse.json({
      successs: true,
      message: "Profile Created Successfully",
      data: createProfileRespone,
    });
  } catch (error) {
    return NextResponse.json({
      successs: false,
      message: "Error Occured while creting Profile",
      error: error.message,
    });
  }
}
