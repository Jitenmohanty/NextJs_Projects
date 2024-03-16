"use client";
import ImageGallery from "@/app/components/Image";
import Post from "@/app/components/Post";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Like = () => {
  // const likedPosts = useSelector((state: any) => state.posts.likedPosts);
  const [likedPosts,setLikedPost] = useState<any>();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem("likedPosts")){
      let likePost = JSON.parse(localStorage.getItem("likedPosts")!);
      setLikedPost(likePost)
    }
  },[])

  return (
    <div className="mt-16 flex flex-col w-full gap-8 justify-center items-center text-white">
      <h1 className="uppercase mt-8 text-3xl font-bold ">Liked Post</h1>
      <div className="main my-2 flex flex-col lg:flex-row  w-full justify-center items-center flex-wrap gap-4">
        {likedPosts &&
          likedPosts?.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-blue-950  min-h-[65vh] lg:w-[40%] w-[90%] flex flex-col border-[.1px] rounded-lg p-3 text-white border-yellow-100 gap-4 "
            >
              <ImageGallery photo={item.photos}/>
              <Post post={item.post}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Like;
