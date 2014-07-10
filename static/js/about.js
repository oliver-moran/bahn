var aboutController = ["$scope", function ($scope) {
    document.title = "About bahn";
    socket.emit("message", navigator.userAgent);
    socket.on("message", function (msg) {
        alert(msg);
    });
}];