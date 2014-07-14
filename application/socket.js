var io, database, bahn;

function Socket(_http, _database, _bahn) {
    database = _database;
    bahn = _bahn;
    
    io = require("socket.io").listen(_http);
    io.on("connection", function (socket) {
        socket.on("chatMessage", chatMessage);
    });
}

function chatMessage(text) {
    var hours = (new Date()).getHours();
    var minutes = (new Date()).getMinutes();
    var seconds = (new Date()).getSeconds();
    var data = {
        text: text,
        time: ((hours < 10) ? "0" + hours : hours) + ":" 
            + ((minutes < 10) ? "0" + minutes : minutes)+ ":" 
            + ((seconds < 10) ? "0" + seconds : seconds)
    };
    io.sockets.emit("newMessage", data);
}

module.exports = Socket;