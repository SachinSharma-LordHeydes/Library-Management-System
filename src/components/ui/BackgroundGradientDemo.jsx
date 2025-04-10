"use client";
import Image from "next/image";
import Link from "next/link";
import { BackgroundGradient } from "./background-gradient";

export function BackgroundGradientDemo({ data }) {

  console.log("gradient data--->",data)
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] h-[500px] w-[400px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-center ">
            <Image
              src={data.bookImageURL}
              alt="jordans"
              height="200"
              width="200"
              className="object-contain rounded-md"
            />
          </div>
          <div className="items-end">
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {data.bookTitle}
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {data.bookDescription}
            </p>
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <Link href={`/dashboard/books/${data._id}`}>View Detail →</Link>
            </button>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
