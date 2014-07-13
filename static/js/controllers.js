// controls the navbar, populates with the $scope.items and handles new
var navbarController = ["$scope", "$route", function ($scope, $route) {
    $scope.items = [
        {text: "Welcome", href: "#/welcome", controller: welcomeController },
        {text: "Features", href: "#/features", controller: featuresController }
    ];
    
    $scope.getClassName = function (plugin) {
        return (isCurrentRouteController(plugin.controller)) ? "active" : "";
        
        function isCurrentRouteController(controller) {
            try {
                return $route.current.controller == controller;
            } catch (err) {
                return false;
            }
        }
    };
}];

var welcomeController = ["$scope", function ($scope, $http) {
    document.title = "bahn - Welcome";
}];

var featuresController = ["$scope", "$http", function ($scope, $http) {
    document.title = "bahn - Features";
    
    $scope.version = "";
    $scope.message = "";
    $scope.messageList = [];
    
    $scope.getVersion = function () {
        $http({method: "GET", url: "/api/bahn/version"}).
        success(function(data, status, headers, config) {
            $scope.version = data;
        });
    }
    
    $scope.sendMessage = function () {
        var nChatMessage = new JSON_RPC.Notification("chatMessage", $scope.message.trim());
        socket.emit(nChatMessage.method, nChatMessage);
        $scope.message = "";
    };

    socket.on("newMessage", function (rpc) {
        $scope.messageList.push( { text: rpc.params.text, time: rpc.params.time } );
        $scope.$apply()
    });
}];