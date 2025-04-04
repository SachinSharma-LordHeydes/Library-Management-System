"use client";

import { useState } from "react";
import { genreNavData } from "../../../../public/home/genreraNavData";

const genreBookDetails = genreNavData.map((genre) => genre.books);


const GenreSection = () => {
  
  const [currentGenre,setCurrentGenre]=useState(0);
  
  return (
    <div className=" ">
      <div className="bg-[#CFB68C] py-3 w-full text-sm max-md:w-[70%] lg:w-[70%] mx-auto md:text-lg items-center px-2 rounded-md mb-16">
        <div className="flex justify-around flex-wrap gap-2">
          {genreNavData.map((genre, index) => (
            <div
              key={index}
              onClick={()=>setCurrentGenre(index)}
              className={`bg-[#E2DCC5] hover:bg-amber-100 px-2 py-1 rounded-md  ${currentGenre===index?"bg-amber-100":""} cursor-pointer md:text-lg lg:text-xl`}   >
              <h1>{genre.genre}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center max-sm:flex-wrap gap-x-9 mx-auto">
        {genreBookDetails[currentGenre]?.map((books, index) => (
          <div
            key={index}
            className=" bg-[#CFB68C] h-[250px] w-[200px] lg:h-[300px] lg:w-[300px] rounded-lg px-4 py-2 my-9 shadow-amber-950 shadow-md hover:shadow-none cursor-pointer"
          >
            <div className="h-[30%]  text-lg lg:text-4xl  font-extrabold">
              <h1> {books.title}</h1>
            </div>
            <div className=" lg:text-xl line-clamp-3 ">
              {books.description}
            </div>

            <div className="border-[1px] border-dashed border-amber-100 my-5 w-[80%] mx-auto lg:my-9"/>

            <div className="flex justify-between w-[80%] items-center mx-auto lg:text-lg ">
              <div>Read By</div>
              <div>{books.readByPeople}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
