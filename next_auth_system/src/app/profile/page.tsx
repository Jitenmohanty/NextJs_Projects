"use client";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const showDetails = useCallback(async () => {
    const userDetail = await axios.get("/api/users/userDetails");
    console.log(userDetail);
    setData(userDetail?.data?.data._id);
  }, []);

  return (
    <div className="flex gap-4 relative flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <h1>Profile Details</h1>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          ""
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-black border absolute top-4 right-4 border-white mt-4  hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={showDetails}
        disabled={data !== "nothing"}
        className={`bg-black border  border-white mt-4  hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${data !== "nothing"?"opacity-[.4]":"opacity-[1]"}`}
      >
        User Detail
      </button>
    </div>
  );
}
