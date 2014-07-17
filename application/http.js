var Express = require("express");
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

/* CREATE NEW HTTP SERVICES HERE */

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