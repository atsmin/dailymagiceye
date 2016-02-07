import * as models from 'assets/js/models';
import * as views from 'assets/js/views';
import * as settings from 'assets/js/settings';

export function init() {
  var image = new models.Image({
    width: settings.IMAGE_WIDTH,
    height: settings.IMAGE_HEIGHT
  });

  var wordList = new models.WordList();

  var imageview = new views.ImageView({
    model: image
  });
  var listview = new views.ListView({
    collection: wordList
  });

  // render views
  imageview.render();
  listview.render();

  $('input[name=textRadio]:first').focus();
}
