import $ from 'jquery';
import _ from 'lodash';
import bootstrap from 'bootstrap';
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

import magiceye from 'magiceye'
import textmapper from 'assets/js/TextDepthMapper'

function renderMagicEye(words) {
  magiceye.render({
    el: 'magic-eye',
    colors: generatePalette(10),
    depthMapper: new magiceye.TextDepthMapper(words)
  });
}

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
    mainRegion: '#main-region'
  });

  // models
  App.Image = Backbone.Model.extend({});
  App.Text = Backbone.Model.extend({});

  // views
  App.ImageView = Marionette.ItemView.extend({
    template: '#image-template'
  });
  App.TextView = Marionette.ItemView.extend({
    template: '#text-template'
  });

  // start app
  App.onStart = function(){
    var words = "OK!";
    var image = new App.Image({
      width: 800,
      height: 600
    });
    var text = new App.Text({
      words: words
    });

    var imageview = new App.ImageView({
      el: '#image',
      model: image
    });
    var textview = new App.TextView({
      el: '#text',
      model: text
    });
    imageview.render();
    textview.render();
    renderMagicEye(words);
  };
  App.start();
});
