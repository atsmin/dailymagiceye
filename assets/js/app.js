import $ from 'jquery';
import me from 'magiceye'
import dm from 'assets/js/TextDepthMapper'
import Marionette from 'backbone.marionette'

function renderMagicEye() {
  me.render({
    el: 'magic-eye',
    colors: generatePalette(10),
    depthMapper: new me.TextDepthMapper("OK!")
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
  App.onStart = function(){
    console.log('foo');
    var image = App.Image({});
    var imageview = App.ImageView({
      model: image
    });
  };
  App.addRegions({
    mainRegion: '#main-region'
  });
  App.Image = Backbone.Model.extend({
  });
  App.start();
  console.log('bar');
  renderMagicEye();
});
