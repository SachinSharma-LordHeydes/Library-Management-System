"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ThreeDMarqueeDemo() {
  const images = [
    "/marquee/download.jpeg",
    "/marquee/images.jpeg",
    "/marquee/images (1).jpeg",
    "/marquee/images (1).jpeg",
    "/marquee/images (1).jpeg",
    "/marquee/images (1).jpeg",
    "/marquee/images (2).jpeg",
    "/marquee/images (3).jpeg",
    "/marquee/images (4).jpeg",
    "/marquee/images (5).jpeg",
    "/marquee/images (6).jpeg",
    "/marquee/images (7).jpeg",
    "/marquee/images (1).jpeg",
    "/marquee/images (2).jpeg",
    "/marquee/images (3).jpeg",
    "/marquee/images (4).jpeg",
    "/marquee/images (5).jpeg",
    "/marquee/images (6).jpeg",
    "/marquee/images (7).jpeg",
    "/marquee/images (1).jpeg",
    "/marquee/images (2).jpeg",
    "/marquee/images (3).jpeg",
    "/marquee/images (4).jpeg",
    "/marquee/images (5).jpeg",
    "/marquee/images (6).jpeg",
    "/marquee/images (7).jpeg",
    "/marquee/images (1).jpeg",
    "/marquee/images (2).jpeg",
    "/marquee/images (3).jpeg",
    "/marquee/images (4).jpeg",
    "/marquee/images (5).jpeg",
    "/marquee/images (6).jpeg",
    "/marquee/images (7).jpeg",
  ];
  return (
    // to manage outline/ring around marquee
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-[#eae7d7] p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
