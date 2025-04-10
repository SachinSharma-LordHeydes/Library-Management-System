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
import { Button } from "@/components/ui/button";

const BookRequestsPage = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch data based on filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParam = activeFilter !== "all" ? `?status=${activeFilter}` : "";
        const res = await fetch(`${BACKEND_URL}api/request/admin${queryParam}`, {
          method: "GET",
        });
        const requestedBookData = await res.json();

        console.log("requested book data--->",requestedBookData)
        
        if (requestedBookData.success) {
          setRequestData(requestedBookData.data);
        } else {
          console.error("Error fetching request data:", requestedBookData.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeFilter, BACKEND_URL]);

  // Function to handle request actions (approve/reject)
  const handleAction = async (requestId, action) => {
    try {
      const res = await fetch(`${BACKEND_URL}api/request/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          action,
        }),
      });

      const result = await res.json();

      console.log("resukt--->",result)
      
      if (result.success) {
        // Refresh the data after successful action
        const updatedRequestData = requestData.filter((request) => request._id !== requestId);
        setRequestData(updatedRequestData);
      } else {
        alert(result.message || "Failed to process request");
      }
    } catch (error) {
      console.error("Error handling action:", error);
      alert("An error occurred while processing your request");
    }
  };

  // Function to get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "request_pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "borrow_pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Function to get status display text
  const getStatusText = (status) => {
    switch (status) {
      case "request_pending":
        return "Borrow Request";
      case "borrow_pending":
        return "Return Request";
      case "success":
        return "Currently Borrowed";
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="text-2xl md:text-4xl font-bold tracking-wider mb-6">
        <h1>Book Request Management</h1>
      </div>

      {/* Filter buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button 
          onClick={() => setActiveFilter("all")}
          variant={activeFilter === "all" ? "default" : "outline"}
        >
          All Requests
        </Button>
        <Button 
          onClick={() => setActiveFilter("request_pending")}
          variant={activeFilter === "request_pending" ? "default" : "outline"}
        >
          Borrow Requests
        </Button>
        <Button 
          onClick={() => setActiveFilter("borrow_pending")}
          variant={activeFilter === "borrow_pending" ? "default" : "outline"}
        >
          Return Requests
        </Button>
        <Button 
          onClick={() => setActiveFilter("success")}
          variant={activeFilter === "success" ? "default" : "outline"}
        >
          Currently Borrowed
        </Button>
      </div>

      <div className="bg-white rounded-md shadow-2xl mt-6 w-full">
        <div className="flex justify-between px-6 py-4 text-lg font-bold tracking-wider">
          <div className="py-1">Request List</div>
        </div>
        <Table>
          <TableCaption>
            {loading ? "Loading..." : requestData.length === 0 ? "No requests available" : ""}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>User</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : requestData.length > 0 ? (
              requestData.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {data.requestedBy?.imageURL ? (
                        <img
                          src={data.requestedBy.imageURL}
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span>U</span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{data.requestedBy?.userName || "Unknown User"}</div>
                        <div className="text-sm text-gray-500">{data.requestedBy?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {data.requestedBook?.bookImageURL ? (
                        <img
                          src={data.requestedBook.bookImageURL}
                          alt="Book"
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
                          <span>B</span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{data.requestedBook?.bookTitle}</div>
                        <div className="text-sm text-gray-500">by {data.requestedBook?.bookAuthor}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(data.status)}`}
                    >
                      {getStatusText(data.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(data.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      {data.status === "request_pending" && (
                        <>
                          <Button 
                            onClick={() => handleAction(data._id, "approve")}
                            className="bg-green-500 hover:bg-green-600"
                            size="sm"
                          >
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleAction(data._id, "reject")}
                            variant="destructive"
                            size="sm"
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      {data.status === "borrow_pending" && (
                        <>
                          <Button 
                            onClick={() => handleAction(data._id, "approve")}
                            className="bg-green-500 hover:bg-green-600"
                            size="sm"
                          >
                            Accept Return
                          </Button>
                          <Button 
                            onClick={() => handleAction(data._id, "reject")}
                            variant="destructive"
                            size="sm"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {data.status === "success" && (
                        <span className="text-gray-500 text-sm">No action needed</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 font-medium">
                  No requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookRequestsPage;