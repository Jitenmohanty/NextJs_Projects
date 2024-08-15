"use client";

import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "@/app/svgs/xmark-solid.svg"; // Add your close icon SVG
import Searchbar from './Searchbar';
import useCellStore from "@/app/store/cellStore";

import centerAlign from "@/app/svgs/align-center-solid.svg";
import leftAlign from "@/app/svgs/align-left-solid.svg";
import rightAlign from "@/app/svgs/align-right-solid.svg";
import undo from "@/app/svgs/arrow-rotate-left-solid.svg";
import redo from "@/app/svgs/arrow-rotate-right-solid.svg";
const HamburgerMenu = ({ isMenuOpen,onClose,handleSearch }) => {

  const [isClosing, setIsClosing] = useState(false);
  const focusedCellId = useCellStore((state) => state.focusedCellId);
  const setAlignment = useCellStore((state) => state.setAlignment);
  const undos = useCellStore((state) => state.undo);
  const redos = useCellStore((state) => state.redo);

  const handleAlignmentChange = (alignment) => {
    if (focusedCellId !== null) {
      setAlignment(focusedCellId, alignment);
    }
  };


  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 700); // Duration should match the CSS transition
  };

  return (
    <div className={`fixed top-0 right-0 z-50 h-1/2 w-full rounded-ee-xl transition-all duration-700 ease-in-out transform ${
      isClosing ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
    }  ${
      isMenuOpen ?  "translate-x-0 opacity-100":"translate-x-full opacity-0" 
    } bg-gray-300 border border-gray-200 shadow-lg p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Menu</h2>
        <Image
          src={closeIcon}
          alt="Close"
          width="24"
          height="24"
          onClick={handleClose}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col space-y-4">
       <div className="flex flex-col gap-4 w-full">
          <div className="left lg:w-[18vw] text-sm border md:w-[22vw] w-full h-[18vw] border-[#191d1b] rounded-md ">
            <h2 className="font-bold text-lg text-center text-blue-800 font-serif">
              Alignment
            </h2>
            <div className="flex w-full justify-around">
              <Image
                onClick={() => handleAlignmentChange('left')}
                className="text-gray-500 cursor-pointer"
                src={leftAlign}
                alt="Left"
                width="18"
                height="18"
              />
              <Image
                onClick={() => handleAlignmentChange('center')}
                className="text-gray-500 cursor-pointer"
                src={centerAlign}
                alt="Center"
                width="18"
                height="18"
              />
              <Image
                onClick={() => handleAlignmentChange('right')}
                className="text-gray-500 cursor-pointer"
                src={rightAlign}
                alt="Right"
                width="18"
                height="18"
              />
            </div>
          </div>
          <div className="left lg:w-[12w] text-sm md:w-[18vw] w-full h-[18vw]  border border-[#191d1b] rounded-md">
            <h2 className="font-bold text-lg text-center text-blue-800 font-serif">
              Features
            </h2>
            <div className="flex justify-around">
              <Image
                className="text-gray-500 cursor-pointer"
                onClick={undos}
                src={undo}
                alt="Undo"
                width="18"
                height="18"
              />
              <Image
                className="text-gray-500 cursor-pointer"
                onClick={redos}
                src={redo}
                alt="Redo"
                width="18"
                height="18"
              />
            </div>
          </div>
          <Searchbar onSearch={handleSearch}/>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
