"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
    const router = useRouter()
    const [name,setName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async()=>{
        const user = {
          name,
          email,
          password
        }
        console.log(user)
        try {
          setLoading(true);
          const response = await axios.post("/api/users/signup",user);
          console.log("user Signup!",response.data,"hfh")
          router.push("/login");
        } catch (error:any) {
          console.log("Something went wrong",error.message)

        }finally{
          setLoading(false)
        }
    }

   if(loading){
    <div className='bg-gray-500 h-screen text-4xl text-white'>Loading</div>
   }

  return (
    <div className='flex py-8 justify-center items-center'>
    <div className="inner flex flex-col justify-center items-center gap-2 border-2 border-red-300 py-4 px-6 rounded-lg">
        <h1 className='uppercase text-2xl font-bold text-gray-400 mb-3'>Signup here</h1>
        <label htmlFor=""  className=' text-gray-300 text-xl'>username</label>
        <input className='outline-none w-64 text-black p-2 rounded-md' value={name} onChange={(e)=>setName(e.target.value)} type="text"  placeholder='username..'/>
        <label htmlFor=""  className=' text-gray-300 text-xl'>Email</label>
        <input className='outline-none w-64 text-black p-2 rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)} type="email"  placeholder='email..'  />
        <label htmlFor="" className=' text-gray-300 text-xl'>password</label>
        <input className='outline-none p-2 w-64 text-black rounded-md ' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password..'  />
        <button className={`${(name && email) && password? "opacity-[1]":"opacity-[.6]"} p-2 bg-blue-500 rounded-lg px-4 mt-4 font-bold`} onClick={handleSubmit}>Signup</button>
       <div className='flex  gap-2'>
       <Link className='underline  text-blue-300' href={"/login"}>Already have account?</Link>
       </div>
    </div>
</div>
  )
}

export default page
