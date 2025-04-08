import BooksModel from "@/app/models/booksModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     // Parse multipart form data
//     const formData = await req.formData();
//     const bookTitle = formData.get("bookTitle");
//     const bookCatagory = formData.get("bookCatagory");
//     const bookAuthor = formData.get("bookAuthor");
//     const bookImageFile = formData.get("bookImageURL");
//     const authorImageFile = formData.get("authorImageURL");
//     const bookDescription = formData.get("bookDescription");
//     const bookPublication = formData.get("bookPublication");
//     const booksQuantity = formData.get("booksQuantity");

//     if (
//       !bookTitle ||
//       !bookCatagory ||
//       !bookAuthor ||
//       !bookImageFile ||
//       !authorImageFile ||
//       !bookDescription ||
//       !bookPublication ||
//       !booksQuantity
//     ) {
//       return NextResponse.json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const bookImageURL = "/path/to/uploaded/book-image.jpg"; // Replace with actual logic
//     const authorImageURL = "/path/to/uploaded/author-image.jpg"; // Replace with actual logic

//     const createBookResponse = await BooksModel.create({
//       bookTitle,
//       bookCatagory,
//       bookAuthor,
//       bookImageURL,
//       authorImageURL,
//       bookDescription,
//       bookPublication,
//       booksQuantity,
//     });

//     if (!createBookResponse) {
//       return NextResponse.json({
//         success: false,
//         message: "Error occurred while creating book details",
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Book details created successfully",
//       data: createBookResponse,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message: "Error occurred while adding book details",
//       error: error.message || "Unknown error",
//     });
//   }
// }

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
export async function GET(req) {
  try {
    await dbConnect();

    const bookID = req.nextUrl.searchParams.get("bookID");

    let getBooksDetailResponse;

    if (bookID) {
      console.log("bookID received --->", bookID);
      const _id = bookID;
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
