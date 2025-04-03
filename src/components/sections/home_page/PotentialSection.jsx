import ChangeTextColour from "@/components/ui/ChangeTextColour";

const PotentialSection = () => {
  return (
    <div>
      <div className="flex md:justify-between md:flex-row flex-col justify-center max-sm:items-center md:gap-x-2 ">
        <div className="w-[90%] ">
          <div className="text-4xl lg:text-5xl">
            <h1>
              Unlock{" "}
              <ChangeTextColour style={"text-[#DD7500] font-bold"}>
                Potential
              </ChangeTextColour>{" "}
              with{" "}
              <ChangeTextColour style={"text-[#DD7500] font-bold"}>
                Books
              </ChangeTextColour>{" "}
            </h1>
          </div>
          <div className="w-[90%] text-lg text-[#572200] mt-9">
            <p>
              Books unlock your potential by teaching, entertaining, and
              inspiring. This platform delivers this gift, connecting you to
              stories and ideas that matter.
            </p>
          </div>
        </div>
        <div className="w-full flex md:justify-end justify-center mt-16">
          <img src="/marquee/images.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PotentialSection;
