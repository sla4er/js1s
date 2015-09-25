    angular.module("gk")
    .controller('mct', function NameCtrl($scope, $http, $timeout){
    	console.log('mct-login');
    	$scope.wait = false;
    	$scope.username = '';

    	$scope.loginfn = function(){
    		console.log('login-button '+$scope.username);
    		$scope.wait = !$scope.wait;
 			$http.post("/login", { username: $scope.username, password: $scope.password })
        		.success(function(response) { 
        			console.log(response);
				//if (response=='ok') window.location.href = "/";
        		});
        };

    });
