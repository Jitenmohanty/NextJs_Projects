import React, { useCallback, useEffect, useState } from "react";
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
} from "../liveblocks.config";
import LiveCursor from "./cursor/LiveCursor";
import {
  CursorMode,
  CursorState,
  Reaction,
} from "../types/type";
import CursorChart from "./cursor/CursorChart";
import FlyingReaction from "./reaction/FlyingReaction";
import ReactionSelector from "./reaction/ReactionButtons";
import useInterval from "../hooks/useInterval";
import { Comments } from "./comments/Comments";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@radix-ui/react-context-menu";
import { shortcuts } from "@/constants";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  undo:()=>void,
  redo:()=>void
};

const Live = ({ canvasRef,undo,redo }: Props) => {
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const broadcast = useBroadcastEvent();
  const [reaction, setReaction] = useState<Reaction[]>([]);

  const setReactions = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  useInterval(() => {
    setReaction((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    );
  }, 1000);

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReaction((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });
    }
  }, 100);
  // useEventListener is used to listen to events broadcasted by other
  // * users.
  useEventListener((eventData) => {
    const event = eventData.event;

    setReaction((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({
          mode: CursorMode.Hidden,
        });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  const handlePonterMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePonterLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePonterDown = useCallback(
    (event: React.PointerEvent) => {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction
        ? { ...state, isPressed: true }
        : state
    );
  }, []);

  const handleContextMenuClick = useCallback((key: string) => {
    switch (key) {
      case "Chat":
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
        break;

      case "Reactions":
        setCursorState({ mode: CursorMode.ReactionSelector });
        break;

      case "Undo":
        undo();
        break;

      case "Redo":
        redo();
        break;

      default:
        break;
    }
  }, []);

  return (
    <ContextMenu>
      <ContextMenuTrigger
        onPointerMove={handlePonterMove}
        onPointerLeave={handlePonterLeave}
        onPointerDown={handlePonterDown}
        onPointerUp={handlePointerUp}
        className='relative  h-full w-full flex-1 items-center justify-center'
      >
        <canvas width='1000' height='700' ref={canvasRef} />

        <LiveCursor/>
        {cursor && (
          <CursorChart
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}

        {cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector
            setReaction={(reaction) => {
              setReactions(reaction);
            }}
          />
        )}

        {/* Render the reactions */}
        {reaction &&
          reaction.map((reaction) => (
            <FlyingReaction
              key={reaction.timestamp.toString()}
              x={reaction.point.x}
              y={reaction.point.y}
              timestamp={reaction.timestamp}
              value={reaction.value}
            />
          ))}
        <Comments />
      </ContextMenuTrigger>
      <ContextMenuContent className='right-menu-content'>
        {shortcuts.map((item) => (
          <ContextMenuItem
            onClick={()=>handleContextMenuClick(item.name)}
            className='mt-1 rounded-sm border-none px-2 text-sm outline-none hover:bg-gray-700'
            key={item.key}
          >
            <p className='px-2 text-xs text-gray-300'>{item.name}</p>
            <p className='px-2 text-gray-300'>{item.shortcut}</p>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Live;
