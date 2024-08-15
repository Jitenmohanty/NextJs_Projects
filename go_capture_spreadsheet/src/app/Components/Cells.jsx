"use client";

import { forwardRef } from "react";
import useCellStore from "@/app/store/cellStore";

const Cells = forwardRef(({ id }, ref) => {
  const cells = useCellStore((state) => state.cells);
  const updateCell = useCellStore((state) => state.updateCell);

  const setFocusedCellId = useCellStore((state) => state.setFocusedCellId);
  const alignment = cells[id]?.alignment || 'left'; // Default alignment

  //Update the cell content with ID
  const handleChange = (event) => {
    updateCell(id, event.target.value);
  };

  const handleFocus = () => {
    setFocusedCellId(id);
  };

  return (
    <input
    ref={ref}
      value={cells[id]?.content || ""} // Ensure it shows an empty string if undefined
      onChange={(e) => handleChange(e)}
      onFocus={handleFocus}
      className={`p-2 border text-black font-semibold capitalize border-gray-300 text-sm text-center focus:outline-4 focus:bg-slate-300 rounded-lg text-${alignment}`}
      style={{ textAlign: alignment }} // Apply the alignment style
    />
  );
});

export default Cells;
