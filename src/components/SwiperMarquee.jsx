"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const images = [
  "/marquee/download.jpeg",
  "/marquee/images (1).jpeg",
  "/marquee/images (2).jpeg",
  "/marquee/images (3).jpeg",
  "/marquee/images (4).jpeg",
  "/marquee/images (5).jpeg",
];

export default function VerticalMarquee({dureation}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    // Wait for images to load
    const loadPromises = images.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
      });
    });

    Promise.all(loadPromises).then(() => {
      if (!contentRef.current) return;

      const contentHeight = contentRef.current.offsetHeight;
      
      // Calculate the proper loop distance (single set height)
      const singleSetHeight = contentHeight / 2;


      gsap.to(contentRef.current, {
        y: `+=${singleSetHeight}`,
        duration:dureation,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: (y) => {
            const currentY = parseFloat(y);
            // Use wrap to create seamless looping
            return `${-gsap.utils.wrap(0, singleSetHeight, currentY)}px`;
          }
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="md:h-[600px] max-sm:h-[400px] sm:h-[400px] overflow-hidden relative">
      <div 
        ref={contentRef}
        className="flex flex-col gap-8 "
      >
        {[...images, ...images].map((img, i) => (
          <div key={i} className="w-44 h-56 md:w-53 md:h-64 relative">
            <img
              src={img}
              alt={`Item ${i}`}
              className="w-full h-full object-cover rounded-xl shadow-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}