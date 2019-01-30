import * as mongoose from "mongoose";
import {User,UserDocument} from "./user";
import "./mongodb";

export interface Poll {
    title: String,
    creator: UserDocument,
    PollNumber: Number
}

const ClassSchema = new mongoose.Schema({
    number: {
        type: Number,
        validate:{
            validator: (value:number) => value==Math.floor(value),
            message: "{VALUE} is not an integer"
        },
        min: 101,
        max: 998,
        required: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true,
    },
    assignments: {
        type: [{
            class: {
                type: String,
                required:true
            },
            title: {
                type:String,
                trim: true,
                maxlength: 200,
                required:true
            },
            points: {
                type:Number,
                validate:{
                    validator: (value:number) => value>=0,
                    message: "{VALUE} is not positive"
                },
                default:100
            },
            due: {
                type: Date,
                default: dateInTwoDays
            }
        }],
        required: true,
    },
});

export interface ClassDocument extends ClassData, mongoose.Document { }

export const Class = mongoose.model<ClassDocument>("Class", ClassSchema);
