"use client";

import ImageGallery from "@/components/Image";
import Post from "@/components/Post";
import {
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from "@/app/store/reducers/posts";
import useFetch from "@/app/utils/Fetching/page";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { FaRegSave, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();
  const { photosRes, postsRes } = useFetch();
  const savedPosts = useSelector((state: any) => state?.posts.savedPosts);
  const likedPosts = useSelector((state: any) => state?.posts.likedPosts);
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

  const handleLike = (post: any, photos: any) => {
    const posts = {
      post,
      photos,
    };
    dispatch(likePost(posts));
  };
  const handleUnLike = (id: any) => {
    dispatch(unlikePost(id));
  };
  const handleSavepost = (post: any, photos: any) => {
    const posts = {
      post,
      photos,
    };
    dispatch(savePost(posts));
  };
  const handleUnSavepost = (id: any) => {
    dispatch(unsavePost(id));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className=" flex flex-col gap-4">
        {posts &&
          posts.slice(page * 20 - 20, page * 20).map((post: any, index) => (
            <div
              key={index}
              className="bg-blue-950 min-h-[45vh]  lg:min-h-[60vh] flex flex-col border-[.1px] rounded-lg p-3 text-white border-yellow-100 "
            >
              {photos && (
                <ImageGallery photo={photos[(page - 1) * 20 + index]} />
              )}
              <Post post={post} />
              <div className="flex justify-end items-center gap-2">
                {likedPosts &&
                likedPosts.some((like: any) => like.post.id === post.id) ? (
                  <button
                    onClick={() => handleUnLike(post.id)}
                    className="text-3xl text-green-400"
                  >
                    <AiFillLike />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleLike(post, photos[(page - 1) * 20 + index])
                    }
                    className="text-3xl"
                  >
                    <BiLike />
                  </button>
                )}
                {savedPosts &&
                savedPosts.some((save: any) => save.post.id === post.id) ? (
                  <button
                    onClick={() => handleUnSavepost(post.id)}
                    className="text-2xl text-green-400"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleSavepost(post, photos[(page - 1) * 20 + index])
                    }
                    className="text-2xl"
                  >
                    <FaRegSave />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center">
        {" "}
        <button
          disabled={page === 1}
          className={` ${
            page === 1 ? "opacity-65" : "opacity-100"
          } px-2 py-1 bg-orange-400 font-semibold rounded-md `}
          onClick={prevPage}
        >
          Previous
        </button>
        <button
          disabled={page === totalPages}
          className={` ${
            page === totalPages ? "opacity-65" : "opacity-100"
          } px-2 py-1 bg-orange-400 font-semibold rounded-md`}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
