import BorrowedBookModel from "@/app/models/borrowedBooksModel";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const userID = searchParams.get("userID"); // Keep as string

    console.log("User ID, page and limit--->", userID, page, limit);

    // Convert string ID to ObjectId
    const borrowerId = new mongoose.Types.ObjectId(userID);

    const bookScrollData = await BorrowedBookModel.find({
      borrowerID: borrowerId, // Use the ObjectId
    })
      .populate("bookID")
      .sort({ _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    console.log("borrowed scroll book data-->", bookScrollData);
    const total = await BorrowedBookModel.countDocuments({
      borrowerID: borrowerId, // Count only this user's books
    });

    return NextResponse.json({
      success: true,
      message: "Scroll borrowed book detail fetched successfully",
      data: bookScrollData,
      total,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occurred fetching scroll borrowed book data",
      error: error.message,
    });
  }
}
