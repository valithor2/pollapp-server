import { serverPort } from "./config";
import { app,server } from "./app";

console.log(`Listening on port ${serverPort}`);
server.listen(serverPort);
