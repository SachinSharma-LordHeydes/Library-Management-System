import BooksModel from "@/app/models/booksModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url); // 👈 extract from request URL
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;

    console.log("page and limit--->", page, limit);

    const bookScrollData = await BooksModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (!bookScrollData) {
      return NextResponse.json({
        success: false,
        message: "Unable to get scroll book detail",
      });
    }

    // In your API route (/api/books/detailOnScroll)
    return NextResponse.json({
      success: true,
      message: "Scroll book detail fetched successfully",
      data: bookScrollData,
      total: await BooksModel.countDocuments(), 
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occurred fetching scroll book data",
      error: error.message,
    });
  }
}
