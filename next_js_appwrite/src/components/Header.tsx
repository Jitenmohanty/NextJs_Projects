"use client";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { authStatus } = useAuth();
  const router = useRouter();

  return (
    <div className="fixed z-50 bg-[#231859] px-8 flex justify-between items-center w-full h-16">
      <div className="logo lg:block  hidden">
        <img
          className="h-12 w-12 rounded-2xl"
          src="https://images.pexels.com/photos/39624/padlock-lock-chain-key-39624.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
      <div className="flex justify-around items-center w-full lg:w-[40%]  text-white text-lg">
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
        {authStatus ? (
          <Link
            href={"/logout"}
            className="uppercase text-sm font-bold border-white transition-all hover:bg-red-700 text-white  py-2 px-4 rounded"
          >
            Logout
          </Link>
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

export default Header;
