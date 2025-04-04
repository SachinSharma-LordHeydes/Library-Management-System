"use client";

import GenreSection from "@/components/sections/home_page/GenreSection";
import HeroSection from "@/components/sections/home_page/HeroSection";
import PotentialSection from "@/components/sections/home_page/PotentialSection";

export default function Home() {
  return (
    <div className="">
      <div className="bg-[#E6DFC5] text-[#3D2C1D]  ">
        {/* Hero Section */}
        <div className="flex justify-center items-center sm:h-[100vh] w-full  ">
          <HeroSection />
        </div>

        {/* Potential Section */}
        <div className="mb-32 ">
          <PotentialSection />
        </div>

        {/* Genres Section  */}
        <div className="mb-32">
          <GenreSection />
        </div>
      </div>
    </div>
  );
}
