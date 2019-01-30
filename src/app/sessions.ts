import {Request,Response,NextFunction} from "express"
const util = require("util");
const crypto = require("crypto");


export interface Session {
    username: String,
    lastAccess: Date
}

let sessions = new Map<String,Session>();

export function validSession(req:Request,res:Response,next:NextFunction,sessionID:String){
    if(sessions.has(sessionID)){
        let currentSession:Session|undefined = sessions.get(sessionID);
        if(currentSession!=undefined){
            let timeDifference = (Date.now() - currentSession.lastAccess.getTime())/1000;
            //Sessions expire after 5 minutes
            if(timeDifference>300){
                sessions.delete(sessionID);
                res.status(401);
                res.json({
                    failure: "Session has expired"
                })
            }else{
                currentSession.lastAccess=new Date();
                sessions.set(sessionID,currentSession);
                next();
            }
        }else{
            res.status(401);
            res.json({
                failure: "No such session ID"
            });
        }
    }else{
        res.status(401);
        res.json({
            failure: "No such session ID"
        });
    }
}

export function createSession(req:Request,res:Response,next:NextFunction,sessionID:String){

}