"use client";

import React, { useState } from "react";
import Toolbar from "@/app/Components/Toolbar";
import Grid from "@/app/Components/Grid";

export default function Home() {

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query:string) => {
    setSearchQuery(query)
  };

  return (
    <div className="min-h-screen bg-[#ffff] p-4">
      <h1 className="lg:text-2xl md:text-2xl text-lg font-bold mb-4 text-black text-center border-b-2 border-black font-serif">
        Spreadsheet Application
      </h1>
      <div className="toolbar">
        <Toolbar handleSearch={handleSearch} />
      </div>
      <Grid searchQuery={searchQuery}/>
    </div>
  );
}
