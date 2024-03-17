"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDashboard, MdSearch } from "react-icons/md";

const Navbar = () => {
  const [hover, setHover] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex fixed top-0  justify-between items-center h-[7vh] lg:h-[9vh] w-full bg-[#353131] px-2 lg:px-8 md:px-4 py-2">
      <div className="flex justify-start lg:w-[70%] w-[80%] text-white items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 ">
        <MdSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-inherit outline-none w-[100%]"
        />
      </div>
      <div className="flex gap-1 lg:gap-4 md:gap-6 ">
        <Link
          href={"/"}
          className={`${
            pathname === "/" ? "text-gray-400 " : "text-white"
          }  flex justify-center items-center`}
        >
          <MdDashboard className="text-2xl lg:text-sm lg:mr-0 mr-2" />{" "}
          <h3 className="text-[12px] uppercase lg:block hidden">dashboard</h3>
        </Link>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`${
            pathname === "/pages/like" || "/pages/save" || "/pages/profile"
              ? "text-gray-500"
              : ""
          }  flex  gap-4 relative text-white`}
        >
          <CgProfile className="cursor-pointer" size={28} />
          {hover && (
            <ul className="bg-black text-lg lg:text-[1.2vw] text-gray-300 flex flex-col gap-2 font-mono font-semibold px-4 py-2 rounded-lg absolute top-6 right-4 uppercase">
              <Link
                href={"/pages/like"}
                className={`${
                  pathname === "/pages/like" ? "text-gray-500 " : ""
                } cursor-pointer`}
              >
                Likes
              </Link>
              <Link
                href={"/pages/save"}
                className={`${
                  pathname === "/pages/save" ? "text-gray-500 " : ""
                } cursor-pointer`}
              >
                Save
              </Link>
              <Link
                href={"/pages/profile"}
                className={`${
                  pathname === "/pages/profile" ? "text-gray-500 " : ""
                } cursor-pointer`}
              >
                Profile
              </Link>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
