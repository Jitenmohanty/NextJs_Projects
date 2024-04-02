"use client";

import Live from "../components/Live";
import Navbar from "../components/Navbar";

export default function Page() {
  return (
    <div className="h-scrren overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <Live />
      </section>
    </div>
  );
}
