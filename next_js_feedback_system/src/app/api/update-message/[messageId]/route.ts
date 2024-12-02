import dbConnect from "@/lib/DbConnect";
import UserModel from "@/model/user.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

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

    // Find and update the message
    const updateResult = await UserModel.findOneAndUpdate(
      { _id: _user._id, "messages._id": messageId }, // Match the user and specific message
      { $set: { "messages.$.content": content } }, // Update the message's content
      { new: true } // Return the updated document
    );

    if (!updateResult) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found or update failed",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message updated successfully" }),
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
