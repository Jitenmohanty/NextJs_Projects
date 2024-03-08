import { connect } from "@/dbConfig/DbConect";
import User from "@/model/userModel.js";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    console.log(reqBody);
    //check if user has already exist or not
    const user = await User.findOne({email});

    if (user) {
      return NextResponse.json(
        { error: "User already exist!" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      username:name,
      email,
      password: hashedPassword,
    }).save();

    console.log(newUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.massage }, { status: 500 });
  }
}
