import BooksModel from "@/app/models/booksModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  // Get the query parameter 'q' from the URL
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  console.log("Backend query recieved--->", q);

  if (!q) return new Response(JSON.stringify([]), { status: 200 });

  try {
    const suggestions = await BooksModel.find({
      bookTitle: { $regex: new RegExp(q, "i") }, // Case-insensitive search
    })
      .limit(10) // Limit to 10 suggestions
      .select("bookTitle _id bookImageURL");

   return NextResponse.json({
    success:false,
    message:"Query found successfully",
    data:suggestions
   })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
