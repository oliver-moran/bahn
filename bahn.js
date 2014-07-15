// we use FS to read the pakage.json and to display a pretty banner
var FS = require("fs");

// bahn is global variable that contains
//  - package info (including config): bahn.package / bahn.package.config
//  - access to database: bahn.databse
//  - access to the http service: bahn.http
//  - access to the socket service: bahn.socket
global.bahn = {};

// load up package.json
bahn.package = require("./package");
console.info("bahn configuration file loaded. Initialising services:\n");

// show the pretty banner and version info
var banner = FS.readFileSync("./banner.txt");
console.info(banner.toString());
console.info("Version: " + bahn.package.version + "\n");

// fire up the database services...
if (bahn.package.config.database) {
    // Database uses NEDB, which promises to be transparant with Mongo
    // https://github.com/louischatriot/nedb
    Database = require("./application/database.js");
    bahn.database = new Database();
    console.log(" - NEDB database module is ready.");
}

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


// ...as we got road!
console.info("\nReady.\n");
