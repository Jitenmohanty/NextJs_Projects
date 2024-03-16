"use client";
import Link from "next/link";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDashboard, MdSearch } from "react-icons/md";

const Navbar = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex fixed top-0  justify-between items-center h-[9vh] w-full bg-[#353131] px-2 lg:px-8 md:px-4 py-2">
      <div className="flex justify-start lg:w-[70%] w-[90%] text-white items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 ">
        <MdSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-inherit outline-none w-[100%]"
        />
      </div>
      <div className="flex gap-1 lg:gap-4 md:gap-2 ">

      <Link href={"/"} className="text-white"><MdDashboard size={28}/></Link>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex  gap-4 relative text-white"
        >

        <CgProfile className="cursor-pointer" size={28} />
        {hover && (
          <ul className="bg-black text-[1.2vw] text-gray-300 flex flex-col gap-2 font-mono font-semibold px-4 py-2 rounded-lg absolute top-6 right-4 uppercase">
            <Link href={"/Pages/Like"} className="cursor-pointer">Likes</Link>
            <Link href={"/Pages/Save"} className="cursor-pointer">Save</Link>
            <Link href={"/Pages/Profile"} className="cursor-pointer">Profile</Link>
          </ul>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
