"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }
  }, [session]);

  return (
    <nav className="p-4 md:p-4 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className=" flex gap-4">
          <Link  href={"/"} className="text-xl font-bold mb-4 md:mb-0">
            True Feedback
          </Link>
          {session ? (
            <Link
              className=" border-[1px] p-[4px] text-sm hover:border-gray-600 transition-all ease-in-out rounded-md border-blue-400"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          ) : (
            <></>
          )}
        </div>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <ModeToggle/>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto hover:bg-red-500 font-bold hover:text-white transition-all ease-in-out  bg-slate-100 text-black"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href={"/sign-in"}>
            <Button
              className="w-full md:w-auto hover:bg-blue-500 hover:text-white transition-all ease-in-out  bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
