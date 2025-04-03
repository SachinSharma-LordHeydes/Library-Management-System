"use client";

import { useState } from "react";
import { genreNavData } from "../../../../public/home/genreraNavData";

const genreBookDetails = genreNavData.map((genre) => genre.books);


const GenreSection = () => {
  
  const [currentGenre,setCurrentGenre]=useState(0);
  
  return (
    <div className="mb-32">
      <div className="bg-[#CFB68C] py-3 w-[60%] md:w-[80%] mx-auto text-lg items-center px-2 rounded-md mb-16">
        <div className="flex justify-around ">
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
      <div className="flex justify-around gap-x-9">
        {genreBookDetails[currentGenre]?.map((books, index) => (
          <div
            key={index}
            className=" bg-[#CFB68C] h-[250px] w-[200px] lg:h-[300px] lg:w-[350px] rounded-lg px-4 py-2 my-9 shadow-amber-950 shadow-md hover:shadow-none cursor-pointer"
          >
            <div className="h-[30%]  text-lg lg:text-4xl  font-extrabold">
              <h1> {books.title}</h1>
            </div>
            <div className="lg:line-clamp-none lg:text-xl sm:line-clamp-4">
              {books.description}
            </div>

            <div className="border-[1px] border-dashed border-amber-100 my-5 w-[80%] mx-auto lg:my-9"/>

            <div className="flex justify-between w-[80%] mx-auto lg:text-lg ">
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
