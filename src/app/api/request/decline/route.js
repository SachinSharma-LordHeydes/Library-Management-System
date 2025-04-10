import dbConnect from "@/lib/dbConnect";
import RequestedBookModel from "@/app/models/requestBookModel";
import { NextResponse } from "next/server";
import BooksModel from "@/app/models/booksModel";
import BorrowedBookModel from "@/app/models/borrowedBooksModel";

export async function POST(req) {
  try {
    await dbConnect();
    const { bookID, userID, newStatus } = await req.json();

    if (!bookID || !userID || !newStatus) {
      return NextResponse.json({
        success: false,
        message: "Missing fields",
      });
    }

    const updatedRequest = await RequestedBookModel.findOneAndUpdate(
      {
        requestedBook: bookID,
        requestedBy: userID,
      },
      {
        status: newStatus,
      },
      { new: true }
    );

    console.log("Updates request--->",updatedRequest)

    if(!updatedRequest){
      return NextResponse.json({
        success:false,
        message:"unable to update request"
      })
    }

    return NextResponse.json({
      success: true,
      message: "Status updated",
      data: updatedRequest,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error updating status",
      error: error.message,
    });
  }
}
