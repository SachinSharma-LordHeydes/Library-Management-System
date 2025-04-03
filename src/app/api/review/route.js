import ReviewModel from "@/app/models/reviewModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { userID, bookID, rating, review } = await req.json();

    if (!userID || !bookID || !rating || !review) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        fields: {
          userID,
          bookID,
          rating,
          review,
        },
      });
    }

    const existingReview = await ReviewModel.findOne({ userID, bookID });

    let reviewData,responseMessage;

    if(existingReview){
        existingReview.rating=rating;
        existingReview.review=review;
        reviewData=await existingReview.save();
        responseMessage="review and rating updated successfully"
    }else{
        reviewData=await ReviewModel.create({
            userID,
            bookID,
            rating,
            review,
          });
          responseMessage="review and rating added successfully"
    }

    console.log("review response--->", reviewData);

    if (!reviewData) {
      return NextResponse.json({
        success: false,
        message:
          "Error occured while adding review and ratig!! (Internal server Error)",
      });
    }

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: reviewData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured while adding review and ratig",
      error: error.message,
    });
  }
}
