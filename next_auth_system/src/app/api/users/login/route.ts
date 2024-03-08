import bcryptjs from "bcryptjs"
import { connect } from "@/dbConfig/DbConect";
import User from "@/model/userModel";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest) {
    try {

        const reqBody = await request.json();
        const {email,password} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
         

        const validatePassword = await bcryptjs.compare(password,user.password);
        if(!validatePassword){
            return NextResponse.json({error: "Wrong credentials!"}, {status: 400}) 
        }

        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_TOKEN!,{expiresIn:"1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

         response.cookies.set("token",token,{
            httpOnly:true
         })
         return response;
        
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message},{status:500})
    }
}


