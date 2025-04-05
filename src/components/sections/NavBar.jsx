import { useAuth } from "@clerk/nextjs";
import DropDown from "./navbar/DropDown";
import LoginSignUp from "./navbar/LoginSignUp";
import Navigation from "./navbar/Navigation";

console.log(useAuth);

const NavBar = async () => {

  const userDataResponse=await fetch(http://googel.com)

  return (
    <div className="fixed w-full top-0 left-0 z-50">
      <div className="bg-[#CFB68C] mx-auto w-full ">
        <div className="md:w-[90%] max-sm:px-5 sm:px-5 mx-auto flex justify-between h-[55px] items-center text-[20px] md:text-[1.5rem]">
          {/* logo  */}
          <div className="">
            logo
            {/* <Image/> */}
          </div>

          {/* navigation  */}
          <Navigation />

          <div className="flex items-center justify-center ">
            {/* screen size navBar  */}
            <DropDown />

            {/* loginsignUp */}
            <LoginSignUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
