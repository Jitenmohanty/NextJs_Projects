"use client";
import Image from "next/image";

function ImageGallery({ photo }: any) {
  return (
    <div className="flex flex-col  gap-1 py-2 justify-center items-center">
      <Image
        src={photo?.url}
        alt={photo?.title}
        height={80}
        width={100}
        className="h-32 w-32 rounded-full"
      />
      <p className="text-gray-300 capitalize">{photo?.title}</p>
    </div>
  );
}

export default ImageGallery;
