import BooksModel from "@/app/models/booksModel";
import RequestedBookModel from "@/app/models/requestBookModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { requestedBy, requestedBook, status } = await req.json();
    console.log("body of request---->", requestedBy, requestedBook, status);
    
    if (!requestedBy || !requestedBook || !status) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        fields: {
          requestedBy,
          requestedBook,
          status
        },
      });
    }

    // Find existing request
    let existingRequest = await RequestedBookModel.findOne({
      requestedBy,
      requestedBook,
    });

    // Handle based on requested status
    if (status === "not-requested") {
      // Delete the request if user is canceling
      if (existingRequest) {
        await RequestedBookModel.findOneAndDelete({
          requestedBy,
          requestedBook,
        });

        // Remove the request from book's requests array
        await BooksModel.findByIdAndUpdate(
          requestedBook,
          {
            $pull: { requests: existingRequest._id },
          },
          { new: true }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Request cancelled successfully",
        status: "not-requested"
      });
    } 
    else if (status === "request_pending") {
      // Create a new request or update existing
      if (existingRequest) {
        // Update status if request exists
        existingRequest.status = status;
        await existingRequest.save();
      } else {
        // Create new request
        existingRequest = await RequestedBookModel.create({
          requestedBy,
          requestedBook,
          status
        });

        // Add request to book's requests array
        await BooksModel.findByIdAndUpdate(
          requestedBook,
          { $push: { requests: existingRequest._id } },
          { new: true }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Request submitted successfully",
        status: status
      });
    }
    else if (status === "borrow_pending") {
      // User requesting to return book
      if (existingRequest && existingRequest.status === "success") {
        existingRequest.status = status;
        await existingRequest.save();
        
        return NextResponse.json({
          success: true,
          message: "Return request submitted",
          status: status
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Cannot request return for a book that is not borrowed",
        });
      }
    }
    else {
      // For other status updates that might come from admin
      if (existingRequest) {
        existingRequest.status = status;
        await existingRequest.save();
        
        return NextResponse.json({
          success: true,
          message: `Status updated to ${status}`,
          status: status
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No request found to update",
        });
      }
    }
  } catch (error) {
    console.error("Request API error:", error);
    return NextResponse.json({
      success: false,
      message: "Error occurred while processing request",
      error: error.message,
    });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const bookId = url.searchParams.get("bookId");
    
    let query = {};
    if (userId) query.requestedBy = userId;
    if (bookId) query.requestedBook = bookId;
    
    const requestedBookResponse = await RequestedBookModel.find(query).populate(
      "requestedBook requestedBy"
    );

    if (!requestedBookResponse) {
      return NextResponse.json({
        success: false,
        message: "Unable to fetch requested books details",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Requested book data fetched successfully",
      data: requestedBookResponse,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occurred while fetching requested books details",
      error: error.message,
    });
  }
}