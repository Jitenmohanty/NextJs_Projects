"use client";

import useFetch from "@/app/utils/Fetching/page";
import ImageGallery from "@/app/components/Image";
import { useState } from "react";
import Post from "@/app/components/Post";

const Posts = () => {
  const { photosRes, postsRes } = useFetch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosRes?.length);
  };
  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % photosRes?.length);
  };

  return (
    <div className="bg-blue-950 min-h-[65vh] border-[.1px] rounded-lg p-3 text-white border-yellow-100  w-[70%]">
      <div className="image border-b-[.1px]  flex flex-col gap-3 justify-center items-center w-full ">
        <ImageGallery images={photosRes} currentIndex={currentIndex} />
      </div>

      <div className="post p-4">
        <Post post={postsRes} currentIndex={currentIndex} />
      </div>
      <div className="flex justify-between items-end">
        {" "}
        <button
          className="px-2 py-1 bg-orange-400 font-semibold rounded-lg ml-4"
          onClick={previousImage}
        >
          previous
        </button>
        <button
          className="px-2 py-1 bg-orange-400 font-semibold rounded-lg ml-4"
          onClick={nextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
