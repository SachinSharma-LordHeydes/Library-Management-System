import BooksModel from "@/app/models/booksModel";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import dbConnect from "@/lib/dbConnect";

const ShowLatestBooks = async () => {
  dbConnect();
  const latestBooks = await BooksModel.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select(
      "bookTitle bookAuthor bookImageURL bookDescription booksQuantity _id "
    );
  console.log("latest books-->", latestBooks);

  const serializedBooks = latestBooks.map((book) => ({
    bookTitle: book.bookTitle,
    bookAuthor: book.bookAuthor,
    bookImageURL: book.bookImageURL,
    bookDescription: book.bookDescription,
    booksQuantity: book.booksQuantity,
    id: book._id.toString(), // Convert ObjectId to string
  }));
  console.log('serilized Data--->',serializedBooks)

  return (
    <div>
      <div className="mt-16 flex justify-center items-center">
        <InfiniteMovingCards items={serializedBooks} />
      </div>
    </div>
  );
};

export default ShowLatestBooks;
