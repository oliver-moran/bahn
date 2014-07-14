var app = angular.module("APP", ["ngRoute"])
.config(["$routeProvider", function ($routeProvider) {

    $routeProvider

    /* ADD NEW ROUTES HERE */

    .when("/welcome", {
        templateUrl: 'html/welcome.html',
        controller: welcomeController
    })

    .when("/todo", {
        templateUrl: 'html/todo.html',
        controller: todoController
    })

    /* THE DEFAULT ROUTE IS HERE */

    .otherwise({redirectTo: "/welcome"});

}]);
