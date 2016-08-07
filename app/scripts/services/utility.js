'use strict';
/**
 * The utility service allows for developer create for utilizing function: validation, loading screen, caculateion....
 * to the console.log every 50 seconds.
 *
 * @param {*} message Message to be logged.
 */
angular.module('rinrinApp').factory('utilityService', ['$log', function($log) {

  var _showLoading = function log(container) {

      $(".overlay").css("width",$(container).width());
      $(".overlay").css("height",$(container).height());
      var top = ($(".overlay").height() / 2 )-  ($(".cssload-thecube").height() /2);
      var left = $(".overlay").width() / 2 - ($(".cssload-thecube").width() /2);
      $(".cssload-thecube").css("margin-top", top + "px");
      $(".cssload-thecube").css("margin-left", left + "px");
      $(".overlay").show();
  };

  var _hideLoading = function log(container) {
      $(".overlay").hide();
  };

  return {
    showLoading : _showLoading,
    hideLoading : _hideLoading
  };
}]);