"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginateFooter from "./ui/PaginationFooter";
import { useSearchParams, useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 5;

const OverdueComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize currentPage from URL, default to 1
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const overDueBooksData = [
    { userID: "101", userName: "sachin", BookID: "b101", Author: "Willem", Overdue: "5 days", Fine: "50" },
    { userID: "102", userName: "sachin", BookID: "b102", Author: "Willem", Overdue: "5 days", Fine: "50" },
    { userID: "103", userName: "sachin", BookID: "b103", Author: "Willem", Overdue: "5 days", Fine: "50" },
    { userID: "104", userName: "sachin", BookID: "b104", Author: "Willem", Overdue: "5 days", Fine: "50" },
    { userID: "105", userName: "sachin", BookID: "b105", Author: "Willem", Overdue: "5 days", Fine: "50" },
    { userID: "106", userName: "sachin sharma", BookID: "b106", Author: "Willem", Overdue: "5 days", Fine: "50" },
    { userID: "107", userName: "sachin hero", BookID: "b107", Author: "Willem", Overdue: "5 days", Fine: "50" },
    { userID: "108", userName: "sachin Don", BookID: "b108", Author: "Willem", Overdue: "5 days", Fine: "50" },
  ];

  const totalItems = overDueBooksData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Slice the data for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = overDueBooksData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}`, { scroll: false }); // Update URL without scrolling
  };

  return (
    <div>
      <div className="mt-16 lg:text-6xl md:text-5xl text-3xl font-bold">
        Overdue Book List
      </div>

      <div className="mt-9">
        <div className="bg-white rounded-md shadow-2xl text-white py-1 w-full px-4">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader className={``}>
              <TableRow className={`text-white`}>
                <TableHead className="">User ID</TableHead>
                <TableHead className="">User Name</TableHead>
                <TableHead className="">Book ID</TableHead>
                <TableHead className="">Author</TableHead>
                <TableHead>Overdue</TableHead>
                <TableHead className="text-right text-red-500">Fine</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((books, index) => (
                <TableRow key={index} className={`text-black`}>
                  <TableCell className="font-medium">{books.userID}</TableCell>
                  <TableCell>{books.userName}</TableCell>
                  <TableCell>{books.BookID}</TableCell>
                  <TableCell className="">{books.Author}</TableCell>
                  <TableCell className="">{books.Overdue}</TableCell>
                  <TableCell className="text-right text-red-500">{books.Fine}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mb-2 px-3">
            <div className="text-black">
              <PaginateFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueComponent;