import BooksModel from "@/app/models/booksModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Establish database connection
    await dbConnect();
    console.log("Database connected successfully");

    // Parse JSON data
    const data = await req.json();
    const {
      bookTitle,
      bookCatagory,
      bookAuthor,
      bookImageURL,
      authorImageURL,
      bookDescription,
      booksQuantity,
    } = data;

    console.log("Received book data:", {
      bookTitle,
      bookCatagory,
      bookAuthor,
      bookImageURL: bookImageURL ? "URL received" : "Missing",
      authorImageURL: authorImageURL ? "URL received" : "Missing",
      bookDescription: bookDescription ? "Text received" : "Missing",
      booksQuantity,
    });

    // Validate required fields
    if (
      !bookTitle ||
      !bookCatagory ||
      !bookAuthor ||
      !bookImageURL ||
      !authorImageURL ||
      !bookDescription ||
      !booksQuantity
    ) {
      console.log("Validation failed - missing fields");
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Create the book document
    console.log("Attempting to create book document");
    const createBookResponse = await BooksModel.create({
      bookTitle,
      bookCatagory,
      bookAuthor,
      bookImageURL,
      authorImageURL,
      bookDescription,
      booksQuantity: Number(booksQuantity), // Convert to number if needed
    });

    console.log("Book created successfully:", createBookResponse._id);

    return NextResponse.json(
      {
        success: true,
        message: "Book details created successfully",
        data: createBookResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/books:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred while adding book details",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { bookID } = await req.json();
    console.log("bookid to delete-->", bookID);

    if (!bookID) {
      return NextResponse.json({
        success: false,
        message: "book Id not avilable!!",
      });
    }

    const deleteBookResponse = await BooksModel.findByIdAndDelete(bookID);
    if (!deleteBookResponse) {
      return NextResponse.json({
        success: false,
        message: "Invalid user!! unable to delete user",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully deleted book",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error occured while deleting book",
      error: error.message,
    });
  }
}

//get book detail by ID and Get all books Details
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const bookID = searchParams.get("bookID");
    
    if (!bookID) {
      return NextResponse.json({ success: false, message: "Book ID is required" }, { status: 400 });
    }
    
    const book = await BooksModel.findById(bookID);
    
    if (!book) {
      return NextResponse.json({ success: false, message: "Book not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}