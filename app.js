import $ from 'jquery';
import me from 'magiceye'
import dm from 'TextDepthMapper'

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
  renderMagicEye();
});
