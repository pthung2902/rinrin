'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('rinrinApp')
  .directive('sidebarUser',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/user/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
      }
    }
  }]);
