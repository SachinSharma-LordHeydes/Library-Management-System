import UserModel from "@/app/models/userModel";
import dbConnect from "../dbConnect";

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