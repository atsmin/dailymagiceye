import * as models from 'assets/js/models'
import * as views from 'assets/js/views'

export function init(app) {
  var word = "Hello World";
  var image = new models.Image({
    word: word,
    width: 800,
    height: 600
  });
  var texts = new models.Texts([
    {text: 'foo'},
    {text: 'bar'},
    {text: 'baz'},
    {text: 'ham'},
    {text: 'sam'}
  ]);

  var imageview = new views.ImageView({
    model: image
  });
  var listview = new views.ListView({
    collection: texts
  });

  //render views
  app.main.show(imageview);
  app.sub.show(listview);
}
