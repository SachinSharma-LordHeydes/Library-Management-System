"use client";

import { ImageDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Button } from "./button";

export function ThreeDCard({ data, userID, requestBookStatus }) {

  console.log("3D card---->",data, userID, requestBookStatus)
  const [requestStatus, setRequestStatus] = useState(
    requestBookStatus?.status || "not-requested"
  );

  const handleRequestAction = async (actionType) => {
    try {
      const endpoint = "/api/request";
      let body = {
        requestedBy: userID,
        requestedBook: data._id,
        status: "request_pending",
      };

      // Set the appropriate status based on the action type
      if (actionType === "cancel") {
        body.status = "not-requested";
      } else if (actionType === "return") {
        body.status = "borrow_pending";
      } else if (actionType === "request") {
        body.status = "request_pending";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (result.success) {
        setRequestStatus(body.status);
      } else {
        alert(result.message || "An error occurred");
      }
    } catch (err) {
      console.error("Request error:", err);
      alert("Failed to process your request");
    }
  };

  const renderButton = () => {
    console.log("request Status--->", requestStatus);

    // Book is unavailable
    if (data.booksQuantity <= 0) {
      return <Button disabled>Unavailable</Button>;
    }

    switch (requestStatus) {
      case "not-requested":
      case undefined:
        return (
          <Button onClick={() => handleRequestAction("request")}>
            Request to Borrow Book
          </Button>
        );

      case "request_pending":
        return (
          <Button onClick={() => handleRequestAction("cancel")}>
            Cancel Borrow Book Request
          </Button>
        );

      case "borrow_pending":
        return (
          <Button onClick={() => handleRequestAction("cancel")}>
            Cancel Return Book Request
          </Button>
        );

      case "success":
        return (
          <Button onClick={() => handleRequestAction("return")}>
            Return Book
          </Button>
        );

      default:
        return (
          <Button onClick={() => handleRequestAction("request")}>
            Request to Borrow Book
          </Button>
        );
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#d4c3a7] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-9 border">
        <CardItem translateZ="100" className="w-full mt-4">
          {data.bookImageURL ? (
            <div>
              <Image
                src={data.bookImageURL}
                height="200"
                width="200"
                className="h-96 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </div>
          ) : (
            <div>
              <ImageDown />
            </div>
          )}
        </CardItem>

        <div className="mt-9 flex justify-end px-5 hover:scale-97 transition-all">
          {renderButton()}
        </div>
      </CardBody>
    </CardContainer>
  );
}
