import FooterSection from "@/components/sections/Footer";
import NavBar from "@/components/sections/NavBar";
import { Inria_Sans } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "Library App",
  description: "Start Reading Online",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inriaSans.className} antialiased min-w-screen min-h-screen overflow-x-hidden bg-[#E6DFC5] text-black`}>
          {/* <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
          {/* <NavBar /> */}
          <div className="md:w-[80%]  sm:px-5 max-sm:px-5 mx-auto">
            {children}
          </div>
          {/* <FooterSection /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
