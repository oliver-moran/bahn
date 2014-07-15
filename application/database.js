var NeDB = require('nedb');
// var MongoClient = require('mongodb').MongoClient;

function Database () {
    /* CREATE NEW DATABASES HERE */
    
    this.tasks = new NeDB({ filename: './application/data/tasks.db' });
    this.tasks.loadDatabase();
    
    /*
    // MongoDB equivilent
    MongoClient.connect('mongodb://127.0.0.1:27017/bahn?w=0', (function(err, db) {
        this.tasks = db.collection("tasks");
    }).bind(this));
    */
};

module.exports = Database;
