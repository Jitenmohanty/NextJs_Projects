"use client";

import ImageGallery from "@/app/components/Image";
import Post from "@/app/components/Post";
import useFetch from "@/app/utils/Fetching/page";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();
  const { photosRes, postsRes } = useFetch();
  const [photos, setPhotos] = useState(photosRes);
  const [posts, setPosts] = useState(postsRes);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
    setPhotos(photosRes);
    setPosts(postsRes);
    setCurrentIndex(0);
  }, [photos, posts, photosRes, postsRes]);

  const totalPages = Math.ceil(posts?.length / 20);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos?.length);
    setCurrentIndex(0);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos?.length) % photos?.length
    );
  };

  const prevPage = () => {
    setPage((prevPage) => prevPage - 1);
    setCurrentIndex(0);
  };


  return (
    <div className="w-full flex flex-col gap-4">
      <div className=" flex flex-col gap-4">
        {posts &&
          posts.slice(page * 20 - 20, page * 20).map((post, index) => (
            <div
              key={index}
              className="bg-blue-950  min-h-[60vh] flex flex-col border-[.1px] rounded-lg p-3 text-white border-yellow-100 "
            >
              {photos && (
                <ImageGallery photo={photos[(page - 1) * 20 + index]} />
              )}
              <Post post={post} />
              <div className="flex justify-end items-center gap-2">
                <button  className="text-3xl">
                  <BiLike />
                </button>
                {/* <BiLike/><AiFillLike/><FaSave/> */}
                <button className="text-2xl">
                  <FaRegSave />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center">
        {" "}
        <button
          disabled={page === 1}
          className={` ${page === 1?"opacity-65":"opacity-100"} px-2 py-1 bg-orange-400 font-semibold rounded-md `}
          onClick={prevPage}
        >
          Previous
        </button>
        <button
          disabled={page === totalPages}
          className={` ${page === totalPages?"opacity-65":"opacity-100"} px-2 py-1 bg-orange-400 font-semibold rounded-md`}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
