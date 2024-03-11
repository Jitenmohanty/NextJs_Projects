"use client";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");
  const [user, setUser] = useState<any>({});
  const [details, setDeatail] = useState(false);

  const showDetails = useCallback(async () => {
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    });
    const userDetail = await axios.get("/api/users/userDetails");

    setData(userDetail?.data?.data._id);
    setUser(userDetail?.data.data);
    setDeatail(true);
  }, []);

  return (
    <div className="flex gap-4 relative flex-col items-center justify-center  py-14">
      <h1 className="text-2xl text-yellow-600 font-semibold">
        User profile details
      </h1>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          ""
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      {details && user && (
        <div className="flex flex-col border-2 border-red-300 p-6 text-lg">
          <h1>
            <span className="text-gray-400">username :</span> {user?.username}
          </h1>
          <h1>
            <span className="text-gray-400">email :</span> {user?.email}
          </h1>
          <h1>
            <span className="text-gray-400">userId :</span> {user?._id}
          </h1>
        </div>
      )}

      <button
        onClick={showDetails}
        disabled={data !== "nothing"}
        className={`bg-black border  border-white mt-4  hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
          data !== "nothing" ? "opacity-[.4]" : "opacity-[1]"
        }`}
      >
        User Detail
      </button>
    </div>
  );
}
