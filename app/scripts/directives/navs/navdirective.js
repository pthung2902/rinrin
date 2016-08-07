'use strict';

/**
 * @ngdoc directive
 * @name rinrinApp.directive:navDirective
 * @description
 * # navDirective
 */
angular.module('rinrinApp')
  .directive('navDirective', function () {
    return {
      templateUrl: 'scripts/directives/navs/nav-directive.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        $(element).find("#menu-toggle").on('click',function(e){
        	e.preventDefault();
        	$(element).find("#sidebar-wrapper").toggleClass("active");
        });

        $(element).find("#menu-close").on('click',function(e){
        	e.preventDefault();
        	$(element).find("#sidebar-wrapper").toggleClass("active");
        });

        $(element).find("li > a").on('click',function(e){
        	
        	var html = $('html');
            var target = this.hash;
            target = html.find(target);
            
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        
        });

        //initialize globaly
        $(document).ready(function(){
        	$(document).find(".rinrin-container .header").height($(window).height());
            $('.no-landing-show').hide();
            $('#page-wrapper').removeClass("admin-wrapper");
        });

      }
    };
  });
