import randomWord from 'random-word-by-length';

import * as models from 'assets/js/models';
import * as views from 'assets/js/views';

export function init(app) {
  var image = new models.Image({
    width: 800,
    height: 600
  });

  var texts = new models.Texts([
    {text: randomWord(5)},
    {text: randomWord(5)},
    {text: randomWord(5)},
    {text: randomWord(5)},
    {text: randomWord(5)}
  ]);

  var imageview = new views.ImageView({
    model: image
  });
  var listview = new views.ListView({
    collection: texts
  });

  // render views
  app.main.show(imageview);
  app.sub.show(listview);
}