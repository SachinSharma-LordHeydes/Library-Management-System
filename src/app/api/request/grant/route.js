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

    if (!updatedRequest) {
      return NextResponse.json({
        success: false,
        message: "Request not found",
      });
    }

    if (updatedRequest) {
        const updatedBook = await BooksModel.findByIdAndUpdate(
          bookID, 
          { $inc: { booksQuantity: -1 } },
          { new: true }
        );
  
        console.log("Updated book details --->", updatedBook);
      }

      if (updatedRequest) {
        const createBorrowedBook = await BorrowedBookModel.create(
          {bookID:bookID, borrowerID:userID}
        );
        console.log("Borrowed book details --->", createBorrowedBook);
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
