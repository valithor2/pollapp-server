
// Port server should listen on
export let serverPort = 8000;

// Secret for express-session
export let logFormat = "dev";

export let path = "/api";

export let db = {
  host: "localhost",
  name: "pollapp",
  user: undefined,
  pass: undefined
}

export let loggedInUsers = new Map<string, string>();