var express = require("express");
var app = express();

function HTTP (port) {
    this.server = app.listen(port);
}

HTTP.prototype.server = null;

/* CREATE NEW HTTP SERVICES HERE */

app.get("/api/todo/tasks", function(req, res){
    bahn.database.tasks.find({}, function (err, docs) {
        if (!err) res.send(JSON.stringify(docs));
        else res.send(500);
    });
});

// static pages are served from /application/static/
app.use("/", express.static("./application/static"));

// if all of the above failed then serve the H5BP 404
app.use(function(req, res, next){
    res.status(404).sendfile("./application/static/404.html");
});

module.exports = HTTP;