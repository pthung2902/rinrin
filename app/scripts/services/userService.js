'use strict';
/**
 * The user service allows for user interaction of user to backend.
 * to the console.log every 50 seconds.
 *
 * @param {*} message Message to be logged.
 */
angular.module('rinrinApp').factory('userService', ['authService', '$log', function(authService, $log) {

  //public message
  var message = "";
  var status = 0;

  var _log = function log(message) {
      $log.log('batchLog messages: ', message);
  };

  var _createUser = function createUser(username, password){
      // Create a new user
      //var password_md5 = md5(password);
      authService.$createUserWithEmailAndPassword(username, password)
        .then(function(firebaseUser) {
           message = "User created with uid: " + firebaseUser.uid;
           status = 200;
           _log(message);
        }).catch(function(error) {
            message = error;
            status = 500;
        });
  };

  return {
    message : message,
    status : status,
    createUser : _createUser
  };
}]);