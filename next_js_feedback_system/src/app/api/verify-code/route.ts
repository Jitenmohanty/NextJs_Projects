import dbConnect from "@/lib/DbConnect";
import UserModel from "@/model/user.model";


export async function POST(request:Request) {
    await dbConnect();

    try {
        const {username,code} = await request.json();
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username:decodedUsername});

        // if(!user){
        //     await 
        // }

    } catch (error) {
        
    }
}