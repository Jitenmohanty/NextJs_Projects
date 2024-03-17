"use client";
import ImageGallery from "@/components/Image";
import Post from "@/components/Post";
import { unlikePost } from "@/app/store/reducers/posts";
import React, { useEffect, useState } from "react";
import { CgFileRemove } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "@/app/utils/Fetching/fetch";

const Like = () => {
  const likedPosts = useSelector((state: any) => state.posts.likedPosts);
  const dispatch = useDispatch();
  const {loading} = useFetch();



  function handleRemove(id: any): void {
    dispatch(unlikePost(id))
  }

  if (loading) {
    return (
      <div className="loader">
        <div></div>
      </div>
    );
  }

  return (
    <div className="mt-16 flex flex-col w-full gap-8 justify-center items-center text-white">
      <h1 className="uppercase mt-8 text-3xl font-bold ">Liked Post</h1>
      <div className="main my-2 flex flex-col lg:flex-row  w-full justify-center items-center flex-wrap gap-4">
        {likedPosts &&
          likedPosts?.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-blue-950 min-h[50vh]  lg:min-h-[65vh] lg:w-[40%] w-[90%] flex flex-col border-[.1px] rounded-lg p-3 text-white border-yellow-100 gap-4 "
            >
              <ImageGallery photo={item.photos}/>
              <Post post={item.post}/>
              <div className="flex justify-end items-end">
                <button onClick={()=>handleRemove(item.post.id)}><MdDelete size={25} color="red"/></button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Like;
