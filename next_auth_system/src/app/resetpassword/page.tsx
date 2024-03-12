"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const onTokenVerify = async () => {
    try {
      await axios.post("/api/users/verifyforgitpasswordtoken", { token });
      toast.success("User verify sucessfully!");
      setVerified(true);
    } catch (error: any) {
      setError(true);
      toast.error("Something Went wrong!");
      console.log(error);
    }
  };
  const onResetPassword = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      if (response.status === 200) {
        toast.success("Password updated sucessfull!");
      }
      router.push("/login");
    } catch (error: any) {
      setError(true);
      toast.error("Something Went wrong!");
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      onTokenVerify();
    }
  }, [token]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="inner flex flex-col justify-center items-center gap-4 border-2 border-red-300 py-8 px-6 rounded-lg">
        <h1 className="uppercase text-2xl font-bold text-gray-400">
          Reset Password
        </h1>

        {error && <p className="text-red-500">Error on verify Email!</p>}
       
        {verified && (
          <div className="flex flex-col gap-4 justify-center items-center">
            {" "}
            <label htmlFor="" className=" text-gray-300 text-xl">
              New password:
            </label>
            <input
              className="outline-none p-2 w-64 text-black rounded-md "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password.."
            />
            <button
              className="
    p-2 bg-blue-500 rounded-lg px-4 mt-4 font-bold cursor-pointer"
              onClick={onResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
