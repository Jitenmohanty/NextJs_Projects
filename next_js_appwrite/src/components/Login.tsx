"use client";
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [fromdata, setFromdata] = useState({
    email: "",
    password: "",
  });
  const { setAuthStatus } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const session = await appwriteService.login(fromdata);
      toast.success("user created sucessfully");
      if (session) {
        setAuthStatus(true);
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error("Invalid credential!");
    }
  };

  return (
    <div className="flex py-14 justify-center items-center">
      <form action="" onSubmit={handleSubmit}>
        <div className="inner flex flex-col justify-center items-center gap-4 border-2 border-red-300 py-8 px-6 rounded-lg">
          <h1 className="uppercase text-2xl font-bold text-gray-400">
            Login Here
          </h1>
          <label htmlFor="" className=" text-gray-300 text-xl">
            email
          </label>
          <input
            className="outline-none w-64 text-black p-2 rounded-md"
            value={fromdata.email}
            onChange={(e) =>
              setFromdata((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            name="email"
            placeholder="enter your email.."
          />
          <label htmlFor="" className=" text-gray-300 text-xl">
            password
          </label>
          <input
            className="outline-none p-2 w-64 text-black rounded-md "
            value={fromdata.password}
            name="password"
            onChange={(e) =>
              setFromdata((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            placeholder="password.."
          />
          <button
          disabled={ fromdata.email.length === 0 && fromdata.password.length === 0}
            type="submit"
            className={`${
              fromdata.email && fromdata.password
                ? "opacity-[1]"
                : "opacity-[.6] cursor-not-allowed"
            } p-2 bg-blue-500 rounded-lg px-4 mt-4 font-bold cursor-pointer`}
          >
            Login
          </button>
          <div className="flex  gap-2">
            <Link href="#" className="underline text-blue-300">
              Forgot password?{" "}
            </Link>
            {"|"}
            <Link className="underline  text-blue-300" href={"/signup"}>
              Create Here?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
