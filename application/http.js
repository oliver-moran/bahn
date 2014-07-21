var Express = require("express");
var FS = require("fs");

var logger  = require("morgan");
var gzip = require("compression");
var favicon = require("serve-favicon");

var app = Express();

/**
 * Constructs a HTTP object
 * @param <number> a port for the HTTP application to listen on
 */
function HTTP (port) {
    // expose the http object
    this.server = app.listen(port);
}

// the Node HTTP object used by the HTTP.
HTTP.prototype.server = null;

// should we log server access
if (bahn.package.config.logging) {
    var options = {};
    if (typeof bahn.package.config.logging == "string") {
        FS.createWriteStream(bahn.package.config.logging, {flags: "a"});
    }
    app.use(logger("combined", options));
}

// compress tranfsers
app.use(gzip());

// set the default path for favicons
app.use(favicon("./application/public/favicon.ico"));

/* CREATE NEW SERVICES HERE */

app.get("/api/todo/tasks", function(req, res){
    bahn.database.tasks.find({}, function (err, docs) {
        if (!err) res.send(JSON.stringify(docs));
        else res.send(500, err.message);
    });
});

// static pages are served from /application/static/
app.use("/", Express.static("./application/public"));

// if all of the above failed then serve the H5BP 404
app.use(function(req, res, next){
    res.status(404).sendfile("./application/404.html");
});

// export HTTP for use in bahn
module.exports = HTTP;