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

import UserModel from "@/app/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { dashboardNavigation } from "../../../../public/dashboard/dashboardNavigation";

console.log("user name-->", auth());

const LoginSignUp = async () => {
  await dbConnect();
  const { userId } = await auth();
  console.log("user id-->", await auth());
  const userData = await UserModel.findOne({ clerkId: userId });
  console.log("dashboard unfilterd-->", dashboardNavigation, userData);
  const dashboardNavigationFiltered = dashboardNavigation.filter(
    (user) => user.role === userData?.role || user.role === ""
  );

  console.log("dashboard accorfing yo role-->", dashboardNavigationFiltered);

  return (
    <div>
      <div className="">
        <div className="flex gap-x-1 justify-center items-center">
          <div>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton
                  forceRedirectUrl="/dashboard"
                  className="hidden md:block"
                />
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
                      {dashboardNavigationFiltered?.map((navigation, index) => (
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
