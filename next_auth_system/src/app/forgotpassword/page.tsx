"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  
  const onsubmit: any = async () => {
    try {
      if (email.length > 0) {
        await axios.post("/api/users/forgotpassword", {
          email,
        });
        setSent(true);
        toast.success("Email sent!");
      }
    } catch (error: any) {
      toast.error("Something Went wrong!");
      setSent(false);
    }
  };
  

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="inner  flex flex-col justify-center items-center gap-4 border-2 border-red-300 py-8 px-6 rounded-lg">
        <h1 className="uppercase text-2xl font-bold text-gray-400">
          Enter your email
        </h1>
        <label htmlFor="" className=" text-gray-300 text-xl">
          Email
        </label>
        <input
          className="outline-none w-80 text-black p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email.."
        />

        <button
          onClick={onsubmit}
          className={`p-2 bg-green-500  rounded-lg px-4 mt-4 font-bold cursor-pointer ${
            sent ? "opacity-[.6]" : "opacity-[1]"
          } `}
        >
          Sent
        </button>

        <div className="flex  gap-8">
          <Link
            href={"/login"}
            className=" 
           p-2 bg-blue-500 rounded-lg px-4 mt-4 font-bold cursor-pointer"
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className=" 
           p-2 bg-blue-500 rounded-lg px-4 mt-4 font-bold cursor-pointer"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
