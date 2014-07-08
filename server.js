var express = require('express');
var app = express();

var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json" ));

// Database uses NEDB, which promises to be transparant with Mongo
// https://github.com/louischatriot/nedb
var Datastore = require('nedb');
var db = {};
db.store = new Datastore({ filename: './data/store.db' });
db.store.loadDatabase();

app.use('/', express.static('./static'));
app.listen(config.port);
console.info("Express is listening at http://127.0.0.1:" + config.port);
