var fs = require("fs");
var package = JSON.parse(fs.readFileSync("package.json" ));

// show bahn banner
var banner = fs.readFileSync("banner.txt");
console.info(banner.toString());
console.info("Version: " + package.version + "\n");

var config = JSON.parse(fs.readFileSync("config.json" ));
console.info("bahn configuration file loaded. Initialising services:\n");

var database;
// start the database
if (config.database) {
    // Database uses NEDB, which promises to be transparant with Mongo
    // https://github.com/louischatriot/nedb
    database = new require("./database.js")();
    console.log(" - NEDB database module is ready.");
}

// start the HTTP server
var app = new require("./http.js")(database);
var http = app.listen(config.port);
console.info(" - ExpressJS is listening at http://127.0.0.1:" + config.port);

// start the socket server
if (config.sockets) {
    var socket = new require("./socket.js")(http, database);
    console.info(" - Socket.io is listening at http://127.0.0.1:" + config.port);
}

console.info("\nReady.\n");