import UserModel from "@/app/models/userModel";
import { auth } from "@clerk/nextjs/server";
import { Image } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboardPage = async () => {
  const { userId } = await auth();

  const userData = await UserModel.findOne({ clerkId: userId });

  const randData = [
    {
      title: "Total Users0",
      value: "1223",
      icon: <Image size={32} />,
    },
    {
      title: "Total Users1",
      value: "1223",
      icon: <Image size={32} />,
    },
    {
      title: "Total Users2",
      value: "1223",
      icon: <Image size={32} />,
    },
    {
      title: "Total Users3",
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
            className="px-4   py-5 bg-white rounded-md shadow-2xl"
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
            <div className="mt-5 text-lg md:text-xl lg:text-2xl ">
              {data.title}
            </div>
          </div>
        ))}
      </div>

      {/* table section  */}

      <div className="flex flex-wrap md:flex-nowrap gap-5 justify-between items-center mt-16 " >
        <div className="bg-white rounded-md shadow-2xl text-white md:w-[50%] w-full">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow className={`text-white`}>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Book Issued</TableHead>
                <TableHead className="text-right">Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className={`text-black`}>
                <TableCell className="font-medium k">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="bg-[#C7A061] rounded-md shadow-2xl text-white md:w-[50%] w-full">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow className={`text-white`}>
                <TableHead className="w-[100px]">Book ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Avilable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
