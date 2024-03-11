"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePageWithId() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  return (
    <div className="flex gap-4 relative flex-col  items-center justify-center py-16">
      <h1>Profile Details</h1>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <h4 className="text-2xl text-red-400">Page is Building....</h4>
      <hr />
    </div>
  );
}
