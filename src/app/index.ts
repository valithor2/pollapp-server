import express           = require("express");
import morgan            = require("morgan");
import bodyParser        = require("body-parser");
import https             = require("https");
import fs                = require("fs");
import * as config from "../config";
import * as api from "./api/routes";

export const app = express();

export const server = https.createServer({
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert")
},app);

// Logging
if (config.logFormat) {
  app.use(morgan(config.logFormat));
}

// POST data
app.use(bodyParser.urlencoded({ extended: false }));

// Routes specific to your application go here:
app.use(config.path, api.router);

// Static files
app.use(express.static("./static"));
