import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystery Message Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        })
        return {
            success:true,
            message:"Email verification code send sucessfully. "
        }
    } catch (sendError) {
        console.log("Error on sending email verify code",sendError);
        return {
            success:false,
            message:"Error on sending email verify code!"
        }
    }
}