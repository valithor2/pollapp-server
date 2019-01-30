import * as mongoose from "mongoose";
import {User,UserDocument} from "./user";
import "./mongodb";

export interface ClassData {
    department: String,
    number: Number,
    title: String,
    teacher: UserDocument,
    students: UserDocument,
    assignments: String
}

export interface Assignments{
    class: String,
    title: String,
    points: Number,
    due: Date
}

function dateInTwoDays():Date{
    return new Date(+new Date() + 7*24*60*60*1000)
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
