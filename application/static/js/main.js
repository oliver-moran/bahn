"use strict";

var app = angular.module("APP", ["ngRoute"])
.config(["$routeProvider", function ($routeProvider) {

    $routeProvider

    .when("/welcome", {
        templateUrl: 'html/welcome.html',
        controller: welcomeController
    })

    .when("/features", {
        templateUrl: 'html/features.html',
        controller: featuresController
    })

    .otherwise({redirectTo: "/welcome"});

}]);
