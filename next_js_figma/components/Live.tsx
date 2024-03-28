import React, { useCallback } from "react";
import { useMyPresence, useOthers } from "../liveblocks.config";
import LiveCursor from "./cursor/LiveCursor";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const handlePonterMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);
  const handlePonterLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePonterDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  return (
    <div
      onPointerMove={handlePonterMove}
      onPointerLeave={handlePonterLeave}
      onPointerDown={handlePonterDown}
      className="h-[100vh] w-full flex justify-center items-center"
    >
      <LiveCursor others={others} />
      <h1 className="text-5xl text-white">Liveblocks Figma clone</h1>
    </div>
  );
};

export default Live;
