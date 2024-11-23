import dbConnect from "@/lib/DbConnect";
import UserModel from "@/model/user.model";
import { usernameValidation } from "@/Schemas/signUpSchema";
import { z } from "zod";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";


const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request) {

    await dbConnect();

    const {searchParams} = new URL(request.url);
    try {
        // console.log(searchParams)
        const queryParams =  {
            username:searchParams.get('username')
        }

        const result = UsernameQuerySchema.safeParse(queryParams);

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];

            return Response.json({
                success:false,
                message: usernameErrors?.length > 0
                ? usernameErrors.join(', ')
                : 'Invalid query parameters',
            },{status:400})
        }
        const {username} = result.data;
        
        const existingVerifiedUser = await UserModel.findOne({username,
            isVerified:true
        })

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                messsge:"Username already taken"
            },{status:400})
        }

        return Response.json({
            success:false,
            message:"Username is unique"
        },{status:201})

    } catch (error) {
        console.error('Error checking username:', error);
        if (isDynamicServerError(error)) {
            throw error;
          }
        return Response.json(
          {
            success: false,
            message: 'Error checking username',
          },
          { status: 500 }
        );
      }
}