'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('rinrinApp')
  .controller('StoreRegisterCtrl', ["$scope","$rootScope", "$location", "$timeout", "userService",
   "utilityService", "authService", "backendService",
  	function($scope, $rootScope, $location, $timeout, userService, utilityService, authService, backendService) {
    
    $(".no-landing-show").hide();
    $("#page-wrapper").removeClass("admin-wrapper");

    var timeline_active = "../images/timeline_d.jpg";
    var timeline = "../images/timeline.jpg";
    var message = "";

    var currentUser = firebase.auth().currentUser;
    if(true){
        //ignore step 1
        $('.step1').hide();
        $('.step2').show();
        $('.steps-one > img').attr('src', timeline);
        $('.steps-two > img').attr('src', timeline_active);
    }else{
        //show step 1
        $('.step2').hide();
    }

    //init
    $('.rinrin-alert').hide();

    

    $scope.step_one_click = function(){
        console.log("step 1 click");

        //get username and password
        var email = $('#email').val();
        var password = $('#password').val();

        console.log("[username " + email + "] - [password :" + password + "]");

        utilityService.showLoading('body');
        var password_md5 = md5(password);
        authService.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
           message = "User created with uid: " + firebaseUser.uid;
           console.log(message);

           //create user object
          var user = {};
          user.email = email;
          user.name = "";
          user.phone = "";
          user.storeId = "";
          user.role = utilityService.CONSTANT.ROLE.STORE;
          user.status = utilityService.CONSTANT.STATUS.ACTIVE;


           var result = backendService.createUser(firebaseUser.uid, user,_handleSignUpCallBack);

        }).catch(function(error) {
            var errorMessage = "";
            console.log(error);
            utilityService.hideLoading();
            if(error.code == "auth/email-already-in-use"){
                errorMessage = error.message + "Please try login with FB, GG, Or Twitter.";  
            } 

            $(".rinrin-alert > div").text(errorMessage);

            //utilityService.tingleBox("Error!",errorMessage, [{type:"primary",name:"Ok"}]);
        });

    };

    var _handleSignUpCallBack = function(response){

      //send verification email
      firebase.auth().currentUser.sendEmailVerification().then(function(){
          $('.step1').hide();
          $('.step2').show();
          $('.steps-one > img').attr('src', timeline);
          $('.steps-two > img').attr('src', timeline_active);
          utilityService.hideLoading();
      });
      
  };

    $scope.step_two_click = function(){
       $('.step2').hide();
       ('.step3').show();
    };

  	$timeout(function() {
       $('#carousel1').carousel({
            interval: 3000
        });

        var clickEvent = false;

        $('#carousel1').on('click', '.nav a', function (e) {
            e.preventDefault();
            clickEvent = true;
            $('.custom-carousel .nav li').removeClass('active');
            $(this).parent().addClass('active');
        }).on('slid.bs.carousel', function (e) {
            if (!clickEvent) {
                var count = $('.custom-carousel .nav').children().length - 1;
                var current = $('.custom-carousel .nav li.active');
                current.removeClass('active').next().addClass('active');
                var id = parseInt(current.data('slide-to'));
                if (count == id) {
                    $('.custom-carousel .nav li').first().addClass('active');
                }
            }
            clickEvent = false;
        });

    }, 10, false);

}]);