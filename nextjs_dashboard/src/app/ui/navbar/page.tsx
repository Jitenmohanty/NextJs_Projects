"use client";
import { usePathname } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex fixed top-0  justify-between items-center h-[9vh] w-full bg-blue-950 px-8 py-2">
      <div className="flex justify-start w-[50%] text-white items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 ">
        <MdSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-inherit outline-none w-[100%]"
        />
      </div>
      <div className="flex gap-4 text-white">
        <MdOutlineChat size={20} />
        <MdNotifications size={20} />
        <MdPublic size={20} />
      </div>
    </div>
  );
};

export default Navbar;
