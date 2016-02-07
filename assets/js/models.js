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
  refresh: function(){
    var texts = [];
    for (let i of Array(settings.num_of_texts).keys()) {
      texts.push({text: randomWord(5)});
    }
    texts[0].checked = "checked";
    this.set(texts);
  }
});
