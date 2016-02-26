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
    switch (mode) {
    case MODE.word:
      return _.partial(randomWord, MAX_WORDS_LEN);
    case MODE.kana:
      return this.randomKana;
    case MODE.kanji:
      return this.randomKanji;
    case MODE.hangul:
      return this.randomHangul;
    case MODE.symbol:
      return this.randomSymbol;
    }
  },
  randomKana: function(){
    /* unicode Hiragana range
     * 3040 ~ 3096
     * unicode Katakana range
     * 30A0 ~ 30FF */
    var first, second;
    if (Math.random() < 0.5) {
      [first, second] = ['456789', '0123456'];
      return unescape(
        '%u30' + randomChoice(first) + randomChoice(second)
      );
    } else {
      [first, second] = ['ABCDEF', '0123456789ABCDEF'];
      return unescape(
        '%u30' + randomChoice(first) + randomChoice(second)
      );
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
      randomChoice(third) + randomChoice(last)
    );
  },
  randomHangul: function() {
    /* unicode Hangul range
     * AC00 ~ AFFF */
    var first, second;
    [first, second] = ['CDEF', '0123456789ABCDEF'];
    return unescape(
      '%uA' + randomChoice(first) + randomChoice(second) + randomChoice(second)
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
