import BorrowedBookModel from "@/app/models/borrowedBooksModel";
import UserModel from "@/app/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { borrowerID, bookID } = await req.json();
    if (!borrowerID || !bookID) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        fields: {
          borrowerID,
          bookID,
        },
      });
    }

    const borrowBoookResponse=await BorrowedBookModel.create({borrowerID,bookID})

    console.log("borrowed book response--->",borrowBoookResponse)

    if(!borrowBoookResponse){
      return NextResponse.json({
        success:false,
        message:"Unable to borrow book",
      })
    }

    if(borrowBoookResponse){
      await UserModel.findByIdAndUpdate(borrowerID, {
        $push: { borrowedBooks: borrowBoookResponse._id },
      });
    }


    return NextResponse.json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBoookResponse,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured while borrowing",
      error: error.message,
    });
  }
}
