"use client";

const Post = ({ post, currentIndex }: any) => {
  return (
    <div className="flex flex-col  gap-4 py-2 justify-center items-center">
        <h1 className="text-gray-400">Description:</h1>
        <h3 className="text-2xl font-bold">{post[currentIndex]?.title}</h3>
        <p className="text-[15px]">{post[currentIndex]?.body}</p>
    </div>
  );
};

export default Post;
