"use client"

import React, { useState } from 'react';
import Toolbar from '@/app/Components/Toolbar'
import Grid from '@/app/Components/Grid'

export default function Home() {

  const handleSearch = ()=>{

  }

  return (
    <div className="min-h-screen bg-[#ffff] p-4">
      <h1 className="text-2xl font-bold mb-4 text-black text-center border-b-2 border-black font-serif">Spreadsheet Application</h1>
     <div className="toolbar">
     < Toolbar handleSearch={handleSearch}/>
     </div>
      <Grid  />
      <div className="pagination-controls text-black flex justify-between mt-2">
        <button className='p-1 text-white bg-blue-600 rounded-md hover:bg-black text-[1.2vw] px-4 '>
          Previous
        </button>
        <button className='p-1 text-white bg-blue-600 rounded-md hover:bg-black text-[1.2vw] px-4'>
          Next
        </button>
      </div>
    </div>
  );
}
