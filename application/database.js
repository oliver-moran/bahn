var NeDB = require("nedb");
var MongoJS = require("mongojs");

/**
 * Constructs a Database object
 */
function Database () {
    /* EXPOSE COLLECTIONS HERE */
    this.tasks = this.collection("tasks");
};

/**
 * Gets (or implicitly creates) a collection in the database.
 * @param <string> the name of the collection to get or create
 * @returns <collection> a NeDB / MongoDB collection
 */
Database.prototype.collection = function (name) {
    var collection = new NeDB({ filename: "./application/data/" + name + ".db" });
    collection.loadDatabase();
    return collection;
}

// in the case of MongoDB, over write the default collection method
if (typeof bahn.package.config.database == "string") {
    var db = MongoJS(bahn.package.config.database);
    Database.prototype.collection = function (name) {
        return db.collection(name);
    }
}

// export Database for use in bahn
module.exports = Database;
