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

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { screenSizeNavdata } from "../../../../public/navbar/screenSizeNavdata";

const LoginSignUp = () => {
  return (
    <div>
      <div className="">
        <div className="flex gap-x-1 justify-center items-center">
          <div>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton className="hidden md:block" />
                <SignUpButton className="hidden md:block" />
              </SignedOut>
              <SignedIn>
                <UserButton />
                <Sheet>
                  <SheetTrigger>
                    <AlignJustify size={20} />
                  </SheetTrigger>
                  <SheetContent className="bg-[#E1DCC5]">
                    <div className="px-4 pt-12">
                      {screenSizeNavdata.map((navigation, index) => (
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
                  </SheetContent>
                </Sheet>
              </SignedIn>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
