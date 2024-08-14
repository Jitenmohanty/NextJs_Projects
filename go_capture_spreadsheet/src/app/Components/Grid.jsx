"use client";

import React, { useState, useRef, useCallback } from 'react';
import Cells from './Cells';

const Grid = ({searchQuery}) => {
  const numberOfColumns = 5; // Number of columns per row
  const totalCells = 1000; // Total number of cells
  const cellsPerLoad = 45; // Number of cells to load per scroll
  const [visibleCells, setVisibleCells] = useState(cellsPerLoad); // Initial number of visible cells

  const observer = useRef(); // Ref to keep track of the observer

  const lastCellRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCells < totalCells) {
          setVisibleCells((prev) => prev + cellsPerLoad);
        }
      });
      if (node) observer.current.observe(node);
    },
    [visibleCells]
  );

  const filteredCells = [...Array(totalCells)]
    .map((_, index) => index)
    .filter((id) => `Cell ${id + 1}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div
      className="grid gap-1 border-2 border-black rounded-lg overflow-hidden p-2 bg-[#1f0d3f]"
      style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }}
    >
      {filteredCells.slice(0, visibleCells).map((id, index) => {
          if (index + 1 === visibleCells) {
            return <Cells key={id} id={id} ref={lastCellRef} />;
          } else {
            return <Cells key={id} id={id} />;
          }
        })}
    </div>
  );
};

export default Grid;
