import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Money Manager – Smart Personal Finance App",
  description:
    "Manage multiple accounts, track transactions, and get automatic email alerts when your spending exceeds limits or budget reaches 90%. AI-powered money management made simple.",
  keywords: [
    "AI Money Manager",
    "Personal finance tracker",
    "Transaction management",
    "Budget tracking",
    "Multi-account management",
    "Expense alerts",
    "Smart finance app",
  ],
  authors: [{ name: "Jitu Development" }],
  openGraph: {
    title: "AI Money Manager – Smart Personal Finance App",
    description:
      "AI-powered personal finance dashboard for tracking multiple accounts, transactions, and budgets in real time.",
    url: "https://next-js-projects-4kry.vercel.app/",
    siteName: "AI Money Manager",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "AI Money Manager Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo2.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Favicon and SEO metadata (Next.js automatically adds these via `metadata`) */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/logo2.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="theme-color"
            content="#9333ea"
          />
        </head>
        <body className={`${inter.className} antialiased`}>
          {/* Header */}
          <Header />

          <main className="min-h-screen">{children}</main>

          <Toaster richColors />

          {/* Footer */}
          <footer className="flex justify-center items-center h-16 bg-gray-300 text-white py-12">
            <div className="container mx-auto px-4 text-center text-blue-400">
              <p>© {new Date().getFullYear()} Jitu Development with 💗</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
