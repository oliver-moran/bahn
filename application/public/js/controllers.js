// The Welcome Controller
var welcomeController = ["$scope", function ($scope, $http) {
    // NOTE: Nothing needed here
}];

// The TODO Controller
var todoController = ["$scope", "$http", function ($scope, $http) {
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
            if (task.uuid == data.uuid) task.status = data.status;
        });
        $scope.$apply();
    });
    
    socket.on("removeTask", function (data) {
        $scope.taskList.forEach(function (task, i) {
            if (task.uuid == data.uuid) $scope.taskList.splice(i, 1);
        });
        
        $scope.$apply();
    });
}];
