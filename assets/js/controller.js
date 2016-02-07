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
  var sideview = new views.SideView();

  // render views
  imageview.render();
  sideview.render();
  sideview.showChildView('nav', new views.NavView());
  sideview.showChildView('list', listview);

  $('input[name=textRadio]:first').focus();
}
