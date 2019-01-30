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
const user_1 = require("../../models/user");
const util = require("util");
const crypto = require("crypto");
const pbkdf2p = util.promisify(crypto.pbkdf2);
function registerNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.registerNewUser = registerNewUser;
////////////old code
function lookupUsers(req, res, next, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield user_1.User.findById(userId);
        }
        catch (err) {
            try {
                user = yield user_1.User.find({ username: { $eq: userId } });
            }
            catch (err2) {
                res.status(400);
                res.json({
                    error: "Invalid user id provided"
                });
            }
        }
        if (user) {
            res.locals.user = user;
            next();
        }
        else {
            res.status(400);
            res.json({
                error: "User not found"
            });
        }
    });
}
exports.lookupUsers = lookupUsers;
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield user_1.User.find();
            res.json(user);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.getUsers = getUsers;
function getUser(req, res, next) {
    res.status(200);
    res.json(res.locals.user);
}
exports.getUser = getUser;
function postUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let role = req.body.role;
        let password = req.body.password;
        try {
            let salt = crypto.randomBytes(64).toString("base64");
            let encryptedBuffer = yield pbkdf2p(password, salt, 1, 256, "sha512");
            let encryptedPassword = encryptedBuffer.toString("base64");
            try {
                let user = new user_1.User({ username: username, firstname: firstname, lastname: lastname, email: email, role: role, password: encryptedPassword, salt: salt });
                try {
                    yield user.save();
                    res.json(user);
                }
                catch (err) {
                    res.json(err);
                }
            }
            catch (err) {
                res.status(400);
                res.json(err);
            }
        }
        catch (err) {
            //The err is empty
            res.status(400);
            res.json({
                error: "Invalid password provided"
            });
        }
    });
}
exports.postUser = postUser;
function putUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (res.locals.user) {
            try {
                for (let property in req.body) {
                    if (property != "salt") {
                        if (property == "password") {
                            let salt = crypto.randomBytes(64).toString("base64");
                            let encryptedBuffer = yield pbkdf2p(req.body.password, salt, 1, 256, "sha512");
                            let encryptedPassword = encryptedBuffer.toString("base64");
                        }
                        else if (property in res.locals.user) {
                            res.locals.user[property] = req.body[property];
                        }
                    }
                }
                try {
                    yield res.locals.user.save();
                    res.json(res.locals.user);
                }
                catch (err) {
                    res.status(500);
                    res.json(err);
                }
            }
            catch (err) {
                res.status(400);
                res.json(err);
            }
        }
    });
}
exports.putUser = putUser;
function deleteUser(req, res, next) {
    user_1.User.findByIdAndRemove(res.locals.user._id).then(() => {
        res.json({
            success: "User was deleted"
        });
    }).catch((err) => {
        res.render(err);
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map