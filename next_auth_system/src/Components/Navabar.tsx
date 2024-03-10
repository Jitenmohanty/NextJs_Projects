"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./AuthStatus";

const Navabar = ({ request }: any) => {
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
        
  }, []);

  return (
    <div className=" bg-[#150e35] px-8 flex justify-between items-center w-full h-16">
      <div className="logo">
        <img
          className="h-12 w-12 rounded-2xl"
          src="https://images.pexels.com/photos/39624/padlock-lock-chain-key-39624.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
      <div className="flex justify-around items-center gap-8 text-white text-lg">
        <Link
          className={`uppercase text-sm font-bold ${
            pathname === "/" ? "text-gray-400 " : ""
          }`}
          href={"/home"}
        >
          Home
        </Link>
        <Link
          className={`uppercase text-sm font-bold ${
            pathname === "/about" ? "text-gray-400 " : ""
          }`}
          href={"/about"}
        >
          About
        </Link>
        {auth ? (
          <Link href={"/logout"}>Logout</Link>
        ) : (
          <>
            <Link
              className={`uppercase text-sm font-bold ${
                pathname === "/login" ? "text-gray-400 " : ""
              }`}
              href={"/login"}
            >
              Login
            </Link>
            <Link
              className={`uppercase text-sm font-bold ${
                pathname === "/signup" ? "text-gray-400 " : ""
              }`}
              href={"/signup"}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navabar;
