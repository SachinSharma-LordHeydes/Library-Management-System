"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}) => {

  console.log("Infinite SCROLLING Items0--->",items)

  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-9xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative  max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[#ffffff] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)] shadow-sm"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none  pointer-events-none  absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20  font-normal  text-neutral-800 dark:text-gray-100">
                <img
                  src={item.bookImageURL}
                  alt="images"
                  className="w-[500px] h-[200px] rounded-sm  object-fill"
                />
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.bookTitle}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400 line-clamp-3">
                    {item.bookDescription}
                  </span>
                </span>
              </div>
              <div className="text-end">
                <Link href={`/dashboard/books/${item.id}`}>View Detail →</Link>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
