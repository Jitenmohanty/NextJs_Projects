"use client"

import React, { useState } from 'react';
import Toolbar from '@/app/Components/Toolbar'
import Grid from '@/app/Components/Grid'

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black text-center">Spreadsheet Application</h1>
      < Toolbar/>
      {/* <SearchBar /> */}
      <Grid  />
      <div className="pagination-controls">
        <button >
          Previous
        </button>
        <button >
          Next
        </button>
      </div>
    </div>
  );
}
