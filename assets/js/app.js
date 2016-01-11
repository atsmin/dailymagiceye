import $ from 'jquery';
import me from 'magiceye'
import dm from 'assets/js/TextDepthMapper'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

function renderMagicEye() {
  me.render({
    el: 'magic-eye',
    colors: generatePalette(3),
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
  App.addRegions({
    mainRegion: '#main-region'
  });
  App.Image = Backbone.Model.extend({});
  App.ImageView = Marionette.ItemView.extend({
    template: '#image-template'
  });

  App.onStart = function(){
    console.log('foo');
    var image = new App.Image({
      width: 800,
      height: 600
    });
    var imageview = new App.ImageView({
      el: '#image',
      model: image
    });
    console.log(imageview.render());
    console.log('bar');
  };
  App.start();
  renderMagicEye();
});
