"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const crypto = require("crypto");
let sessions = new Map();
function validSession(req, res, next, sessionID) {
    if (sessions.has(sessionID)) {
        let currentSession = sessions.get(sessionID);
        if (currentSession != undefined) {
            let timeDifference = (Date.now() - currentSession.lastAccess.getTime()) / 1000;
            //Sessions expire after 5 minutes
            if (timeDifference > 300) {
                sessions.delete(sessionID);
                res.status(401);
                res.json({
                    failure: "Session has expired"
                });
            }
            else {
                currentSession.lastAccess = new Date();
                sessions.set(sessionID, currentSession);
                next();
            }
        }
        else {
            res.status(401);
            res.json({
                failure: "No such session ID"
            });
        }
    }
    else {
        res.status(401);
        res.json({
            failure: "No such session ID"
        });
    }
}
exports.validSession = validSession;
function createSession(req, res, next, sessionID) {
}
exports.createSession = createSession;
//# sourceMappingURL=sessions.js.map