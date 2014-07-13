var fs = require("fs");
var bahn = JSON.parse(fs.readFileSync("package.json" ));
console.info("bahn configuration file loaded. Initialising services:\n");

// show bahn banner
var banner = fs.readFileSync("banner.txt");
console.info(banner.toString());
console.info("Version: " + bahn.version + "\n");

var database;
// start the database
if (bahn.config.database) {
    // Database uses NEDB, which promises to be transparant with Mongo
    // https://github.com/louischatriot/nedb
    database = new require("./database.js")(bahn);
    console.log(" - NEDB database module is ready.");
}

// start the HTTP server
var app = new require("./http.js")(database, bahn);
var http = app.listen(bahn.config.port);
console.info(" - ExpressJS is listening at http://127.0.0.1:" + bahn.config.port);

// start the socket server
if (bahn.config.sockets) {
    var socket = new require("./socket.js")(http, database, bahn);
    console.info(" - Socket.io is listening at http://127.0.0.1:" + bahn.config.port);
}

console.info("\nReady.\n");