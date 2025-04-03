"use client"

import { usePathname } from 'next/navigation';
import Link from "next/link";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath)
  return (
    <div className='fixed w-full top-0 left-0 z-50'>
      <div className="bg-[#CFB68C] mx-auto w-full ">
        <div className="md:w-[80%] max-sm:px-5 sm:px-5 mx-auto flex justify-between h-[55px] items-center text-[1.5rem]">
          {/* logo  */}
          <div>
            logo
            {/* <Image/> */}
          </div>

          {/* navigation  */}
          <div className="space-x-7">
            <Link className={`hover:text-[#DD7500] ${currentPath==="/"&&"text-[#DD7500]"}`} href={"/"}>
              Home
            </Link>
            <Link className={`hover:text-[#DD7500] ${currentPath==="/about"&&"text-[#DD7500]"}`} href={"/about"}>
              About
            </Link>
            <Link className={`hover:text-[#DD7500] ${currentPath==="/contact"&&"text-[#DD7500]"}`} href={"/contact"}>
              Contact
            </Link>
          </div>

          {/* loginsignUp */}
          <div>login signup</div>
        </div>
        {/* <div className="flex gap-[4rem] text-[20px]">
          <div>
            <Link href="/Home" className='text-orange-500 '>Home</Link>
          </div>
          <div>
            <Link href="/Contact" className='hover:text-orange-500'>Contact</Link>
          </div>
          <div>
            <Link href="/About" className='hover:text-orange-500'>About</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
