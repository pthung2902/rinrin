'use strict';

// let's create a re-usable factory that generates the $firebaseAuth instance
angular.module('rinrinApp').factory("authService", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);