"use client"

import React from 'react';
import Cells from './Cells';

const Grid = () => {
  const numberOfRows = 9;
  const numberOfColumns = 5;
  const totalCells = numberOfRows * numberOfColumns;

  return (
    <div
      className="grid grid-cols-50 gap-1 border-2 border-black rounded-lg overflow-hidden p-2 bg-[#1f0d3f]"
      style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }}
    >
      {[...Array(totalCells)].map((_, index) => (
        <Cells key={index} id={index} />
      ))}
    </div>
  );
};

export default Grid;
