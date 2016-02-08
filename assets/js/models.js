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
  refresh: function(mode = settings.MODE['words']){
    var factory, args;
    [factory, args] = this.getFactory(mode);
    var texts = [];
    for (let i of Array(settings.NUM_OF_TEXTS).keys()) {
      texts.push({text: factory(args)});
    }
    texts[0].checked = "checked";
    this.reset(texts);
  },
  getFactory: function(mode){
    if (mode === settings.MODE['words']) {
      return [randomWord, settings.MAX_WORDS_LEN];
    } else if (mode === settings.MODE['kanji']) {
      return [this.randomKanji, null];
    }
  },
  randomKanji: function(args){
    /* unicode Kanji range
     * 4E00 ~ 9FC3 */
    var _choose = function(range){ return range[Math.floor(Math.random()*range.length)]; };
    var first, second, third, last;
    [first, second, third, last] = ['456789', 'EF', '0123456789ABC', '0123'];
    return unescape(
      '%u' + _choose(first) + _choose(second) +_choose(third) +_choose(last)
    );
  }
});
