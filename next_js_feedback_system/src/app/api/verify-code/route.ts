import dbConnect from "@/lib/DbConnect";
import UserModel from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeExpiry = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeExpiry) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified sucessfully",
        },
        { status: 201 }
      );
    } else if (!isCodeExpiry) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 }
      );
    } else {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error on verivfying user",error)
    return Response.json(
        {
          success: false,
          message:
            'Error on verifying user'
        },
        { status: 500 }
      );
  }
}
