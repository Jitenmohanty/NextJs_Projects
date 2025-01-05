import mongoose, { Document, Schema, Types } from "mongoose";

// Message interfaces
export interface IMessage {
  _id: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface MessageDocument extends Document, IMessage {
  _id: Types.ObjectId;
}

// Message Schema
const MessageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  } 
},{timestamps: true});

// User interfaces
export interface IUser {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Types.DocumentArray<MessageDocument>;
}

export interface UserDocument extends Document, IUser {}

// User Schema
const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, "username is required!"],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, "password is required!"],
  },
  verifyCode: {
    type: String,
    required: [true, "verify Code is required!"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify Code Expiry is required!"],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true
  },
  messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<UserDocument>) || 
  mongoose.model<UserDocument>('User', userSchema);

export default UserModel;