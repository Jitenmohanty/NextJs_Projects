"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Gauge, PlusCircle, BarChart3, Bell,X } from "lucide-react";
import ReactMarkdown from "react-markdown";

const demoSlides = [
  {
    icon: <Key className="inline w-6 h-6 mr-2 text-blue-600" />,
    title:  "Sign In Seamlessly  ",
    description: `
Start your journey by signing in securely with Google — powered by **Clerk Authentication**. 
No passwords, no hassle — just a single tap to log in. 
Once verified, you’re instantly redirected to your personalized dashboard.`,
  },
  {
    icon: <Gauge className="inline w-6 h-6 mr-2 text-blue-600" />,
    title: " Smart Dashboard Overview",
    description: `
Your **AI-powered dashboard** gives a complete overview of all your finances at a glance.  
Add multiple accounts — like *Current* or *Savings* — and mark one as your **Primary Account**.  
Set your **monthly expense limit**, and when spending reaches 90%, our system automatically triggers an email alert via a background **cron job**.  
You’ll also see interactive charts for **recent transactions**, **monthly expense breakdowns**, and quick financial insights.`,
  },
  {
    icon: <PlusCircle className="inline w-6 h-6 mr-2 text-blue-600" />,
    title: " Add Transactions — Powered by AI",
    description: `
Click on the **“Add Transaction”** button in the top-right corner to record any income or expense.  
Manually enter details, or upload a **bill or receipt** — our built-in **AI Receipt Scanner** reads the amount, date, and category automatically.  
Select which account was used, and your balance updates in real-time.  
This feature turns boring bookkeeping into an effortless, intelligent process.`,
  },
  {
    icon: <BarChart3 className="inline w-6 h-6 mr-2 text-blue-600" />,
    title: " Deep Transaction Insights",
    description: `
Click on any **Account** from the dashboard to open its detailed insights view.  
You’ll find visual **bar and pie charts** showing your income vs. expenses, with advanced filters like *Last 7 Days*, *This Month*, or *3 Months*.  
Quickly search or filter by bank, account, or transaction type.  
Gain a clear financial perspective in seconds — no spreadsheets, no manual effort.`,
  },
  {
    icon: <Bell className="inline w-6 h-6 mr-2 text-blue-600" />,
    title: " Automation & AI Alerts",
    description: `
Behind the scenes, the platform runs **AI-driven automation**.  
If your spending crosses 90% of your set budget, you get a **real-time email alert**.  
Our system continuously analyzes spending patterns, categorizes your expenses, and surfaces actionable insights — helping you stay financially healthy with minimal effort.`,
  },
];

const HeroSection = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    if (currentSlide === demoSlides.length - 1) {
      setShowDemo(false);
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? demoSlides.length - 1 : prev - 1
    );
  };

  return (
    <section className="pt-40 pb-20 px-4 relative">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="px-8"
            onClick={() => setShowDemo(true)}
          >
            Watch Demo
          </Button>
        </div>

       <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Demo Slider Popup */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              key={currentSlide}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-[90%] max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-gray-200 neumorphic"
            >
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>

              <div className="mb-6">
                <h1 className="text-sm text-gray-500 mb-2 tracking-wide">
                  Step {currentSlide + 1} of {demoSlides.length}
                </h1>
                <h2 className="text-3xl font-bold gradient-title flex justify-center items-center gap-2">
                  {demoSlides[currentSlide].icon}
                  {demoSlides[currentSlide].title}
                </h2>

              </div>


            <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-gray-700 text-lg leading-relaxed mb-4" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-gray-900" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="text-purple-600 font-medium" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside text-left mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="pl-2 text-gray-700 leading-relaxed" {...props} />
                  ),
                }}
              >
                {demoSlides[currentSlide].description}
              </ReactMarkdown>


              {/* Progress Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {demoSlides.map((_, index) => (
                  <span
                    key={index}
                    className={`h-3 w-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-blue-500 scale-110"
                        : "bg-gray-300"
                    }`}
                  ></span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-8">
                <Button variant="outline" onClick={prevSlide}>
                  ← Back
                </Button>
                <Button onClick={nextSlide}>
                  {currentSlide === demoSlides.length - 1
                    ? "Finish"
                    : "Next →"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;

