"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const GetUserImage = () => {
  const { user } = useUser();

  if (!user) return null;
  return (
    <div className="flex items-center gap-x-6 justify-baseline">
      <div>
        <Image
          src={user.imageUrl}
          alt="user image"
          height={50}
          width={50}
          className="rounded-full"
        />
      </div>
      <div className="text-3xl ">{user.fullName}</div>
    </div>
  );
};

export default GetUserImage;
