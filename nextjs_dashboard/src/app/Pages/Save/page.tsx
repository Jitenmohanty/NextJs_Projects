"use client";
import ImageGallery from "@/components/Image";
import Post from "@/components/Post";
import { unsavePost } from "@/app/store/reducers/posts";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch,useSelector } from "react-redux";

const Save = () => {
  const savedPosts = useSelector((state: any) => state.posts.savedPosts);
  const dispatch = useDispatch();


  function handleRemove(id: any): void {
    dispatch(unsavePost(id))

  }

  return (
    <div className="mt-16 flex flex-col w-full gap-8 justify-center items-center text-white">
      <h1 className="uppercase mt-8 text-3xl font-bold ">Saved Post</h1>
      <div className="main flex flex-col my-2 lg:flex-row  w-full justify-center items-center flex-wrap gap-4">
        {savedPosts &&
          savedPosts?.map((item: any, index: number) => (
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

export default Save;
