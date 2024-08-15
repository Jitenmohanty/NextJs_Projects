"use client";

import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "@/app/svgs/xmark-solid.svg"; // Add your close icon SVG

const HamburgerMenu = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 z-50 bg-white border border-gray-200 shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Menu</h2>
        <Image
          src={closeIcon}
          alt="Close"
          width="24"
          height="24"
          onClick={onClose}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col space-y-4">
        {/* Add menu items here */}
        <button className="text-left">Alignment</button>
        <button className="text-left">Features</button>
      </div>
    </div>
  );
};

export default HamburgerMenu;
