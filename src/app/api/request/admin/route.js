import BooksModel from "@/app/models/booksModel";
import BorrowedBookModel from "@/app/models/borrowedBooksModel";
import RequestedBookModel from "@/app/models/requestBookModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { requestId, action } = await req.json();

    console.log("request ID, action---->",requestId,action)
    
    if (!requestId || !action) {
      return NextResponse.json({
        success: false,
        message: "Request ID and action are required",
      });
    }

    // Find the request
    const request = await RequestedBookModel.findById(requestId).populate("requestedBook requestedBy");
    
    if (!request) {
      return NextResponse.json({
        success: false,
        message: "Request not found",
      });
    }

    // Process based on action and current status
    if (action === "approve") {
      if (request.status === "request_pending") {
        // Check if book is available
        const book = await BooksModel.findById(request.requestedBook._id);
        if (book.booksQuantity <= 0) {
          return NextResponse.json({
            success: false,
            message: "Book is out of stock",
          });
        }

        // Update book quantity
        book.booksQuantity -= 1;
        await book.save();

        // Create borrowed book record
        await BorrowedBookModel.create({
          bookID: request.requestedBook._id,
          borrowerID: request.requestedBy._id,
          status: "borrowed"
        });

        // Update request status
        request.status = "success";
        await request.save();

        return NextResponse.json({
          success: true,
          message: "Borrow request approved",
        });
      } 
      else if (request.status === "borrow_pending") {
        // Find borrowed book record
        const borrowedBook = await BorrowedBookModel.findOne({
          bookID: request.requestedBook._id,
          borrowerID: request.requestedBy._id,
          status: "borrowed"
        });

        if (borrowedBook) {
          borrowedBook.status = "returned";
          await borrowedBook.save();
        }

        // Increase book quantity
        const book = await BooksModel.findById(request.requestedBook._id);
        book.booksQuantity += 1;
        await book.save();

        // Delete the request
        await RequestedBookModel.findByIdAndDelete(requestId);

        return NextResponse.json({
          success: true,
          message: "Return request approved",
        });
      }
    } 
    else if (action === "reject") {
      // Admin rejects the request
      if (request.status === "request_pending" || request.status === "borrow_pending") {
        request.status = request.status === "request_pending" ? "not-requested" : "success";
        await request.save();

        return NextResponse.json({
          success: true,
          message: "Request rejected",
        });
      }
    }

    return NextResponse.json({
      success: false,
      message: "Invalid action for current request status",
    });
  } catch (error) {
    console.error("Admin request API error:", error);
    return NextResponse.json({
      success: false,
      message: "Error occurred while processing admin action",
      error: error.message,
    });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    
    let query = {};
    if (status) query.status = status;
    
    const requests = await RequestedBookModel.find(query)
      .populate("requestedBook requestedBy")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occurred while fetching requests",
      error: error.message,
    });
  }
}