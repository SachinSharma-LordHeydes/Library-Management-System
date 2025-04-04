"use client";

import SwiperMarquee from "@/components/SwiperMarquee";
import { Button } from "@/components/ui/button";
import ChangeTextColour from "@/components/ui/ChangeTextColour";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="felx justify-center max-sm:my-28">
      <div className="flex md:justify-between md:flex-row flex-col justify-center sm:items-center md:gap-x-2">
        <div className="flex justify-center items-center">
          <div className="w-[90%] md:block max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
            <div className="text-3xl lg:text-5xl ">
              <h1 className="">
                Your Next
                <ChangeTextColour style={"text-[#DD7500] font-bold"}>
                  Book
                </ChangeTextColour>
                Awaits
              </h1>
              <h1>
                Be Part of Our
                <ChangeTextColour style={"text-[#DD7500] font-bold"}>
                  Library
                </ChangeTextColour>
                Today.
              </h1>
            </div>
            <div className="w-[90%] sm:text-lg  lg:text-lg text-[#572200] mt-9">
              your next read is just a search away, explore our collection,
              check availability, and borrow instantly. Connect with us now to
              dive into books and a welcoming reader network!
            </div>

            <div className="md:mt-9 my-9 flex justify-center">
              <Button size={"lg"} className={`bg-[#CFB68C] hover:bg-amber-100 text-black text-lg`}>
                Join Now <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-fit flex md:justify-end sm:mt-16 max-sm:w-full max-sm:justify-center max-sm:items-center">
          <div className="flex gap-x-2 md:gap-x-9">
            <div>
              <SwiperMarquee dureation={30} />
            </div>
            <div className="md:hidden hidden max-sm:block lg:block">
              <SwiperMarquee dureation={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
