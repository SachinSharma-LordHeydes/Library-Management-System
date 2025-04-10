import BooksModel from "@/app/models/booksModel";
import RequestedBookModel from "@/app/models/requestBookModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { requestedBy, requestedBook } = await req.json();
    console.log("body of request---->", requestedBy, requestedBook);
    if (!requestedBy || !requestedBook) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        fields: {
          requestedBy,
          requestedBook,
        },
      });
    }

    const existingRequest = await RequestedBookModel.findOne({
      requestedBy,
      requestedBook,
    });

    if (existingRequest) {
      existingRequest.status = "not-requested";

      const requestResponse = await RequestedBookModel.findOneAndDelete({
        requestedBy,
        requestedBook,
      });

      const updatesbookRsponse = await BooksModel.findByIdAndUpdate(
        requestedBook,
        {
          $pull: { requests: existingRequest._id },
        },
        { new: true }
      ).populate("requests");

      console.log("updated book response--->", updatesbookRsponse);

      return NextResponse.json({
        success: true,
        message: "request already exits so removing it ",
        data: requestResponse,
      });
    } else {
      const requestResponse = await RequestedBookModel.create({
        requestedBy,
        requestedBook,
        status: "pending",
      });

      const updatedBook = await BooksModel.findByIdAndUpdate(
        requestedBook,
        { $push: { requests: requestResponse._id } },
        { new: true }
      );
      console.log("Updated book with request:", updatedBook);

      return NextResponse.json({
        success: true,
        message: "request created successfully",
        data: requestResponse,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured while creating request",
      error: error.message,
    });
  }
}

export async function GET(req) {
  try {
    dbConnect();
    const requestedBoookResponse = await RequestedBookModel.find().populate(
      "requestedBook requestedBy"
    );

    if (!requestedBoookResponse) {
      return NextResponse.json({
        success: false,
        message: "Unable to fetch requested books details",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Requested book Data fetched Successfully",
      data: requestedBoookResponse,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured while fetching requested books details",
      error: error.message,
    });
  }
}
