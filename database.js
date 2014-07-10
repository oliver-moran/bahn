var Datastore = require('nedb');
var db = {};

function Database () {
    db.store = new Datastore({ filename: './data/store.db' });
    db.store.loadDatabase();
};

module.exports = Database;
