import $ from 'jquery';
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

import magiceye from 'magiceye'

function randomRGBa() {
  return [Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          255];
}

function generatePalette(numColors) {
  var palette = [];
  for (var i = 0; i < numColors; i++) {
    palette.push(randomRGBa());
  }
  return palette;
}

// views
export var ImageView = Marionette.ItemView.extend({
  template: '#image-template',
  onShow: function(){
    this.renderMagicEye(this.model.attributes.word);
  },
  renderMagicEye: function(word) {
    magiceye.render({
      el: 'magic-eye',
      colors: generatePalette(10),
      depthMapper: new magiceye.TextDepthMapper(word)
    });
  }
});

var TextView = Marionette.ItemView.extend({
  template: '#text-template'
});

export var ListView = Marionette.CompositeView.extend({
  template: '#list-template',
  childView: TextView,
  childViewContainer: '#textList'
});
