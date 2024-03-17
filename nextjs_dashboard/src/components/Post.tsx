"use client";

const Post = ({ post }: any) => {
  return (
    <div className="flex flex-col  gap-4 py-2 justify-center items-center">
        <h1 className="text-gray-400">Description:</h1>
        <h3 className="text-2xl capitalize font-bold">{post?.title}</h3>
        <p className="text-[15px] capitalize">{post?.body}</p>
    </div>
  );
};

export default Post;
