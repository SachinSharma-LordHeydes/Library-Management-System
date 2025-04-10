import RequestedBookModel from "@/app/models/requestBookModel";
import UserModel from "@/app/models/userModel";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const singleBookDetailPage = async ({ params }) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  dbConnect();
  const { bookId } = params;
  const { userId } = await auth();
  const userID = await UserModel.findOne({ clerkId: userId }).select("_id");

  const singleBookdata = await axios.get(
    `${BACKEND_URL}api/books?bookID=${bookId}`
  );

  const requestBook=await RequestedBookModel.findOne({
    requestedBook:bookId,requestedBy:userID
  }).select("status")

  console.log("single book Data------->", singleBookdata.data);
  console.log(bookId,userID)
  console.log("requested book Data------->", requestBook);

  return (
    <div className="space-y-16">
      <div className="text-2xl md:text-4xl font-bold tracking-wider">
        <h1>Book Detail</h1>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-9">
        <div className="w-[40%]">
          <ThreeDCard
            data={singleBookdata.data.data}
            userID={userID._id}
            requestBookStatus={requestBook?.status}
          />
        </div>
        <div className="w-[60%] flex items-center">
          <div className="">
            <h1 className="font-bold text-3xl">
              {singleBookdata.data.data.bookTitle}
            </h1>
            <p className="text-lg mt-1">
              {singleBookdata.data.data.bookDescription}
            </p>
            <div className="mt-9">
              Avilable Quantity:{singleBookdata.data.data.booksQuantity}
            </div>
            <div className="mt-9">
              <div className="text-xl my-2 font-bold">Author</div>
              <div className="flex justify-between items-center w-fit gap-x-8">
                <div>
                  <img
                    src={singleBookdata.data.data.authorImageURL}
                    alt="Author Image"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>{singleBookdata.data.data.bookAuthor}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleBookDetailPage;
