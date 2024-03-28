import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJs with appwrite",
  description:
    "How intigrate appwrite with NextJs,Appwrite with NextJs authentication || How appwrite work with context api and next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
      </body>
    </html>
  );
}
