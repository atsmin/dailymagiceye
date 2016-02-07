import Marionette from 'backbone.marionette';
import magiceye from 'magiceye';
import textMapper from 'magiceye/depthmappers/TextDepthMapper.js';
import randomWord from 'random-word-by-length';

import * as models from 'assets/js/models';

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
  el: '#image',
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

export var SideView = Marionette.CompositeView.extend({
  el: '#side',
  template: '#side-template',
  childView: TextView,
  childViewContainer: '#textList',
  childViewOptions: function(model, index) {
    return {
      childIndex: index
    };
  },
  renderImage: function(){
    renderMagicEye(
      this.collection.toJSON()[0].text
    );
  },
  onRender: function(){
    this.renderImage();
  },
  ui: {
    button: 'button[name=refresh]',
    tab: '.textTab',
  },
  events: {
    'click @ui.button': 'refreshText',
    'click @ui.tab': 'clickTab'
  },
  refreshText: function(){
    var mode = $('li.active').index();
    this.collection.refresh(mode);
    this.renderImage();
    $('input[name=textRadio]:first').focus();
  },
  clickTab: function(event){
    // change active navigation tab
    var index = $(event.target).parent('li').index();
    this.ui.tab.removeClass('active');
    $(this.ui.tab[index]).addClass('active');
    this.refreshText();
  },
});
