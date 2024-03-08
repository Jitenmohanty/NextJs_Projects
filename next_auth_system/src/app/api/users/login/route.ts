import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/DbConect";
import User from "@/model/userModel.js"; // Assuming this is the correct path to your UserModel file
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

// Define your API route handler
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Find the user in the database
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Validate the password
        const validatePassword = await bcryptjs.compare(password, user.password);
        if (!validatePassword) {
            return NextResponse.json({ error: "Wrong credentials!" }, { status: 400 });
        }

        // Generate JWT token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };
        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, { expiresIn: "1d" });

        // Construct the response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // Set token cookie in the response
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
