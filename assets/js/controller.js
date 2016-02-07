import * as models from 'assets/js/models';
import * as views from 'assets/js/views';
import * as settings from 'assets/js/settings';

export function init() {
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
}
