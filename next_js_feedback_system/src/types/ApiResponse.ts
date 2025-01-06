import { MessageDocument } from "@/model/user.model";
export interface ApiResponse{
    success:boolean;
    message:string;
    isAccesptingMessage?:boolean;
    messages?:Array<MessageDocument>
}