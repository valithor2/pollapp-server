"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require("./mongodb");
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
        enum: ["admin", "user"],
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
exports.User = mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map