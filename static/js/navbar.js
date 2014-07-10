var navbarController = ["$scope", "$route", function ($scope, $route) {
    $scope.items = [
        {text: "About", href: "#/about", controller: aboutController },
        {text: "Chat", href: "#/chat", controller: chatController },
        {text: "GitHub", href: "https://github.com/oliver-moran/bahn", controller: null }
    ];
    
    function isCurrentRouteController(controller) {
        try {
            return $route.current.controller == controller;
        } catch (err) {
            return false;
        }
    }
    
    $scope.getClassName = function (plugin) {
        return (isCurrentRouteController(plugin.controller)) ? "active" : "";
    };
}];