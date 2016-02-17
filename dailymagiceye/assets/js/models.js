import _ from 'lodash';
import Backbone from 'backbone';
import randomWord from 'random-word-by-length';

import { MODE, NUM_OF_TEXTS, MAX_WORDS_LEN } from 'assets/js/settings';
import { randomChoice } from 'assets/js/utils';

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
  refresh: function(mode = MODE.word){
    var textFactory = this.getTextFactory(mode);
    var texts = [];
    for (let _ of Array(NUM_OF_TEXTS)) {
      texts.push({text: textFactory()});
    }
    texts[0].checked = "checked";
    this.reset(texts);
  },
  getTextFactory: function(mode){
    if (mode === MODE.word) {
      return _.partial(randomWord, MAX_WORDS_LEN);
    } else if (mode === MODE.kanji) {
      return this.randomKanji;
    } else if (mode === MODE.symbol) {
      return this.randomSymbol;
    } else if (mode === MODE.snowman) {
      return this.snowMan;
    }
  },
  randomKanji: function(){
    /* unicode Kanji range
     * 4E00 ~ 9FC3 */
    var first, second, third, last;
    [first, second, third, last] = ['456789', 'EF', '0123456789ABC', '0123'];
    return unescape(
      '%u' +
      randomChoice(first) + randomChoice(second) +
      randomChoice(third) +randomChoice(last)
    );
  },
  randomSymbol: function(){
    /* unicode Symbol range
     * 2600 ~ 269D */
    var first, second;
    [first, second] = ['0123456789', '0123456789ABCD'];
    return unescape(
      '%u26' + randomChoice(first) + randomChoice(second)
    );
  },
  snowMan: function(){
    /* unicode Snowman
     * 2603 */
    return unescape('%u2603');
  },
});
