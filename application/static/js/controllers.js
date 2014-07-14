// The Welcome Controller
var welcomeController = ["$scope", function ($scope, $http) {
    onNewPage("bahn - Welcome");
}];

// The TODO Controller
var todoController = ["$scope", "$http", function ($scope, $http) {
    onNewPage("bahn - Example");
    
    $scope.task = { text: "", status: false };
    $scope.taskList = null;
    
    $http({method: "GET", url: "/api/todo/tasks"}).
    success(function(data, status, headers, config) {
        if (status != 500) $scope.taskList = data;
    });
    
    $scope.onKeyDown = function (event) {
        if(event.keyCode == 13) $scope.insertTask($scope.task);
    };
    
    $scope.insertTask = function (task) {
        if (!task.text) return; // must contain something
        socket.emit("insertTask", task);
        $scope.task = { text: "", status: false };
    };
    
    $scope.updateTask = function (task) {
        task.status = !task.status;
        socket.emit("updateTask", task);
    };
    
    $scope.removeTask = function (task) {
        socket.emit("removeTask", task);
    };

    socket.on("insertTask", function (data) {
        $scope.taskList.push(data);
        $scope.$apply();
    });
    
    socket.on("updateTask", function (data) {
        $scope.taskList.forEach(function (task) {
            if (task._id == data._id) task.status = data.status;
        });
        $scope.$apply();
    });
    
    socket.on("removeTask", function (data) {
        $scope.taskList.forEach(function (task, i) {
            if (task._id == data._id) $scope.taskList.splice(i, 1);
        });
        
        $scope.$apply();
    });
}];

// common set up code for when a user enters a routed page
function onNewPage(title) {
    document.title = title;
    window.scrollTo(0, 0);
    $(".navbar-nav li").removeClass("active");
    $(".navbar-nav li a[href='" + window.location.hash + "']").parent().addClass("active");
}