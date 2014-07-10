var database;

function Socket(_http, _database) {
    database = _database;
    
    var io = require("socket.io").listen(_http);
    io.on("connection", onConnection);
}

function onConnection(socket) {
    socket.emit("message", process.version);
    socket.on("message", onMessage);
};

function onMessage(msg) {
    console.log(msg);
}

module.exports = Socket;