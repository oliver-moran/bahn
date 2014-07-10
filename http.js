var express = require("express");
var app = express(), database;

function HTTP (_database) {
    database = _database;
    return app;
}

app.use("/", express.static('./static'));

module.exports = HTTP;