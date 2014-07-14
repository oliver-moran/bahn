var NeDB = require('nedb');

function Database () {
    /* CREATE NEW DATABASES HERE */
    this.tasks = new NeDB({ filename: './application/data/tasks.db' });
    this.tasks.loadDatabase();
};

module.exports = Database;
