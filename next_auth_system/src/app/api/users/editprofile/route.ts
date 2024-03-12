import { connect } from "@/dbConfig/DbConect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, name, email } = reqBody;
    const user = await User.findOne({ _id });

    user.username = name;
    user.email = email;
    await user.save();

    return NextResponse.json({
      message: "User updated successful",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
