"use client"
import Image from "next/image";


function ImageGallery({ images,currentIndex }:any) {

  

  return (
    <div className='flex flex-col  gap-1 py-2 justify-center items-center'>
      <Image src={images[currentIndex]?.url} alt={images[currentIndex]?.title} height={80} width={100}  className="h-32 w-32 rounded-full" />
      <p className='text-gray-400'>{images[currentIndex]?.title}</p>

    </div>
  );
}

export default ImageGallery;
