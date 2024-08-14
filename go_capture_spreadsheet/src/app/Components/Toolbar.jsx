"use client";

import Searchbar from "@/app/Components/Searchbar";

import centerAlign from "@/app/svgs/align-center-solid.svg";
import leftAlign from "@/app/svgs/align-left-solid.svg";
import rightAlign from "@/app/svgs/align-right-solid.svg";
import undo from "@/app/svgs/arrow-rotate-left-solid.svg";
import redo from "@/app/svgs/arrow-rotate-right-solid.svg";
import Image from "next/image";
const Toolbar = ({ handleSearch }) => {
  return (
    <div className="toolbar  text-black  w-full  mb-2">
      <div className="comp flex justify-between ">
        <div className="feature flex gap-4">
        <div className="left w-[18vw] text-sm border border-[#191d1b] rounded-md ">
          <h2 className="font-bold text-lg text-center  text-blue-800 font-serif">
            Alignment
          </h2>

          <div className="flex w-full justify-around ">
            <Image
              className="text-gray-500"
              src={leftAlign}
              alt="Left"
              width="18"
              height="18"
            />
            <Image
              className="text-gray-500"
              src={centerAlign}
              alt="Center"
              width="18"
              height="18"
            />
            <Image
              className="text-gray-500"
              src={rightAlign}
              alt="right"
              width="18"
              height="18"
            />
          </div>
        </div>
        <div className="left w-[10vw] text-sm border border-[#191d1b] rounded-md">
          <h2 className="font-bold text-lg text-center  text-blue-800 font-serif">
            Features
          </h2>
        <div className="flex justify-around">
        <Image
              className="text-gray-500"
              src={undo}
              alt="Undo"
              width="18"
              height="18"
            />
            <Image
              className="text-gray-500"
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
