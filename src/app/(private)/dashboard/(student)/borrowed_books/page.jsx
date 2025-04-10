import BorrowedBookModel from "@/app/models/borrowedBooksModel";
import UserModel from "@/app/models/userModel";
import ExploreBooks from "@/components/sections/books/ExploreBooks";
import { BackgroundGradientDemo } from "@/components/ui/BackgroundGradientDemo";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";

const borrowedBooksPage = async () => {
  const { userId } = await auth();
  dbConnect();
  const userID = await UserModel.findOne({ clerkId: userId }).select("_id");
  console.log("clerkID---->", userId);
  console.log("userID---->", userID);
  const borrowedBooks = await BorrowedBookModel.find({
    borrowerID: userID,
  }).populate("bookID");

  console.log("borrowed books--->", borrowedBooks);
  return (
    <div>
      <div className="text-2xl md:text-4xl font-bold tracking-wider">
        Borrowed Books
      </div>

      <div className="mt-16">
        <ExploreBooks api={`/api/borrow/borrow_on_scroll`} limit={'5'} userID={userID._id}/>
      </div>
    </div>
  );
};

export default borrowedBooksPage;
