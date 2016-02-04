import Marionette from 'backbone.marionette';

import magiceye from 'magiceye';
import randomWord from 'random-word-by-length';

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

function renderMagicEye(word) {
    magiceye.render({
      el: 'magic-eye',
      colors: generatePalette(10),
      depthMapper: new magiceye.TextDepthMapper(word)
    });
  }

// views
export var ImageView = Marionette.ItemView.extend({
  template: '#image-template',
});

var TextView = Marionette.ItemView.extend({
  tagName: 'div',
  className: 'radio bg-primary text_container',
  template: '#text-template',
  ui: {
    radio: 'input[name=textRadio]',
  },
  events: {
    'click @ui.radio': 'clickRadio'
  },
  clickRadio: function(){
    renderMagicEye(this.ui.radio.val());
  },
  templateHelpers: function(options) {
    return {
      index: this.options.childIndex
    };
  }
});

export var ListView = Marionette.CompositeView.extend({
  template: '#list-template',
  childView: TextView,
  childViewContainer: '#textList',
  childViewOptions: function(model, index) {
    return {
      childIndex: index
    };
  },
  onRender: function(){
    renderMagicEye(
      this.collection.toJSON()[0].text
    );
  },
  ui: {
    button: 'button[name=refresh]',
  },
  events: {
    'click @ui.button': 'refreshText'
  },
  refreshText: function(){
    this.collection.set([
      {text: randomWord(5), checked: "checked"},
      {text: randomWord(5)},
      {text: randomWord(5)},
      {text: randomWord(5)},
      {text: randomWord(5)}
    ]);
    renderMagicEye(
      this.collection.toJSON()[0].text
    );
    $('input[name=textRadio]:first').focus();
  }
});
