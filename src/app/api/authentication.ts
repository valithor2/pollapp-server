import {Request,Response,NextFunction} from "express"
import {User} from "../../models/user"
let auth = require("basic-auth");
const util = require("util");
const crypto = require("crypto");
const pbkdf2p = util.promisify(crypto.pbkdf2);

export async function authenticate(req:Request,res:Response,next:NextFunction){
    /*let toAuth = auth(req);

    if(toAuth){
        try{
            let user = await User.findOne({
                username: {$eq: toAuth.name},
            });
            if(user){
                let password = toAuth.pass;
                let salt = user.salt;
                let encryptedBuffer = await pbkdf2p(password, salt, 1, 256, "sha512");
                let encryptedPassword = encryptedBuffer.toString("base64");
                if(user.password == user.password){
                    res.locals.role = user.role;
                    res.locals.authenticated = user;
                    next();
                }else{
                    res.status(403);
                    res.json({
                        error:"Invalid password provided"
                    });
                }
            }else{
                res.status(403);
                res.json({
                    error:"Invalid username provided"
                });
            }
        }catch(err){
            res.status(403);
//            res.json(err);
            res.json({error:"Banana"})
        }
    }else{
        res.setHeader("WWW-Authenticate",'basic realm="/api/"');
        res.status(401);
        res.json({
            error:"No login information provided"
        });
    }*/

}

export function checkTeacher(req:Request,res:Response,next:NextFunction){
    if(res.locals.authenticated.role == "teacher"){
        next();
    }else{
        res.status(403);
        res.json({
            "Error": "Insufficient permissions"
        })
    }
}

export function checkAdmin(req:Request,res:Response,next:NextFunction){
    if(res.locals.authenticated.role == "teacher"){
        next();
    }else{
        res.status(403);
        res.json({
            "Error": "Insufficient permissions"
        })
    }
}

export function checkBoth(req:Request,res:Response,next:NextFunction){
    if(res.locals.authenticated.role == "teacher" || res.locals.authenticated.role == "admin"){
        next();
    }else{
        res.status(403);
        res.json({
            "Error": "Insufficient permissions"
        })
    }
}