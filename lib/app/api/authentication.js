"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let auth = require("basic-auth");
const util = require("util");
const crypto = require("crypto");
const pbkdf2p = util.promisify(crypto.pbkdf2);
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.authenticate = authenticate;
function checkTeacher(req, res, next) {
    if (res.locals.authenticated.role == "teacher") {
        next();
    }
    else {
        res.status(403);
        res.json({
            "Error": "Insufficient permissions"
        });
    }
}
exports.checkTeacher = checkTeacher;
function checkAdmin(req, res, next) {
    if (res.locals.authenticated.role == "teacher") {
        next();
    }
    else {
        res.status(403);
        res.json({
            "Error": "Insufficient permissions"
        });
    }
}
exports.checkAdmin = checkAdmin;
function checkBoth(req, res, next) {
    if (res.locals.authenticated.role == "teacher" || res.locals.authenticated.role == "admin") {
        next();
    }
    else {
        res.status(403);
        res.json({
            "Error": "Insufficient permissions"
        });
    }
}
exports.checkBoth = checkBoth;
//# sourceMappingURL=authentication.js.map