import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";

const Header = () => {
  return (
    <div className="fixed h-[3rem] top-0 w-full bg-white/80 backdrop-blur-md border-b shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center h-full">
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:block">Dashboard</span>
              </Button>
            </Link>
            <Link
              href={"/transactions/create"}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button>
                <PenBox size={18} />
                <span className="hidden md:block">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
