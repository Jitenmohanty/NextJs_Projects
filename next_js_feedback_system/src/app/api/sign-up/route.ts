import dbConnect from "@/lib/DbConnect";
import UserModel from "@/model/user.model";
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingVerifiedUserByUsename = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsename) {
      return Response.json(
        {
          success: false,
          message: "Username already exist.",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({email});
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();


    if(existingUserByEmail){
        if(existingUserByEmail.isVerified){
            return Response.json({
                success:false,
                message:"User already exists with this email"
            },{status:400})
        }else{
            const hashedPassword = await bcrypt.hash(password,10);
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.verifycode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000);
            await existingUserByEmail.save();
        }
    }else{
        const hashedPassword = await bcrypt.hash(password,10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessages: true,
            messages: [],
        })
        await newUser.save();
    }

  } catch (error) {
    console.log("Error on registering user!");
    return Response.json(
      {
        success: false,
        message: "Error on registering user!",
      },
      { status: 500 }
    );
  }
}
