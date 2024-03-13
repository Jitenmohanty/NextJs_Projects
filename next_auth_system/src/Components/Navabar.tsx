"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Navabar = () => {
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  const authToken = async () => {
    const response = await axios.get("/api/users/authenticated");
    setAuth(response.data.data);
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.warning("User logout sucessfully!")
      router.push("/login");
    } catch (error: any) {
      toast.error("Something Went wrong!")
      console.log(error.message);
    }
  };
  useEffect(() => {
    authToken();
  }, [auth, authToken]);

  return (
    <div className=" bg-[#150e35] px-8 flex justify-between items-center w-full h-16">
      <div className="logo lg:block  hidden">
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
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`uppercase text-sm font-bold ${
            pathname === "/profile" ? "text-gray-400 " : ""
          }`}
          href={"/profile"}
        >
          Profile
        </Link>
        {auth ? (
          <button
            onClick={logout}
            className="uppercase text-sm font-bold border-white transition-all hover:bg-red-700 text-white  py-2 px-4 rounded"
          >
            Logout
          </button>
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
