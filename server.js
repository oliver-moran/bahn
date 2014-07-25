// First, add global execption handling.
// This should save an application from dying in most circumstances.
process.on("uncaughtException", function (err) {
  console.log(err.stack);
});

// we use FS to read the pakage.json and to display a pretty banner
var FS = require("fs");

// e.g. node bahn.js --port 8080 --database false --sockets false

// bahn is global variable that contains
//  - package info (including config): bahn.package / bahn.package.config
//  - access to database: bahn.databse
//  - access to the http service: bahn.http
//  - access to the socket service: bahn.socket
global.bahn = {};

// load up package.json
bahn.package = require("./package");
// make sure there is a config object
if (!bahn.package.config) bahn.package.config = {};

// get command line configs
var argv = require("yargs").argv;
bahn.package.config.port = (typeof argv.port == "undefined")
    ? bahn.package.config.port : argv.port;
bahn.package.config.sockets = (typeof argv.sockets == "undefined")
    ? bahn.package.config.sockets : normaliseArg(argv.sockets);
bahn.package.config.database = (typeof argv.database == "undefined")
    ? bahn.package.config.database : normaliseArg(argv.database);

// normalises a string to a boolean
function normaliseArg(arg) {
    switch (arg) {
        case "true": return true;
        case "false": return false;
        default: return arg;
    }
}

// show the pretty banner and version info
var banner = FS.readFileSync("./banner.txt");
console.info(banner.toString());
console.info("Version: " + bahn.package.version + "\n");

// fire up the database services...
if (bahn.package.config.database) {
    // Database uses NEDB, which promises to be transparant with MongoDB
    // https://github.com/louischatriot/nedb
    Database = require("./application/database.js");
    bahn.database = new Database();
    console.log(" - "
        + ((typeof bahn.package.config.database == "string") ? "MongoDB" : "NeDB")
        + " database is ready.");
}

// set up the access log file
bahn.HTTP_ACCESS_LOG = { stream: FS.createWriteStream("application/access.log", {flags: "a"}) };

// ...crank up the HTTP service...
var HTTP = require("./application/http.js");
bahn.http = new HTTP(bahn.package.config.port);
console.info(" - ExpressJS is listening at http://127.0.0.1:" + bahn.package.config.port);

// ...open all the sockets...
if (bahn.package.config.sockets) {
    var Socket = require("./application/socket.js");
    bahn.socket = new Socket(bahn.http.server, bahn.package.config.port);
    console.info(" - Socket.io is listening at http://127.0.0.1:" + bahn.package.config.port);
}

// ...and we got road!
console.info("\nReady.\n");
