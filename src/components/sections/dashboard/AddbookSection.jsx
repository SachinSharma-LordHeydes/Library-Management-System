"use client";

import Modal from "@/components/ui/Modal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AddbookSection = ({ bookData }) => {
  const handelAddBook = () => {
    console.log("Add book Clicked / Modal");
  };
  console.log("Book Data from Admion Dashboard--->", bookData);

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="flex justify-between px-3 py-4 text-lg text-black font-bold tracking-wider">
            <div>Books Lists</div>
          </div>
          <div className="flex justify-between px-3 py-4 text-lg text-white  font-bold tracking-wider ">
            <div
              className="bg-black rounded-md px-2 py-1 cursor-pointer hover:shadow-2xl hover:scale-97 hover:transition-all"
              onClick={handelAddBook}
            >
              <Modal />
            </div>
          </div>
        </div>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow className={`text-white`}>
              <TableHead className="w-[100px]">Book ID</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-right">Avilable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookData.map((data, index) => (
              <TableRow key={index} className={`text-black`}>
                <TableCell className="font-medium k">{data._id}</TableCell>
                <TableCell className="font-medium k">{data.bookTitle}</TableCell>
                <TableCell>{data.bookAuthor}</TableCell>
                <TableCell className="text-right">{data.booksQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="  flex justify-end mb-2 px-3">
          <div className="bg-black rounded-md px-2 py-1  cursor-pointer hover:shadow-2xl hover:scale-97 hover:transition-all">
            See All
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddbookSection;
