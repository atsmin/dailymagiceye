import Marionette from 'backbone.marionette';

import * as controller from 'assets/js/controller';

$(function(){
  var App = new Marionette.Application();
  // start app
  App.onStart = function(){
    controller.init();
  };
  App.start();
});
