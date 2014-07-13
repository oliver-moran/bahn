var JSON_RPC = require("json-rpc.js");
var io, database, bahn;

function Socket(_http, _database, _bahn) {
    database = _database;
    bahn = _bahn;
    
    io = require("socket.io").listen(_http);
    io.on("connection", function (socket) {
        socket.on("chatMessage", chatMessage);
    });
}

function chatMessage(rpc) {
    var hours = (new Date()).getHours();
    var minutes = (new Date()).getMinutes();
    var seconds = (new Date()).getSeconds();
    var nNewMessage = new JSON_RPC.Notification("newMessage", {
        text: rpc.params,
        time: ((hours < 10) ? "0" + hours : hours) + ":" 
            + ((minutes < 10) ? "0" + minutes : minutes)+ ":" 
            + ((seconds < 10) ? "0" + seconds : seconds)
    });
    io.sockets.emit(nNewMessage.method, nNewMessage);
}

module.exports = Socket;