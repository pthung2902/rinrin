'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('rinrinApp')
	.directive('headerExt',function(){
		return {
	        templateUrl:'scripts/directives/header/header.html',
	        restrict: 'E',
	        replace: true,
	        controller:["$scope","$rootScope",function($scope, $rootScope){
	        	
	      	}]
    	}
	});


