import dbConnect from "@/lib/DbConnect";
import UserModel, { MessageDocument }  from "@/model/user.model";

export async function POST(request:Request) {
    await dbConnect();

    const {username,content} = await request.json()

    try {
        const user = await UserModel.findOne({username}).exec();
        //If user is not availble on this username!
        if(!user){
            return Response.json(
                { message: 'User not found', success: false },
                { status: 404 }
              );
        }

        if(!user.isAcceptingMessages){
            return Response.json(
                { message: 'User not Accepting the messeges', success: false },
                { status: 404 }
              );
        }
        const newMessage = {content,createdAt:new Date()}

        // Push the new message to the user's messages array
        user.messages.push(newMessage as MessageDocument)
        await user.save();
        return Response.json(
            { message: 'Message sent successfully', success: true },
            { status: 201 }
          );

    } catch (error) {
        console.log('Error on sending messages',error)
        return Response.json(
            { message: 'Error on sending messages', success: false },
            { status: 500 }
          );
    }

}