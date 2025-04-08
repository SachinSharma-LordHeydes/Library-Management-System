import UserModel from "@/app/models/userModel";
import { auth } from "@clerk/nextjs/server";
import { Image } from "lucide-react";

import BooksModel from "@/app/models/booksModel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OverdueComponent from "../OverdueComponent";
import AddbookSection from "../sections/dashboard/AddbookSection";

const AdminDashboardPage = async () => {
  const { userId } = await auth();

  const userData = await UserModel.find().populate({
    path: "borrowedBooks",
    populate: {
      path: "bookID",
      model: "BooksModel",
    }
  });

  console.log("user Data---->", userData);
  const bookData = await BooksModel.find();
  const splicedBookData = bookData.slice(-5);
  const plainBooks = JSON.parse(JSON.stringify(splicedBookData));

  const studentData = userData.filter((data) => data.role === "student");

  const totalNumbersOfUsers = userData.length;
  console.log("Total Number of users--->", totalNumbersOfUsers);

  // const overDuedBooks = bookData.filter((data) => data.cr);

  const splicedStudentData = studentData.slice(-5);
  const splicedUserData = userData.slice(-5);

  let totalBorrowedBooks = 0;
  userData.forEach((user) => {
    totalBorrowedBooks += user.borrowedBooks?.length;
  });

  console.log("total books borrowed-->", totalBorrowedBooks);

  const randData = [
    {
      title: "Total Users",
      value: totalNumbersOfUsers,
      icon: <Image size={32} />,
    },
    {
      title: "Borrowed Books",
      value: totalBorrowedBooks,
      icon: <Image size={32} />,
    },
    {
      title: "Overdue Books",
      value: "1223",
      icon: <Image size={32} />,
    },
    {
      title: "New Members",
      value: "1223",
      icon: <Image size={32} />,
    },
  ];

  return (
    <div className="">
      <div>
        <pre className="lg:text-6xl md:text-5xl text-3xl flex font-bold ">
          Hello,<p className="text-orange-500">Sachin</p>!
        </pre>
      </div>

      {/* grid section  */}
      <div className="flex flex-wrap md:flex-nowrap gap-y-5  gap-x-3 mx-auto md:justify-between justify-center items-center my-9 md:mt-16 lg:mt-24">
        {randData.map((data, index) => (
          <div
            className="px-4 py-5 md:w-[380px] bg-white rounded-md shadow-2xl"
            key={index}
          >
            <div className="flex justify-between items-center gap-x-5 md:gap-x-9 lg:gap-x-16">
              <div className="text-4xl lg:text-6xl font-extrabold ">
                {data.value}
              </div>
              <div className="bg-amber-600 rounded-full p-2 lg:p-4">
                {data.icon}
              </div>
            </div>
            <div className="mt-5 text-md md:text-lg ">{data.title}</div>
          </div>
        ))}
      </div>

      {/* table section  */}

      <div className="flex flex-wrap md:flex-nowrap gap-5 justify-between items-center mt-16 ">
        <div className="bg-white rounded-md shadow-2xl text-white md:w-[47%] w-full">
          <div className="flex justify-between px-3 py-4 text-lg text-black font-bold tracking-wider">
            <div className="py-1">User Lists</div>
          </div>
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow className={`text-white`}>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Book Borrowed</TableHead>
                <TableHead className="text-right">Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {splicedStudentData.map((data, index) => (
                <TableRow key={index} className={`text-black`}>
                  <TableCell className="font-medium k">{data._id}</TableCell>
                  <TableCell className="font-medium k">
                    {data.userName}
                  </TableCell>
                  <TableCell className="font-medium k">
                    {data.borrowedBooks[0].bookID.bookTitle ? (
                      <div>
                        {data.borrowedBooks[0].bookID.bookTitle}
                      </div>
                    ) : (
                      <div>unknown</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    {data.faculty ? (
                      <div>{data.faculty}</div>
                    ) : (
                      <div>unknown</div>
                    )}
                  </TableCell>
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
        {/* -------------- */}
        <div className="bg-white rounded-md shadow-2xl text-white md:w-[47%] w-full">
          <AddbookSection bookData={plainBooks} />
        </div>
      </div>

      <div>
        <OverdueComponent />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
