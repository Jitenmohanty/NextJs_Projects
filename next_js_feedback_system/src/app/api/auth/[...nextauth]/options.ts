import dbConnect from "@/lib/DbConnect";
import UserModel from "@/model/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        // console.log(credentials)
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.indentifier },
              { username: credentials.indentifier },
            ],
          });
          // console.log(user)

          if (!user) {
            throw new Error("No user found with this email!");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account before login!");
          }
          const isPasswordCorrecct = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrecct) {
            return user;
          } else {
            throw new Error("Incorrect Password!");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
        if(user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMessages = user.isAcceptingMessages;
            token.username = user.username;
        }
        return token;
    },
    async session({ session, token }) {
        if (token) {
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;
          }
          return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};