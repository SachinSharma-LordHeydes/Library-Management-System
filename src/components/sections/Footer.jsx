"use client";

import { FacebookIcon, Instagram, Mail, Phone, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

const FooterSection = () => {
  const path = usePathname();
  const isHiddenPath = path === "/contact" || path.startsWith("/dashboard");
  return (
    <div>
      {!isHiddenPath && (
        <div className={``}>
          <div className="bg-black py-10 px-6">
            <footer className="flex flex-col md:flex-row gap-10 md:gap-32 justify-center w-full text-center md:text-left">
              <ul className="flex-1">
                <li className="text-white text-2xl mt-2">Get in touch</li>
                <div className="text-white h-1 w-[8rem] bg-orange-500 mx-auto md:mx-0"></div>
                <li className="text-white text-[18px] mt-4">
                  "Read, Borrow, Return - Seamlessly managed"
                </li>
                <li className="text-white flex justify-center md:justify-start mt-4">
                  <FacebookIcon className="mt-[4px] mr-2" />
                  Itahari-2, Sunsari
                </li>
                <li className="text-white flex justify-center md:justify-start">
                  <Mail className="mt-[4px] mr-2" />
                  susmalibrary@gmail.com
                </li>
                <li className="text-white flex justify-center md:justify-start">
                  <Phone className="mt-[4px] mr-2" />
                  +977-9800000000
                </li>
              </ul>

              <ul className="flex-1">
                <li className="text-white text-2xl mt-2">Quick Links</li>
                <div className="text-white h-1 w-24 bg-orange-500 mx-auto md:mx-0"></div>
                <div className="text-white flex flex-col gap-2 mt-4">
                  <li>Home</li>
                  <li>About</li>
                  <li>Contact</li>
                </div>
              </ul>

              <ul className="flex-1">
                <li className="text-white text-2xl mt-2">Library Policies</li>
                <div className="text-white h-1 w-24 bg-orange-500 mx-auto md:mx-0"></div>
                <div className="text-white flex flex-col gap-2 mt-4">
                  <li>Privacy and Terms</li>
                  <li>Borrowing Rules</li>
                  <li>Late Return Policies</li>
                  <li className="text-white text-[15px] mt-4">Follow Us</li>
                  <li className="flex justify-center md:justify-start gap-4 mt-2">
                    <FacebookIcon size={40} />
                    <Instagram size={40} />
                    <Twitter size={40} />
                  </li>
                </div>
              </ul>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterSection;
