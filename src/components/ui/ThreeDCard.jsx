"use client";

import { ImageDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Button } from "./button";

export function ThreeDCard({ data, userID, requestBookStatus }) {
  const [status, setStatus] = useState(requestBookStatus);

  const handleRequestToggle = async (e) => {
    if (e.target.innerHTML === "Request to borrow") {
      try {
        const res = await fetch("/api/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy: userID,
            requestedBook: data._id,
            status: "pending",
          }),
        });

        const result = await res.json();
        console.log("API result:", result);

        if (result.success) {
          if (status === "pending") {
            setStatus("not-requested");
          } else {
            setStatus("pending");
          }
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error("Request error:", err);
      }
    } else {
      try {
        const res = await fetch("/api/request/decline", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookID:data._id,
            userID:userID,
            newStatus: "not-requested",
          }),
        });
  
        const result = await res.json();
        console.log("Grant result:", result);
        setStatus("not-requested")
      } catch (err) {
        console.error("Error:", err);
      } finally {
      }
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
          {data.booksQuantity > 0 ? (
            <div>
              {(status === "not-requested" ||
                status === "success" ||
                status === undefined) && (
                <Button onClick={handleRequestToggle}>Request to borrow</Button>
              )}
              {status === "pending" && (
                <Button onClick={handleRequestToggle}>Cancel Request</Button>
              )}
            </div>
          ) : (
            <div>
              <Button disabled>Unavailable</Button>
            </div>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
}
