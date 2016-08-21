'use strict';

angular.module('rinrinApp').factory("backendService", ['utilityService',
 function(utilityService){
  
 var response = {};

var _createUser = function(userId,user,callback){

    firebase.database().ref('users/' + userId).set(user).then(function(){
        response.status = 200;
        if(callback && typeof callback == 'function'){
            callback(response);
        }
    },function(error){
        response.status = 500;
        response.error = error;
        if(callback && typeof callback == 'function'){
            callback(response);
        }
    });    
};


 var _createNewUser = function(userId, userEmail, userName, userPhone, userRole, userStatus,photoURL, callback){

    var user = {};
    user.email = userEmail;
    user.name = userName;
    user.phone = userPhone;

    if(photoURL){
        user.photoURL = photoURL;    
    }
    

	user.role = utilityService.CONSTANT.ROLE.USER;

    if(userRole){
    	user.status = userRole;	
    }

    user.status = utilityService.CONSTANT.STATUS.ACTIVE;

    if(userStatus){
    	user.status = userStatus;
    }

    firebase.database().ref('users/' + userId).set(user).then(function(){
        response.status = 200;
        if(callback && typeof callback == 'function'){
            callback(response);
        }
    },function(error){
        response.status = 500;
        response.error = error;
        if(callback && typeof callback == 'function'){
            callback(response);
        }
    });    
};

  return {
  	createNewUser : _createNewUser,
    createUser : _createUser
  };

}]);