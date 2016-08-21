'use strict';
/**
 * The user service allows for user interaction of user to backend.
 * to the console.log every 50 seconds.
 *
 * @param {*} message Message to be logged.
 */
angular.module('rinrinApp').factory('userService', ['authService','utilityService', 'backendService',
  function(authService, utilityService, backendService) {

  //public message
  var message = "";
  var errorMessage = "Opps. System is maintennance. Please try again later.";
  var successMessage  = "Request was completed.";

  var _log = function log(message) {
      console.log('Log messages: ', message);
  };

  var _createUser = function createUser(email, password, username, phoneNumber ){
      // Create a new user
      utilityService.showLoading('.loginContainer');
      var password_md5 = md5(password);
      authService.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
           message = "User created with uid: " + firebaseUser.uid;
           _log(message);

           //create user object
           var result = backendService.createNewUser(firebaseUser.uid, email,username,phoneNumber,
              utilityService.CONSTANT.ROLE.USER,utilityService.CONSTANT.STATUS.ACTIVE,"",_handleSignUpCallBack);

        }).catch(function(error) {
            message = errorMessage;
            _log(error);
            utilityService.hideLoading();
            if(error.code == "auth/email-already-in-use"){
                errorMessage = error.message + "Please try login with FB, GG, Or Twitter.";  
            }            
            utilityService.tingleBox("Error!",errorMessage, [{type:"primary",name:"Ok"}]);
        });
  };

  var _handleSignUpCallBack = function(response){
      var message = {};
      message.content = "Sign up successfully. Thank you for joining with us.<br> ";
      message.content += "Email confirmation has been sent to your mailbox. ";
      message.content += "Please verify before using account. ";
      message.header = "Welcome!";

      firebase.auth().currentUser.sendEmailVerification().then(function(){
          _handleBackendCallBack(response, message);
      });
      
  };

  var _handleLoginCallBack = function(response){
      var message = {};
      message.content = "Login succesfully and enjoy your service. We will redirect you in 5s...";
      message.header = "Welcome!";

      _handleBackendCallBack(response, message);  
      
  };

  var _handleBackendCallBack = function(response, message){
      if(response.status == 200){
          utilityService.hideLoading();
          utilityService.tingleBox(message.header,
              message.content, [{type:"primary",name:"Ok"}]);  
      }else{
        //rollback great user
        authService.$deleteUser().then(function() {
           console.log("User removed successfully!");
           utilityService.hideLoading();
           utilityService.tingleBox("Error!",errorMessage, [{type:"primary",name:"Ok"}]);
        }).catch(function(error) {
           console.error("Error: ", error);
           utilityService.hideLoading();
           utilityService.tingleBox("Error!",errorMessage, [{type:"primary",name:"Ok"}]);
        });
      }
  };

  var _signInWithOtherProvider = function(provider){
      // Create a new user
      utilityService.showLoading('.loginContainer');
      authService.$signInWithPopup(provider).then(function(result) {
        console.log(result.user);
        
        var uid = result.user.uid;
        var providerDataList = result.user.providerData;
        firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
            //var username = snapshot.val().username;
            //user existed aldy
            //skip

            if(snapshot.val() == null){
                  var username = "";
                  var email = "";
                  var photoURL = "";
                  var phoneNumber = "";
                  for(var key in providerDataList){
                    var providerData = providerDataList[key];
                    if(providerData && providerData.providerId.indexOf(provider) > -1){
                        username = providerData.displayName;
                        email = providerData.email;
                        photoURL = providerData.photoURL;
                    }  
                  }
                  
                  var result = backendService.createNewUser(uid, email,username,
                      phoneNumber,utilityService.CONSTANT.ROLE.USER,utilityService.CONSTANT.STATUS.ACTIVE,photoURL, _handleLoginCallBack);
                  
 
            }else{
                  utilityService.hideLoading();
                  utilityService.tingleBox("Welcome!",
                    "Login succesfully and enjoy your service. We will redirect you in 5s...", [{type:"primary",name:"Ok"}]);  
            }
            

        
        },function(error){
            //if error
            //skipp we will update it later
            utilityService.hideLoading();
                  utilityService.tingleBox("Welcome!",
                    "Login succesfully and enjoy your service. We will redirect you in 5s...", [{type:"primary",name:"Ok"}]); 
        });
        
      }).catch(function(error) {
         console.error("Authentication failed:", error);
         if(error.code == "auth/account-exists-with-different-credential"){
            //try to sign in with credential

            var credential = firebase.auth.FacebookAuthProvider.credential(error.credential.accessToken);
            firebase.auth().currentUser.link(credential).then(function(user) {
              console.log("Account linking success", user);
              authService.$signInWithCredential(credential).then(function(firebaseUser) {
               console.log("Signed in as:", firebaseUser.uid);
               utilityService.hideLoading();
               utilityService.tingleBox("Welcome!",
                  "Login succesfully and enjoy your service. We will redirect you in 5s...", [{type:"primary",name:"Ok"}]);
                }).catch(function(error) {
                   console.error("Authentication failed:", error);
                   utilityService.hideLoading();
                   utilityService.tingleBox("Error!",errorMessage, [{type:"primary",name:"Ok"}]);
                });
            }, function(error) {
              console.log("Account linking error", error);
              utilityService.tingleBox("Error!",errorMessage, [{type:"primary",name:"Ok"}]);
            });
            
         }
      });
  };

  var _login = function(email, password){
      utilityService.showLoading('.loginContainer');
      var password_md5 = md5(password);
      authService.$signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
           message = "User sign in with profile: " + firebaseUser.uid;
           _log(message);
           utilityService.hideLoading();
           if(firebaseUser.emailVerified){
              utilityService.tingleBox("Welcome!",
              "Login succesfully and enjoy your service. We will redirect you in 5s...", [{type:"primary",name:"Ok"}]);
           }else{
              utilityService.tingleBox("Welcome!",
              "You have not verified email confirmation. Please verify it or resend confirmation email.", [{type:"primary",name:"Ok"}]);
           }
           
        }).catch(function(error) {
            message = error;
            _log(message);
            utilityService.hideLoading();            
        });
  };

  return {
    message : message,
    createUser : _createUser,
    login: _login,
    signInWithOtherProvider : _signInWithOtherProvider
  };
}]);