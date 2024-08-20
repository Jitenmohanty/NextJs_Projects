import dbConnect from "@/lib/DbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/user.model";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;

  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
        {_id:_user._id},
        {$pull:{messages:{_id:messageId}}}
    )

    if(updateResult.modifiedCount === 0){
        return Response.json(
            {message: "Message not found already deleted",success:false},
            {status:404}
        )
    }

    return Response.json(
        {message:"Message Deleted",success:true},
        {status:201}
    )

  } catch (error) {
        console.log("Error on deleting message",error)
        return Response.json(
            { message: 'Error deleting message', success: false },
            { status: 500 }
          );
  }

}


