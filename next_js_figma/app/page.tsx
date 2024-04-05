"use client";

import { useEffect, useRef, useState } from "react";
import Live from "../components/Live";
import Navbar from "../components/Navbar";
import { fabric } from "fabric";
import { handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasObjectModified, handleCanvaseMouseMove, handleResize, initializeFabric, renderCanvas } from "@/lib/canvas";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { ActiveElement } from "@/types/type";
import { useMutation, useStorage } from "@/liveblocks.config";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>("rectangle");
  const activeObjectRef = useRef<fabric.Object | null>(null)

  const canvasObjects = useStorage((root)=>root.canvasObjects);

  const syncShapeInStorage = useMutation(({storage},object)=>{
    if(!object) return;

    const {objectId} = object;
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");

    canvasObjects.set(objectId,shapeData);

  },[])

  const [activeElement,setActiveElement]  = useState<ActiveElement>({
    name:"",
    value:"",
    icon:""
  })

  const handleActiveElement = (elem:ActiveElement)=>{
    setActiveElement(elem)
    selectedShapeRef.current = elem?.value as string;
  }

  useEffect(()=>{
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef
    })
  },[canvasObjects])

  useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    /**
     * listen to the mouse down event on the canvas which is fired when the
     * user clicks on the canvas
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });
    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage
      });
    });
    canvas.on("mouse:up", (options) => {
      handleCanvasMouseUp({
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef
      });
    });

    canvas.on("object:modified",(options)=>{
        handleCanvasObjectModified({
          options,
          syncShapeInStorage,
          
        })
    })
    

   
    /**
     * listen to the resize event on the window which is fired when the
     * user resizes the window.
     *
     * We're using this to resize the canvas when the user resizes the
     * window.
     */
    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });

    
  }, [canvasRef]); // run this effect only once when the component mounts and the canvasRef changes

  return (
    <div className="h-screen overflow-hidden">
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement}/>
      <section className="flex h-full  flex-row">
        <LeftSidebar/>
        <Live canvasRef={canvasRef}/>
        <RightSidebar/>
      </section>
    </div>
  );
}
