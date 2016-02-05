import randomWord from 'random-word-by-length';

import * as models from 'assets/js/models';
import * as views from 'assets/js/views';

export function init() {
  var image = new models.Image({
    width: 800,
    height: 600
  });

  var textList = new models.TextList([
    {text: randomWord(5), checked: "checked"},
    {text: randomWord(5)},
    {text: randomWord(5)},
    {text: randomWord(5)},
    {text: randomWord(5)}
  ]);

  var imageview = new views.ImageView({
    model: image
  });
  var listview = new views.ListView({
    collection: textList
  });
  var sideview = new views.SideView();

  // render views
  imageview.render();
  sideview.render();
  sideview.showChildView('nav', new views.NavView());
  sideview.showChildView('list', listview);

  $('input[name=textRadio]:first').focus();
}
