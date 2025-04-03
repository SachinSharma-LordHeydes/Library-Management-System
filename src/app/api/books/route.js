import BooksModel from "@/app/models/booksModels";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    dbConnect();
    const {
      bookTitle,
      bookCatagory,
      bookAuthor,
      bookImageURL,
      authorImageURL,
      bookDescription,
      bookPublication,
      booksQuantity,
    } = await req.json();

    if (
      !bookTitle ||
      !bookCatagory ||
      !bookAuthor ||
      !bookImageURL ||
      !authorImageURL ||
      !bookDescription ||
      !bookPublication ||
      !booksQuantity
    ) {
      return NextResponse.json({
        success: false,
        message: "all fields are required",
        fields: {
          bookTitle,
          bookCatagory,
          bookAuthor,
          bookImageURL,
          authorImageURL,
          bookDescription,
          bookPublication,
          booksQuantity,
        },
      });
    }

    const createBookResponse = await BooksModel.create({
      bookTitle,
      bookCatagory,
      bookAuthor,
      bookImageURL,
      authorImageURL,
      bookDescription,
      bookPublication,
      booksQuantity,
    });

    console.log("Create book response----->", createBookResponse);

    if (!createBookResponse) {
      return NextResponse.json({
        success: false,
        message: "Error occured while creating books details",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Book details created successfully",
      data: createBookResponse,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured while adding books details",
      error: error.message,
    });
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
export async function GET(req) {
  try {
    await dbConnect();

    const bookID = req.nextUrl.searchParams.get("bookID");

    
    let getBooksDetailResponse;
    
    if (bookID) {
      console.log("bookID received --->", bookID);
      const _id=bookID
      getBooksDetailResponse = await BooksModel.findById(_id);
      if (!getBooksDetailResponse) {
        return NextResponse.json(
          { success: false, message: "Book not found" },
          { status: 404 }
        );
      }
    } else {
      getBooksDetailResponse = await BooksModel.find();
      if (getBooksDetailResponse.length === 0) {
        return NextResponse.json(
          { success: false, message: "No books available in the database" },
          { status: 404 }
        );
      }
    }

    console.log("Fetched Book(s) Response --->", getBooksDetailResponse);

    return NextResponse.json(
      {
        success: true,
        message: bookID
          ? "Successfully fetched book details"
          : "Successfully fetched all books",
        data: getBooksDetailResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred while fetching book details",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
