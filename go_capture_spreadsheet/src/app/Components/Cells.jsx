"use client"

import { forwardRef } from "react";

const Cells = forwardRef(({ id },ref) => {
  
    return (
      <input
        ref={ref}
        className={`p-2 border text-black font-semibold capitalize border-gray-300 text-sm text-center focus:outline-4 focus:bg-slate-300  rounded-lg`}

      />
    );
  });

  export default Cells;
  