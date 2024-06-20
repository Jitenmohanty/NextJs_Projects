import mongoose, {Document, Schema} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date;
}

const MessageSchema:Schema<Message> = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifycode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    messages:Message[];
}

const userSchema:Schema<User> = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required!"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required!"],
        unique:true,
        match:[/.+\@.+\..+/, 'Please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"password is required!"],
    },
    verifycode:{
        type:String,
        required:[true,"verify Code is required!"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify Code Expiry is required!"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
    
})

// First check if User schema is already exist then first statement execute otherwise goes to second statement<-- Basically it is a typescript validation... -->

const UserModel = (mongoose.models.User as mongoose.Model<User>) ||   mongoose.model<User>('User',userSchema);

export default UserModel;