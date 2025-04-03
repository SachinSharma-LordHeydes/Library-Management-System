import AuthorModel from "@/app/models/authorModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { authorName, authorDescription, authorimageURL } = await req.json();

    if (!authorName || !authorDescription || !authorimageURL) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        fields: {
          authorName,
          authorDescription,
          authorimageURL,
        },
      });
    }

    const createAuthorResponse = await AuthorModel.create({
      authorName,
      authorDescription,
      authorimageURL,
    });

    console.log("Create author Response--->", createAuthorResponse);

    if (!createAuthorResponse) {
      return NextResponse.json({
        success: false,
        message: "Error occured while creating author details",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully created author",
      error: createAuthorResponse,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured while adding author details",
      error: error.message,
    });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();

    const { authorID } = await req.json();

    if (!authorID) {
      return NextResponse.json({
        success: false,
        message: "Author Id unavilable",
      });
    }

    const deleteAuthorResponse = await AuthorModel.findByIdAndDelete(authorID);

    console.log("Deleted author response--->", deleteAuthorResponse);

    if (!deleteAuthorResponse) {
      return NextResponse.json({
        success: false,
        message: "Unable to delete Author",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error occured while deleting author",
      error: error.message,
    });
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    // const authorID=req.header.get("authorID");
    // if(!authorID){
    //     return NextResponse.json({
    //         success:false,
    //         message:"Author ID not present"
    //     })
    // }
    // const getAuthorDetail=await AuthorModel.findById(authorID);

    const getAuthorDetail = await AuthorModel.find();

    console.log("Author Detail ------>", getAuthorDetail);

    return NextResponse.json({
      success: true,
      message: "Author detail fetched successfully",
      data: getAuthorDetail,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error occured while grtting Author",
      error: error.message,
    });
  }
}
