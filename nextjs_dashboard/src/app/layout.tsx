import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar/page";

import { Providers } from "./store/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post Dashboard",
  description: "Next js app with dashboard...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
