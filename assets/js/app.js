import Marionette from 'backbone.marionette';

import { IMAGE_WIDTH, IMAGE_HEIGHT } from 'assets/js/settings';
import { Image, TextList } from 'assets/js/models';
import { ImageView, SideView } from 'assets/js/views';

$(function(){
  var App = new Marionette.Application();
  // start app
  App.onStart = function(){
    var image = new Image({
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT
    });
    var textList = new TextList();
    var imageview = new ImageView({
      model: image
    });
    var sideview = new SideView({
      collection: textList
    });

    imageview.render();
    sideview.render();
    $('input[name=textRadio]:first').focus();
    };
  App.start();
});
