var SocketIO = require("socket.io");

/**
 * Constructs a Socket object
 */
function Socket(server) {
    // expose the listening socket 
    this.io = SocketIO.listen(server);
    
    /* ADD NEW SOCKET EVENT LISTENERS HERE */
    this.io.on("connection", function (socket) {
        socket.on("insertTask", insertTask);
        socket.on("updateTask", updateTask);
        socket.on("removeTask", removeTask);
    });
}

// the listening SocketIO object
Socket.prototype.io = null;

/* HANDLE SOCKET EVENTS HERE */

var UUID = require("node-uuid");

function insertTask(task) {
    task.uuid = UUID.v4(); // add a UUID that we will use to ID the document
    bahn.database.tasks.insert(task);
    bahn.socket.io.sockets.emit("insertTask", task);
}

function updateTask(task) {
    bahn.database.tasks.update({ uuid: task.uuid }, { $set: { status: task.status } });
    bahn.socket.io.sockets.emit("updateTask", task);
}

function removeTask(task) {
    bahn.database.tasks.remove({ uuid: task.uuid });
    bahn.socket.io.sockets.emit("removeTask", task);
}

// export Socket for use in bahn
module.exports = Socket;