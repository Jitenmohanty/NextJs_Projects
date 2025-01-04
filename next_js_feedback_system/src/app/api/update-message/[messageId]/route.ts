import dbConnect from "@/lib/DbConnect";
import UserModel, { MessageDocument } from "@/model/user.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Types } from "mongoose";

export async function PUT(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  const { messageId } = params;

  if (!messageId) {
    return new Response(
      JSON.stringify({ success: false, message: "Message ID is required" }),
      { status: 400 }
    );
  }

  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401 }
    );
  }

  try {
    const { content } = await request.json();

    if (!content || content.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, message: "Content cannot be empty" }),
        { status: 400 }
      );
    }

    // Find the user and get the specific message
    const user = await UserModel.findOne({ 
      _id: _user._id,
      "messages._id": messageId 
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found",
        }),
        { status: 404 }
      );
    }

    // Find the specific message in the messages array
    const message = user.messages.find(
      (msg: MessageDocument) => msg._id.toString() === messageId
    );
    
    if (!message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found",
        }),
        { status: 404 }
      );
    }

    // Update the message content
    message.content = content;
    await user.save();

    // Return only the updated message
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message updated successfully",
        data: {
          _id: message._id,
          content: message.content,
          createdAt: message.createdAt
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while updating the message",
      }),
      { status: 500 }
    );
  }
}