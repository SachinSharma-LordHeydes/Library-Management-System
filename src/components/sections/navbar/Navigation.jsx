"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const currentPath = usePathname();
  return (
    <div>
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
    </div>
  );
};

export default Navigation;
