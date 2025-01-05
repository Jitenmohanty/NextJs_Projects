"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session, router]);

  const NavItems = () => (
    <>
      {session && (
        <Link
          href="/dashboard"
          className="text-sm bg-primary/10 px-4 py-2 rounded-md hover:bg-primary/20 transition-colors"
        >
          Dashboard
        </Link>
      )}

      {session ? (
        <>
          <span className="text-sm text-muted-foreground">
            {user?.username || user?.email}
          </span>
          <Button
            onClick={() => signOut()}
            variant="destructive"
            size="sm"
            className="font-medium"
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href="/sign-in">
          <Button variant="default" size="sm" className="font-medium">
            Login
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold">
          <MessageSquare className="h-6 w-6" />
          <Link href="/" className="text-xl hover:text-primary transition-colors">
            True Feedback
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center gap-4">
            <NavItems />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu 
                    className={`h-5 w-5 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    } transition-all`}
                  />
                  <X
                    className={`absolute h-5 w-5 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    } transition-all`}
                  />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full pr-0">
                <SheetHeader>
                  <SheetTitle className="text-left px-2 "> Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4 px-6 pr-12">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;