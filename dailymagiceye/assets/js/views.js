import Marionette from 'backbone.marionette';
import magiceye from 'magiceye';
import textMapper from 'magiceye/depthmappers/TextDepthMapper.js';
import randomWord from 'random-word-by-length';
import async from 'caolan/async';
import introJs from 'intro.js'

import { getImageSize, SpinnerSingleton } from 'assets/js/utils';

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

function renderMagicEye(text) {
    var spinner = SpinnerSingleton.getSpinner();
    async.waterfall([
      function(callback){ spinner.spin(); callback(); },
      function(callback){
        magiceye.render({
          el: 'magic-eye',
          colors: generatePalette(10),
          depthMapper: new magiceye.TextDepthMapper(text)
        }); callback();
      },
      function(callback){ spinner.stop(); callback(); },
    ]);
  }

// views
export var ImageView = Marionette.ItemView.extend({
  el: '#image',
  template: '#image-template',
  initialize: function() {
    $(window).on('resize.imageview', this.onResize.bind(this));
  },
  onDestroy: function() {
    $(window).off('resize.imageview');
  },
  onResize: function() {
    var imageWidth, imageHeight;
    [imageWidth, imageHeight] = getImageSize();
    this.model.set({width: imageWidth, height: imageHeight});
  },
  modelEvents: {
    'change': 'refresh'
  },
  refresh: function() {
    var that = this;
    async.waterfall([
      function(callback) { that.render(); callback(); },
      function(callback) {
        renderMagicEye(
          $('input[name=textRadio]:checked').val()
        ); callback();
      },
      // reset spinner after rerender image view
      function(callback) { SpinnerSingleton.remove(); callback(); },
    ]);
  }
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
  },
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
    help: '#help',
  },
  events: {
    'click @ui.button': 'refreshText',
    'click @ui.tab': 'clickTab',
    'click @ui.help': 'showIntro'
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
  showIntro: function(){
    var intro = introJs.introJs();
    var link1 = "https://en.wikipedia.org/wiki/Autostereogramhttps://en.wikipedia.org/wiki/Autostereogram";
    var link2 = "http://www.colorstereo.com/texts_.txt/practice.htm";
    intro.setOption('showStepNumbers', false);
    intro.setOption('tooltipPosition', 'auto');
    intro.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
    intro.setOptions({
      steps: [
        {
          element: document.querySelector('#title'),
          intro: `Welcome to Daily MagicEye! This is a random word <a href=${link1} target="_blank">autostereogram</a> app for visual recovery(I hope).`,
        },
        {
          element: document.querySelectorAll('#magic-eye')[0],
          intro: `Here's the MagicEye image, one word is floating on it. <a href=${link2} target="_blank">Can you find it?</a>`,
        },
        {
          element: '#textList',
          intro: "You can choose the floating word here.",
        },
        {
          element: '#nav',
          intro: "You can also select type of words here.",
        },
        {
          element: '#refresh',
          intro: "The words are generated randomly. Press this button to reload them.",
        },
      ]
    });
    intro.start();
  }
});
