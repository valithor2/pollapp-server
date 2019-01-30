"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Port server should listen on
exports.serverPort = 8000;
// Secret for express-session
exports.logFormat = "dev";
exports.path = "/api";
exports.db = {
    host: "localhost",
    name: "pollapp",
    user: undefined,
    pass: undefined
};
exports.loggedInUsers = new Map();
//# sourceMappingURL=config.js.map