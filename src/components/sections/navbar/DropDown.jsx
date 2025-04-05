"use client";

import { useAuth } from "@clerk/nextjs";

import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

const DropDown = () => {
  const { isSignedIn } = useAuth();
  return (
    <div>
      <div className="md:hidden flex items-center">
        <DropdownMenu className="border-none outline-0 ">
          <DropdownMenuTrigger>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`bg-[#C7A061]`}>
            <DropdownMenuItem>
              <Link href={"/"}>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/about"}>About</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/contact"}>Contact</Link>
            </DropdownMenuItem>
            {!isSignedIn && <DropdownMenuSeparator />}

            <DropdownMenuItem className={`${isSignedIn && "hidden"}`}>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </DropdownMenuItem>
            {!isSignedIn && <DropdownMenuSeparator />}

            <DropdownMenuItem className={`${isSignedIn && "hidden"}`}>
              <SignedOut>
                <SignUpButton />
              </SignedOut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DropDown;
