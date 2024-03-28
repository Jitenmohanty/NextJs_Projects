import React from "react";
import CursorSVG from "../../public/assets/CursorSVG";

type Props = {
  colors: string;
  x: number;
  y: number;
  message: string;
};

const Cursor = ({ colors, x, y, message }: Props) => {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
        <CursorSVG color={colors}/>
        
    </div>
  );
};

export default Cursor;
