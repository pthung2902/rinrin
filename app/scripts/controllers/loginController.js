'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('rinrinApp')
  .controller('LoginCtrl', ["$scope","$rootScope", "$location", "$timeout", "userService", "utilityService", 
  	function($scope, $rootScope, $location, $timeout, userService, utilityService) {
    
    $(".no-landing-show").hide();
    $("#page-wrapper").removeClass("admin-wrapper");

  	$scope.login = function(){
  		
  		//var username = 
  		//console.log('email: ' + $scope.email);
  		//console.log('password :' + $scope.password);

  		utilityService.showLoading('.loginContainer');
  	};

  	$scope.signup = function(){

  		console.log('email: ' + $scope.emailSignUp);
  		console.log('password :' + $scope.passwordSignUp);
  		console.log('your name :' + $scope.yourName);
  		console.log('phone number :' + $scope.phoneNumber);

  		var result = userService.createUser($scope.emailSignUp, $scope.passwordSignUp);

  	};

  	$timeout(function() {
  		$('#horizontalTab').easyResponsiveTabs({
	        type: 'default', //Types: default, vertical, accordion           
	        width: 'auto', //auto or any width like 600px
	        fit: true   // 100% fit in a container
		});	
  	}, 10, false);
  	

}]);