import FooterSection from "@/components/sections/Footer";
import NavBar from "@/components/sections/NavBar";
import { Inria_Sans } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

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
        <body
          className={`${inriaSans.className} antialiased min-w-screen min-h-screen overflow-x-hidden bg-[#E6DFC5] text-black`}
        >
          <NavBar />
          <div 
          // className="md:w-[80%]  sm:px-5 max-sm:px-5 mx-auto"
          className="w-full"
          >
            {children}
          </div>
          {<FooterSection />}
        </body>
      </html>
    </ClerkProvider>
  );
}
