var express = require("express");
var app = express(), database, bahn;

function HTTP (_database, _bahn) {
    database = _database;
    bahn = _bahn;
    return app;
}

app.get('/api/bahn/version', function(req, res){
    res.send(bahn.version);
});

app.use("/", express.static('./static'));

module.exports = HTTP;