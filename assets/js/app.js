import $ from 'jquery';
import _ from 'lodash';
import bootstrap from 'bootstrap';
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

import magiceye from 'magiceye'
import textmapper from 'assets/js/TextDepthMapper'

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

$(function(){
  var App = new Marionette.Application();
  App.addRegions({
    main: '#main-region',
    sub: '#sub-region'
  });

  // models
  App.Image = Backbone.Model.extend({});
  App.Texts = Backbone.Collection.extend({});

  // views
  App.ImageView = Marionette.ItemView.extend({
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
  App.TextView = Marionette.ItemView.extend({
    template: '#text-template'
  });
  App.ListView = Marionette.CompositeView.extend({
    template: '#list-template',
    childView: App.TextView,
    itemViewContainer: '#textList'
  });
// start app
  App.onStart = function(){
    var word = "Hello World";
    var image = new App.Image({
      word: word,
      width: 800,
      height: 600
    });
    var texts = new App.Texts([
      {text: 'foo'},
      {text: 'bar'},
      {text: 'baz'},
      {text: 'ham'},
      {text: 'sam'}
    ]);

    var imageview = new App.ImageView({
      model: image
    });
    var listview = new App.ListView({
      collection: texts
    });

    // render views
    App.main.show(imageview);
    App.sub.show(listview);
  };
  App.start();
});
