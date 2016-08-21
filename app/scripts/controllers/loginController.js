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
  		console.log('email: ' + $scope.email);
  		console.log('password :' + $scope.password);

  		utilityService.showLoading('.loginContainer');
  		userService.login($scope.email, $scope.password);

  	};

  	$scope.signup = function(){

  		/*console.log('email: ' + $scope.emailSignUp);
  		console.log('password :' + $scope.passwordSignUp);
  		console.log('your name :' + $scope.yourName);
  		console.log('phone number :' + $scope.phoneNumber);*/

  		userService.createUser($scope.emailSignUp, $scope.passwordSignUp,$scope.yourName,$scope.phoneNumber );

  	};

    $scope.signInWithFaceBook = function(){
      userService.signInWithOtherProvider('facebook');
    };

    $scope.signInWithGoogle = function(){
      userService.signInWithOtherProvider('google');
    };

    $scope.signInWithTwitter = function(){
      userService.signInWithOtherProvider('twitter');
    };


  	$timeout(function() {
  		$('#horizontalTab').easyResponsiveTabs({
	        type: 'default', //Types: default, vertical, accordion           
	        width: 'auto', //auto or any width like 600px
	        fit: true   // 100% fit in a container
		});	
  	}, 10, false);
  	

}]);