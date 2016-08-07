'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('rinrinApp')
  .directive('sidebarStore',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/store/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
      }
    }
  }]);
