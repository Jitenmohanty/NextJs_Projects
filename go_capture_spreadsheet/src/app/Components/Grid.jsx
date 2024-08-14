"use client"

import React from 'react';
import Cells from './Cells';

const Grid = () => {
  const numberOfRows = 20;
  const numberOfColumns = 6;
  const totalCells = numberOfRows * numberOfColumns;

  return (
    <div
      className="grid grid-cols-50 gap-1"
      style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }}
    >
      {[...Array(totalCells)].map((_, index) => (
        <Cells key={index} id={index} />
      ))}
    </div>
  );
};

export default Grid;
