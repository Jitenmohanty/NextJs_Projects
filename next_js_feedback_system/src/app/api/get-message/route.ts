import dbConnect from "@/lib/DbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/user.model";
import mongoose from "mongoose";


export async function GET(request:Request) {
    await dbConnect();
    const session = await getServerSession(authOptions)
    const _user:User = session?.user as User;

    if(!session || !_user){
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }
    //Convert if id in string it convert it into number
    const userId = new mongoose.Types.ObjectId(_user._id);

    try {
        //Add agrigetion pipelining for fillter out all messages with sorting order.
        const user = await UserModel.aggregate([
            {$match:{_id:userId}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}}
        ]).exec();

        if(!user || user.length === 0){
            return Response.json(
                { message: 'User not found', success: false },
                { status: 404 }
              );
        }

        return Response.json(
            {messages:user[0].messages},
            {status:200}
        )

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { success: false, message: 'Error on getting messages' },
            { status: 500 }
          );
    }

}