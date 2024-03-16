import React from 'react'

const Rightbar = () => {
  return (
    <div className='bg-blue-950 hidden md:block lg:block border-[.1px] h-[60vh] p-3  rounded-lg border-yellow-100 w-[30%] lg:w-[30%] md:w-[45%]'>
        <div className="top flex justify-between  text-xl font-semibold text-white">
            <h1>Filter</h1>
            <h1>Save</h1>
        </div>
        <input type="text" placeholder='Search save post...' className='w-full px-2 mt-4 py-2 rounded-lg'/>
    </div>
  )
}

export default Rightbar;
