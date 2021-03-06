import Marionette from 'backbone.marionette';
import magiceye from 'magiceye';
import textMapper from 'magiceye/depthmappers/TextDepthMapper.js';
import randomWord from 'random-word-by-length';
import async from 'caolan/async';
import introJs from 'intro.js';
import jqueryTouchEvents from 'jquery-touch-events';

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
    $(this.el).on('swiperight', this.onSwipeRight.bind(this));
    $(this.el).on('swipeleft', this.onSwipeLeft.bind(this));
    $(this.el).on('doubletap', this.onDoubleTap.bind(this));
  },
  onDestroy: function() {
    $(window).off('resize.imageview');
    $(this.el).off('swiperight');
    $(this.el).off('swipeleft');
    $(this.el).off('doubletap');
  },
  onResize: function() {
    var imageWidth, imageHeight;
    [imageWidth, imageHeight] = getImageSize();
    this.model.set({width: imageWidth, height: imageHeight});
  },
  onSwipeRight: function() {
    var $checked = $('input[name=textRadio]:checked');
    var $next = $checked.parents('div:first').next();
    if ($next.length) {
      $next.children('label').children('input').prop('checked', true)
        .trigger('change');
    } else {
      $('input[name=textRadio]:first').prop('checked', true)
        .trigger('change');
    }
  },
  onSwipeLeft: function() {
    var $checked = $('input[name=textRadio]:checked');
    var $prev = $checked.parents('div:first').prev();
    if ($prev.length) {
      $prev.children('label').children('input').prop('checked', true)
        .trigger('change');
    } else {
      $('input[name=textRadio]:last').prop('checked', true)
        .trigger('change');
    }
  },
  onDoubleTap: function() {
    $('#refresh').trigger('click');
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
    'change @ui.radio': 'changeText'
  },
  changeText: function(){
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
    'click @ui.button': 'refreshTexts',
    'click @ui.tab': 'clickTab',
    'click @ui.help': 'showIntro'
  },
  refreshTexts: function(){
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
    this.refreshTexts();
  },
  showIntro: function(){
    var intro = introJs.introJs();
    // for cordova InAppBrowser
    var link1 = "window.open('https://en.wikipedia.org/wiki/Autostereogram','_system');";
    var link2 = "window.open('http://www.colorstereo.com/texts_.txt/practice.htm','_system');";
    intro.setOption('showStepNumbers', false);
    intro.setOptions({
      steps: [
        {
          element: '#title',
          intro: `Welcome to Daily MagicEye! This is a random word <a href="javascript:void(0);" onClick=${link1}>autostereogram</a> app for visual recovery(I hope).`,
          position: 'bottom'
        },
        {
          element: '#magic-eye',
          intro: `Here's the MagicEye image, one word is floating on it. <a href="javascript:void(0);" onClick=${link2} target="_system">Can you find it?</a>`,
          position: 'top'
        },
        {
          element: '#textList',
          intro: "You can choose the floating word here or swipe the image.",
          position: 'bottom'
        },
        {
          element: '#nav',
          intro: "You can also select type of words here.",
          position: 'bottom'
        },
        {
          element: '#refresh',
          intro: "The words are generated randomly. Press this button to reload them or tap the image.",
          position: 'right'
        },
      ]
    });
    intro.start();
  }
});
