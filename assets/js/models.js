import Backbone from 'backbone';
import randomWord from 'random-word-by-length';

import * as settings from 'assets/js/settings';

// models
export var Image = Backbone.Model.extend();

var Text = Backbone.Model.extend({
  defaults: function(){
    return {checked: "" };
  }
});

export var TextList = Backbone.Collection.extend({
  model: Text,
  initialize: function(){
    this.refresh();
  },
  refresh: function(mode = 0){
    var generator;
    if (mode === 0) {
      generator = randomWord;
    } else if (mode === 1) {
      generator = this.randomKanji;
    }

    var texts = [];
    for (let i of Array(settings.NUM_OF_TEXTS).keys()) {
      texts.push({text: generator(5)});
    }
    texts[0].checked = "checked";
    this.reset(texts);
  },
  randomKanji: function(args){
    /* unicode Kanji range
     * 4E00 ~ 9FFF */
    var first = '456789';
    var second = 'EF';
    var third = '0123456789ABCDEF';
    return unescape(
      '%u' + first[Math.floor(Math.random()*first.length)] +
       second[Math.floor(Math.random()*second.length)] +
       Array(3).join(third[Math.floor(Math.random()*third.length)])
    );
  }
});
