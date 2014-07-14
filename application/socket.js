function Socket(server) {
    this.io = require("socket.io").listen(server);
    
    /* ADD NEW SOCKET EVENT LISTENERS HERE */
    this.io.on("connection", function (socket) {
        socket.on("insertTask", insertTask);
        socket.on("updateTask", updateTask);
        socket.on("removeTask", removeTask);
    });
}

Socket.prototype.io = null;

/* HANDLE SOCKET EVENTS HERE */

function insertTask(task) {
    // padding task into the db appends _id to it
    bahn.database.tasks.insert(task);
    bahn.socket.io.sockets.emit("insertTask", task);
}

function updateTask(task) {
    bahn.database.tasks.update({ _id: task._id }, { $set: { status: task.status } });
    bahn.socket.io.sockets.emit("updateTask", task);
}

function removeTask(task) {
    bahn.database.tasks.remove({ _id: task._id });
    bahn.socket.io.sockets.emit("removeTask", task);
}

module.exports = Socket;