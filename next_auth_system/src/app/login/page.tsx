"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div className="bg-gray-500 h-screen text-4xl text-white">Loading</div>;
  }

  return (
    <div className="flex py-14 justify-center items-center">
      <div className="inner flex flex-col justify-center items-center gap-4 border-2 border-red-300 py-8 px-6 rounded-lg">
        <h1 className="uppercase text-2xl font-bold text-gray-400">
          Login Here
        </h1>
        <label htmlFor="" className=" text-gray-300 text-xl">
          username
        </label>
        <input
          className="outline-none w-64 text-black p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email.."
        />
        <label htmlFor="" className=" text-gray-300 text-xl">
          password
        </label>
        <input
          className="outline-none p-2 w-64 text-black rounded-md "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password.."
        />
        <button
          className={`${
            email && password ? "opacity-[1]" : "opacity-[.6]"
          } p-2 bg-blue-500 rounded-lg px-4 mt-4 font-bold cursor-pointer`}
          onClick={handleSubmit}
        >
          Login
        </button>
        <div className="flex  gap-2">
          <Link href={"/forgotpassword"} className="underline text-blue-300">
            Forgot password?{" "}
          </Link>
          {"|"}
          <Link className="underline  text-blue-300" href={"/signup"}>
            Create Here?
          </Link>
        </div>
      </div>
    </div>
  );
}
