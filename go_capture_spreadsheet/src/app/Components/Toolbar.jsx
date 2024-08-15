"use client";

import React, { useState } from "react";
import Image from "next/image";
import Searchbar from './Searchbar';
import useCellStore from "@/app/store/cellStore";
import HamburgerMenu from './HamburgerMenu';

import centerAlign from "@/app/svgs/align-center-solid.svg";
import leftAlign from "@/app/svgs/align-left-solid.svg";
import rightAlign from "@/app/svgs/align-right-solid.svg";
import undo from "@/app/svgs/arrow-rotate-left-solid.svg";
import redo from "@/app/svgs/arrow-rotate-right-solid.svg";
import menuIcon from "@/app/svgs/bars-solid.svg";

const Toolbar = ({ handleSearch }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const focusedCellId = useCellStore((state) => state.focusedCellId);
  const setAlignment = useCellStore((state) => state.setAlignment);
  const undos = useCellStore((state) => state.undo);
  const redos = useCellStore((state) => state.redo);

  const handleAlignmentChange = (alignment) => {
    if (focusedCellId !== null) {
      setAlignment(focusedCellId, alignment);
    }
  };

  return (
    <div className="relative text-black w-full mb-2">
      {/* Hamburger menu for mobile view */}
      <div className="block absolute top-[-6vw] right-2 lg:hidden md:hidden ">
        <Image
          src={menuIcon}
          alt="Menu"
          width="24"
          height="24"
          className="cursor-pointer"
          onClick={() => setMenuOpen(true)}
        />
        {isMenuOpen && (
          <HamburgerMenu onClose={() => setMenuOpen(false)} />
        )}
      </div>

      {/* Toolbar for desktop view */}
      <div className={`hidden md:flex lg:flex justify-between`}>
        <div className="flex gap-4 w-1/2">
          <div className="left lg:w-[18vw] text-sm border md:w-[22vw] w-[28vw] border-[#191d1b] rounded-md ">
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
          <div className="left lg:w-[12w] text-sm md:w-[18vw] w-[24vw]  border border-[#191d1b] rounded-md">
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
        </div>
        <Searchbar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Toolbar;
