"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GrantAccessButton from "@/components/GrantAccessButton";
import DeclineAccessButton from "@/components/DeclineAccessButton";

const BookRequestsPage = () => {

  const BACKEND_URL=process.env.NEXT_PUBLIC_BACKEND_URL
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}api/request`, {
          method: "GET",
        });
        const requestedBookData = await res.json();
        console.log("rewuested book Date reaponse--->",requestedBookData)
        const pending = requestedBookData.data.filter((data) => data.status === "pending");
        setPendingData(pending);
        console.log("pendng data--->",pendingData)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to remove a request from the UI after granting access
  const handleGrantSuccess = (bookID, userID) => {
    setPendingData((prevData) =>
      prevData.filter(
        (data) =>
          !(data.requestedBook?._id === bookID && data.requestedBy?._id === userID)
      )
    );
  };

  return (
    <div>
      <div className="text-2xl md:text-4xl font-bold tracking-wider">
        <h1>Requested books</h1>
      </div>

      <div className="bg-white rounded-md shadow-2xl text-white mt-16 w-full">
        <div className="flex justify-between px-3 py-4 text-lg text-black font-bold tracking-wider">
          <div className="py-1">User Lists</div>
        </div>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow className="text-white">
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Book ID</TableHead>
              <TableHead>Book Requested</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableCell className="text-black text-center">Loading...</TableCell>
            ) : pendingData.length > 0 ? (
              pendingData.map((data, index) => (
                <TableRow key={index} className="text-black">
                  <TableCell className="font-medium">{data?.requestedBy?._id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex justify-between space-x-5">
                      <div>
                        <img
                          src={data?.requestedBy?.imageURL}
                          alt="User Image"
                          className="rounded-full w-7 h-7 ml-5"
                        />
                      </div>
                      <div className="w-full items-center flex">
                        {data?.requestedBy?.userName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{data?.requestedBook?._id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex justify-between space-x-5">
                      <div>
                        <img
                          src={data?.requestedBook?.bookImageURL}
                          alt="Book Image"
                          className="rounded-full w-7 h-7 ml-5"
                        />
                      </div>
                      <div className="w-full items-center flex">
                        {data?.requestedBook?.bookTitle}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex gap-x-9 justify-center">
                      <GrantAccessButton
                        bookID={data?.requestedBook?._id}
                        userID={data?.requestedBy?._id}
                        onGrantSuccess={handleGrantSuccess} // Pass callback
                      />
                      <DeclineAccessButton
                        bookID={data?.requestedBook?._id}
                        userID={data?.requestedBy?._id}
                        onGrantSuccess={handleGrantSuccess}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell className="text-black flex justify-center items-center font-bold text-xl w-full tracking-wider">
                No requests available
              </TableCell>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookRequestsPage;