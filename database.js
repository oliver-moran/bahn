var Datastore = require('nedb');
var db = {}, bahn;

function Database (_bahn) {
    bahn = _bahn;
    db.store = new Datastore({ filename: './data/store.db' });
    db.store.loadDatabase();
};

module.exports = Database;
