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

app.run(function ($rootScope) {
    
    $rootScope.$on('$routeChangeSuccess', function (event, args) {
        
        /* TASKS TO DO ON EACH VIEW CHANGE */
        
        // set the appropriate document title
        switch (args.$$route.controller) {
            case welcomeController:
                document.title = "bahn - Welcome";
                break;
            case todoController:
                document.title = "bahn - Example";
                break;
            default:
                document.title = "bahn";
        }

        // NOTE: Uncomment the line below to scroll to top on page change
        // window.scrollTo(0, 0);

        $("header li").removeClass("active");
        $("header li a[href='" + window.location.hash + "']").parent().addClass("active");
        $("header li a").blur();
        
    });

    /* GLOBAL VARIABLES (OH, SO BAD!) */
    
    $rootScope.year = (new Date()).getFullYear();
    
});
