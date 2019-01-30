"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const config = require("../config");
const api = require("./api/routes");
exports.app = express();
exports.server = https.createServer({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
}, exports.app);
// Logging
if (config.logFormat) {
    exports.app.use(morgan(config.logFormat));
}
// POST data
exports.app.use(bodyParser.urlencoded({ extended: false }));
// Routes specific to your application go here:
exports.app.use(config.path, api.router);
// Static files
exports.app.use(express.static("./static"));
//# sourceMappingURL=index.js.map