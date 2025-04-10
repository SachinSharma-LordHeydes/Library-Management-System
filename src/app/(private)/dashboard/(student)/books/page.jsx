import BooksModel from "@/app/models/booksModel";
import ExploreBooks from "@/components/sections/books/ExploreBooks";
import ShowLatestBooks from "@/components/sections/books/ShowLatestBooks";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import dbConnect from "@/lib/dbConnect";
import { Limelight } from "next/font/google";

const bookPage = async () => {
  const placeholder = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  await dbConnect();

  const getBooksDeatil = await BooksModel.find();
  console.log("books Details--->", getBooksDeatil);


  return (
    <div className="space-y-20">
      <div className="text-2xl md:text-4xl font-bold tracking-wider">
        <h1 className="">Books</h1>
      </div>
      <div className="">
        <PlaceholdersAndVanishInput placeholders={placeholder} />
      </div>

      <div className="">
        <div className="text-xl md:text-3xl font-bold tracking-wider">
          Recently Added
        </div>
      </div>
      <div>
        <ShowLatestBooks />
      </div>

      <div>
        <div className="text-xl md:text-3xl font-bold tracking-wider">Explore Books</div>

        <div className="mt-16">
          <ExploreBooks api={'/api/books/detailOnScroll'} limit={'6'}/>
        </div>
      </div>
    </div>
  );
};

export default bookPage;
