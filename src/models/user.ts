import * as mongoose from "mongoose";
import "./mongodb";

export interface UserData {
    username: String,
    email: String,
    role: "user" | "admin",
    salt: String,
    encryptedPassword: String
}

const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      match: /^[a-zA-Z\d]([a-zA-Z\d]|[_-][a-zA-Z\d])+/,
      maxlength: 32,
      unique: true,
      required: true,
    },
    email: {
        type: String,
        match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin","user"],
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: true
    }
});

export interface UserDocument extends UserData, mongoose.Document { }

export const User = mongoose.model<UserDocument>("User", UserSchema);

