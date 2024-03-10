import { connect } from "@/dbConfig/DbConect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log(token,"token")
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    console.log(user)

    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }
    return NextResponse.json({
      message: "Email verified successfully",
      status: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
