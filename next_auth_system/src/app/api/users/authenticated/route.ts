import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
        try {
            const cookiesList = cookies()
            const hasCookie = cookiesList.has('token')
            return NextResponse.json({message:"cokkies fetch",data:hasCookie});
        } catch (error:any) {
            return NextResponse.json({error:error.message})
        }
}   