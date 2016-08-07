'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('rinrinApp')
  .controller('HomeCtrl',["$rootScope", "$scope", "$location", function($scope, $rootScope, $location) {
  	
    if($rootScope.role == undefined || $rootScope.role == ""){
    	$('.adminSidebar').hide();
    	$('.storeSidebar').hide();
    	$('.userSidebar').hide();
    	$location.path('/dashboard/login');
    }else{

    	//show the side bar
    	var role = $rootScope.role;
    	if(role == "admin"){
    		$('.adminSidebar').show();
    		$('.storeSidebar').empty();
    		$('.userSidebar').empty();
    	}else if(role == "store"){
    		$('.storeSidebar').show();
    		$('.adminSidebar').empty();
    		$('.userSidebar').empty();
    	}else{
    		$('.userSidebar').show();
    		$('.adminSidebar').empty();
    		$('.storeSidebar').empty();
    	}
		    	
    	//show admin bar
    	$("#page-wrapper").addClass("admin-wrapper");
    	$(".no-landing-show").show();
    }


}]);