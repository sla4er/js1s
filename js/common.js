    angular.module("gk", [])
    .controller('mct', function NameCtrl($scope, $http, $timeout){
    	$scope.model = {
    		_filials: []
    	};

    	Object.defineProperty($scope.model, 'filials', { 
    			get: function(){ 
 	  				return $scope.model._filials;
    			}
    		});
    	$scope.model.refreshfilials = function(){
  		  $http.post('http://cdc.gkmillenium.ru/back/info/adm/request2.php', {Query: 'filials'})
    		.success(function(response){
    			$scope.model._filials = response.Data;
    		})
    	}();
    	setTimeout($scope.model.refreshfilials, 0);
    });

angular.module('gk').directive('selectfromlist', ['$compile', function($compile){
	return {
		restrict: 'EA',
     	scope: {
	      	 model: '='
     	},		
		template: '<select class="form-control">'+
				'<option value="" style="display:none">Выберите элемент</option>'+
				'</select>',
		controller: function($scope){
		},
		link: function($scope, element, attrs, ngModel) {
			var el = element.find('select');
			el.attr('ng-model', attrs['variable']);
			el.attr('ng-options', attrs['datasource']);
			$compile(el)($scope);
		}
	}
}])