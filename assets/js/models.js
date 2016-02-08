import Backbone from 'backbone';
import randomWord from 'random-word-by-length';

import * as settings from 'assets/js/settings';
import * as utils from 'assets/js/utils';

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
  refresh: function(mode = settings.MODE['word']){
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
    if (mode === settings.MODE['word']) {
      return [randomWord, settings.MAX_WORDS_LEN];
    } else if (mode === settings.MODE['kanji']) {
      return [this.randomKanji, null];
    } else if (mode === settings.MODE['symbol']) {
      return [this.randomSymbol, null];
    } else if (mode === settings.MODE['snowman']) {
      return [this.snowMan, null];
    }
  },
  randomKanji: function(args){
    /* unicode Kanji range
     * 4E00 ~ 9FC3 */
    var first, second, third, last;
    [first, second, third, last] = ['456789', 'EF', '0123456789ABC', '0123'];
    return unescape(
      '%u' +
      utils.randomChoice(first) + utils.randomChoice(second) +
      utils.randomChoice(third) +utils.randomChoice(last)
    );
  },
  randomSymbol: function(args){
    /* unicode Symbol range
     * 2600 ~ 269D */
    var first, second;
    [first, second] = ['0123456789', '0123456789ABCD'];
    return unescape(
      '%u26' + utils.randomChoice(first) + utils.randomChoice(second)
    );
  },
  snowMan: function(args){
    /* unicode Snowman
     * 2603 */
    return unescape('%u2603');
  },
});
