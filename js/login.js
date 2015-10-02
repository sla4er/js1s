    angular.module("gk")
    .controller('mct', function NameCtrl($scope, $http, $timeout){
    	$scope.wait = false;
    	$scope.username = '';

    	$scope.loginfn = function(){
    		$scope.wait = true;
 			$http.post("/login", { username: $scope.username, password: $scope.password })
        		.success(function(response) { 
        			console.log(response);
                    $scope.wait = false;
				if (response=='ok') window.location.href = "/";
        		});
        };

    });
