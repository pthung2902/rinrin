'use strict';
/**
 * The utility service allows for developer create for utilizing function: validation, loading screen, caculation....
 *
 * @param {*} message Message to be logged.
 */
angular.module('rinrinApp').factory('utilityService', ['$timeout', function($timeout) {

  var _CONSTANT = {
    STATUS : {
      ACTIVE : 'active',
      DELETED: 'deleted',
      BLOCKED: 'block'
    },

    ROLE:{
      USER : 'user',
      STORE: 'store',
      SALE: 'sale',
      ADMIN: 'admin'
    }
  };

  var tingle_template = '<div class="tingle-content"> <div> <h1>@HEADER@</h1> <p>@CONTENT@</p> </div> </div>';

  var _showLoading = function log(container) {

      $(".overlay").css("width",$(container).width());
      $(".overlay").css("height",$(container).height());
      var top = ($(".overlay").height() / 2 )-  ($(".cssload-thecube").height() /2);
      var left = $(".overlay").width() / 2 - ($(".cssload-thecube").width() /2);
      $(".cssload-thecube").css("margin-top", top + "px");
      $(".cssload-thecube").css("margin-left", left + "px");
      $(".overlay").css("top",$(container).scrollTop());
      $(".overlay").show();
  };

  var _hideLoading = function log(container) {
      $(".overlay").hide();
  };

  var _tingleBox = function(header,content,buttons, isShowCancel){

    $timeout(function() {
      var modal = new tingle.modal({
          footer: true,
          stickyFooter: true
      });

      var template = tingle_template;
      template = template.replace("@HEADER@",header);
      template = template.replace("@CONTENT@",content);

      // set content
      modal.setContent(template);

      for(var key in buttons){
        var button = buttons[key];
        if(button.type && button.type == "primary"){
            modal.addFooterBtn(button.name, 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
                if(button.callback && typeof button.callback == 'function'){
                    button.callback();
                }else{
                  modal.close();
                }
            });
        }else{
            modal.addFooterBtn(button.name, 'tingle-btn tingle-btn--danger', function(){
                if(button.callback && typeof button.callback == 'function'){
                    button.callback();
                }else{
                  modal.close();
                }
            });    
        }
      }
      
      if(isShowCancel){
        modal.addFooterBtn('Cancel', 'tingle-btn tingle-btn--default tingle-btn--pull-right', function(){
            modal.close();
        });  
      }
      

      // open modal
      modal.open();
    }, 10, false);

  };

  return {
    showLoading : _showLoading,
    hideLoading : _hideLoading,
    CONSTANT: _CONSTANT,
    tingleBox : _tingleBox
  };
}]);