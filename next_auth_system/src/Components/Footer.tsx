import Link from "next/link";
import icon from "react-icons";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TbBrandGmail } from "react-icons/tb";

const Footer = () => {


  return (
    <div className=" border-t-[1px] border-gray-700 px-14 py-3 flex justify-between items-center w-full absolute bottom-2">
      <div className="logo flex gap-6 text-sm text-gray-600">
        <p>@copyrights 2024</p>
        <Link href={"https://portfolio-react-me.vercel.app/"}>#JitenDev</Link>
      </div>
      <div className="flex justify-around items-center gap-2 text-white text-lg">
        <Link href={"https://portfolio-react-me.vercel.app/"}>
          <FaLinkedin />
        </Link>
        <Link href={"https://instagram.com/jitujitenmohanty"}>
          <FaInstagram />
        </Link>
        <Link href={"https://github.com/jitenmohanty"}>
          <FaGithub />
        </Link>
        <Link href={"https://github.com/jitenmohanty"}>
          <TbBrandGmail />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
