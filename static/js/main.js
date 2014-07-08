"use strict";

var app = angular.module("APP", ["ngRoute"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
        

        .when("/welcome", {
            templateUrl: 'html/welcome.html',
            controller: welcomeController
        })
        
        .when("/about", {
            templateUrl: 'html/about.html',
            controller: aboutController
        })
        
        .otherwise({redirectTo: "/welcome"});
        
    }]);
