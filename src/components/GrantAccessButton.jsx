"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const GrantAccessButton = ({ bookID, userID, onGrantSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleGrant = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/request/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookID,
          userID,
          newStatus: "success",
        }),
      });

      const result = await res.json();
      console.log("Grant result:", result);

      if (result.success) {
        onGrantSuccess(bookID, userID); // Notify parent of success
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleGrant} disabled={loading}>
        {loading ? "Granting..." : "Grant"}
      </Button>
    </div>
  );
};

export default GrantAccessButton;