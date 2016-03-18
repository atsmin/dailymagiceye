import _ from 'lodash';
import Backbone from 'backbone';
import randomWord from 'random-word-by-length';

import { MODE, NUM_OF_TEXTS, MAX_WORDS_LEN } from 'assets/js/settings';
import { randomHex as h } from 'assets/js/utils';

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
  refresh: function(mode = MODE.word) {
    var textFactory = this.getTextFactory(mode);
    var texts = [];
    for (let _ of Array(NUM_OF_TEXTS)) {
      texts.push({text: textFactory()});
    }
    texts[0].checked = "checked";
    this.reset(texts);
  },
  getTextFactory: function(mode) {
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
  randomKana: function() {
    /* unicode Hiragana range
     * 3040 ~ 3096
     * unicode Katakana range
     * 30A0 ~ 30FF */
    if (Math.random() < 0.5) {
      return unescape(`%u30${h(4, 9)}${h(0, 6)}`);
    } else {
      return unescape(`%u30${h('A', 'F')}${h(0, 'F')}`);
    }
  },
  randomKanji: function() {
    /* unicode Kanji range
     * 4E00 ~ 9FC3 */
    return unescape(`%u${h(4, 9)}${h('E', 'F')}${h(0, 'C')}${h(0, 3)}`);
  },
  randomHangul: function() {
    /* unicode Hangul range
     * AC00 ~ AFFF */
    return unescape(`%uA${h('C', 'F')}${h(0, 'F')}${h(0, 'F')}`);
  },
  randomSymbol: function() {
    /* unicode Symbol range
     * 2600 ~ 269D */
    return unescape(`%u26${h(0, 9)}${h(0, 'D')}`);
  },
  snowMan: function() {
    /* unicode Snowman
     * 2603 */
    return unescape('%u2603');
  }
});
