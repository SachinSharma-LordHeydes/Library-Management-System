"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AlignJustify, PanelTopDashed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { screenSizenavdata } from "../../../public/navbar/screenSizeNavdata";

import { useAuth } from "@clerk/nextjs";

console.log(useAuth);

const NavBar = () => {
  const currentPath = usePathname();

  const { isSignedIn } = useAuth();

  return (
    <div className="fixed w-full top-0 left-0 z-50">
      <div className="bg-[#CFB68C] mx-auto w-full ">
        <div className="md:w-[80%] max-sm:px-5 sm:px-5 mx-auto flex justify-between h-[55px] items-center text-[20px] md:text-[1.5rem]">
          {/* logo  */}
          <div>
            logo
            {/* <Image/> */}
          </div>

          {/* navigation  */}
          <div className="space-x-7 hidden md:block">
            <Link
              className={`hover:text-[#DD7500] ${
                currentPath === "/" && "text-[#DD7500]"
              }`}
              href={"/"}
            >
              Home
            </Link>
            <Link
              className={`hover:text-[#DD7500] ${
                currentPath === "/about" && "text-[#DD7500]"
              }`}
              href={"/about"}
            >
              About
            </Link>
            <Link
              className={`hover:text-[#DD7500] ${
                currentPath === "/contact" && "text-[#DD7500]"
              }`}
              href={"/contact"}
            >
              Contact
            </Link>
          </div>

          {/* loginsignUp */}
          <div className="hidden md:block">
            <div className="flex gap-x-1 justify-center items-center">
              <div>
                <header className="flex justify-end items-center p-4 gap-4 h-16">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </header>
              </div>
              <div>
                {isSignedIn && (
                  <div>
                    <Link href={"/dashboard"}>
                      <PanelTopDashed />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* hambourger navbar  */}

          <div className="md:hidden block font-bold">
            <div>
              <Sheet>
                <SheetTrigger>
                  <AlignJustify size={20} />
                </SheetTrigger>
                <SheetContent className="bg-[#E1DCC5]">
                  {/* <SheetHeader>
                  </SheetHeader> */}

                  <div className="px-4 pt-12">
                    {screenSizenavdata.map((navigation, index) => (
                      <div key={index}>
                        <SheetClose asChild>
                          <Link
                            href={navigation.Link}
                            key={index}
                            className="my-2 text-lg flex justify-center items-center"
                          >
                            {navigation.Navigation}
                          </Link>
                        </SheetClose>
                        <div className="border-[1px] border-amber-800 w-[150px] mx-auto" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <SheetClose asChild>
                      <header className="flex flex-col text-lg">
                        <SignedOut>
                          <SignInButton />
                          <div className="border-[1px] border-amber-800 w-[150px] mx-auto my-2" />
                          <SignUpButton />
                        </SignedOut>
                        {isSignedIn && (
                          <div>
                            <Link
                              href={"/dashboard"}
                              className="flex justify-center items-center w-full"
                            >
                              Dashboard
                            </Link>
                            <div className="border-[1px] border-amber-800 w-[150px] mx-auto my-2" />
                          </div>
                        )}
                        <SignedIn>
                          <div className="flex justify-center items-center w-full px-5">
                            <UserButton />
                          </div>
                        </SignedIn>
                      </header>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
