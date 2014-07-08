var navbarController = ["$scope", "$route", function ($scope, $route) {
    $scope.items = [
        {text: "Welcome", href: "#/welcome", controller: welcomeController },
        {text: "About", href: "#/about", controller: aboutController },
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