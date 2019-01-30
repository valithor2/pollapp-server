import {Request,Response,NextFunction} from "express"
import {User, UserDocument} from "../../models/user"
const util = require("util");
const crypto = require("crypto");
const pbkdf2p = util.promisify(crypto.pbkdf2);

export async function registerNewUser(req:Request,res:Response,next:NextFunction){
    
}










////////////old code
export async function lookupUsers(req:Request,res:Response,next:NextFunction,userId:String){
    let user;
    try{
        user = await User.findById(userId);
    }catch(err){
        try{
            user = await User.find({username:{$eq: userId}});
        }catch(err2){
            res.status(400);
            res.json({
                error:"Invalid user id provided"
            })
        }
    }
    if(user){
        res.locals.user = user;
        next();
    }else{
        res.status(400);
        res.json({
            error:"User not found"
        });
    }
}

export async function getUsers(req:Request,res:Response,next:NextFunction){
    try{
        let user = await User.find();
        res.json(user);
    }catch(err){
        res.status(500);
        res.json(err);
    }
}

export function getUser(req:Request,res:Response,next:NextFunction){
    res.status(200);
    res.json(res.locals.user);
}

export async function postUser(req:Request,res:Response,next:NextFunction){
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let role = req.body.role;
    let password = req.body.password;

    try{
        let salt = crypto.randomBytes(64).toString("base64");
        let encryptedBuffer = await pbkdf2p(password, salt, 1, 256, "sha512");
        let encryptedPassword = encryptedBuffer.toString("base64");
        try{
            let user = new User({username:username,firstname:firstname,lastname:lastname,email:email,role:role,password:encryptedPassword,salt:salt});
            try{
                await user.save();
                res.json(user);
            }catch(err){
                res.json(err)
            }
        }catch(err){
            res.status(400);
            res.json(err);
        }
    }catch(err){
        //The err is empty
        res.status(400);
        res.json({
            error:"Invalid password provided"
        })
    }
            
}

export async function putUser(req:Request,res:Response,next:NextFunction){
    if(res.locals.user){
        try{
            for(let property in req.body){
                if(property!="salt"){
                    if(property == "password"){
                        let salt = crypto.randomBytes(64).toString("base64");
                        let encryptedBuffer = await pbkdf2p(req.body.password, salt, 1, 256, "sha512");
                        let encryptedPassword = encryptedBuffer.toString("base64");
                    }else if(property in res.locals.user){
                        res.locals.user[property] = req.body[property];
                    }
                }
            }
            try{
                await res.locals.user.save();
                res.json(res.locals.user);
            }catch(err){
                res.status(500);
                res.json(err);
            }
        }catch(err){
            res.status(400);
            res.json(err);
        }
    }
}

export function deleteUser(req:Request,res:Response,next:NextFunction){
    User.findByIdAndRemove(res.locals.user._id).then(()=>{
        res.json({
            success: "User was deleted"
        })
    }).catch((err)=>{
        res.render(err);
    });        
    
}
