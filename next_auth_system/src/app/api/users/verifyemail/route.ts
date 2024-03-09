import { connect } from "@/dbConfig/DbConect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token:", token);
    
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log("User:", user);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log("Before update:", user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    console.log("After update:", user);

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
