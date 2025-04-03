import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success:true,
      message:"user profile created successfully"
    })
    

  } catch (error) {
    return NextResponse.json({
      success:false,
      message:"unable to create user Profile",
      error:error.message
    })
  }
}
