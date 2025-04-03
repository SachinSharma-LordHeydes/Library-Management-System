import ReservedBookModel from "@/app/models/reservedBookModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { reserverNameID, reservedBookID } = await req.json();
    if (!reserverNameID || !reservedBookID) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        fields: {
          reserverNameID,
          reservedBookID,
        },
      });
    }

    let reserveResponse,reserveMessage;

    const existingReserve=await ReservedBookModel.findOne({
      reserverNameID,reservedBookID
    })

    if(existingReserve){
      existingReserve.status="avilabe"
      reserveResponse=await ReservedBookModel.findOneAndDelete({
        reserverNameID,reservedBookID
      });
      reserveMessage="Reserve removed successfully";
    }else{
      reserveResponse=await ReservedBookModel.create({
        reserverNameID,
        reservedBookID,
      });
      reserveMessage="Book reserves succesfully"
    }

    console.log("create reserve response---->", reserveResponse);

    if (!reserveResponse) {
      return NextResponse.json({
        success: false,
        message: "unable to create a reserve for a book",
      });
    }
    return NextResponse.json({
      success: true,
      message: reserveMessage,
      data: reserveResponse,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occured while creating reserve",
      error: error.message,
    });
  }
}

// export async function PUT(req) {
//   try {
//     await dbConnect();
//     const { reserverID } = await req.json();
//     if (!reserverID) {
//       return NextResponse.json({
//         success: false,
//         message: "All fields are required",
//         fields: {
//           reserverID,
//         },
//       });
//     }

//     const updateReserveResponse = await ReservedBookModel.findByIdAndUpdate(
//       reserverID,
//       { status: "avilabe" },
//       { new: true }
//     );

//     console.log("update reserve response---->", updateReserveResponse);

//     if (!updateReserveResponse) {
//       return NextResponse.json({
//         success: false,
//         message: "unable to create a reserve for a book",
//       });
//     }
//     return NextResponse.json({
//       success: true,
//       message: "reserve created successfully",
//       data: updateReserveResponse,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message: "Error occured while creating reserve",
//       error: error.message,
//     });
//   }
// }
