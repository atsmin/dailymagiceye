import Marionette from 'backbone.marionette';

import * as controller from 'assets/js/controller';

$(function(){
  var App = new Marionette.Application();
  // start app
  App.onStart = function(){
    var image = new models.Image({
      width: settings.IMAGE_WIDTH,
      height: settings.IMAGE_HEIGHT
    });

    var textList = new models.TextList();

    var imageview = new views.ImageView({
      model: image
    });
    var sideview = new views.SideView({
      collection: textList
    });

    // render views
    imageview.render();
    sideview.render();

    $('input[name=textRadio]:first').focus();
    };
  App.start();
});
