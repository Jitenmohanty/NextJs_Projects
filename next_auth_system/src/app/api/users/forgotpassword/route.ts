import { connect } from "@/dbConfig/DbConect";
import { sendEmails } from "@/helper/nodeMailer";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found !!" }, { status: 400 });
    }

    await sendEmails({ email, emailType: "RESET", userId: user._id });
    // console.log("reset password link sent to your email");

    return NextResponse.json({
        message:"reset password link sent to your email",
        success:true
    })

  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
