"use strict";

var app = angular.module("APP", ["ngRoute"])
.config(["$routeProvider", function ($routeProvider) {

    $routeProvider

    .when("/about", {
        templateUrl: 'html/about.html',
        controller: aboutController
    })

    .when("/chat", {
        templateUrl: 'html/chat.html',
        controller: chatController
    })

    .otherwise({redirectTo: "/about"});

}]);
