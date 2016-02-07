import randomWord from 'random-word-by-length';

import Backbone from 'backbone';

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
    this.set([
      {text: randomWord(5), checked: "checked"},
      {text: randomWord(5)},
      {text: randomWord(5)},
      {text: randomWord(5)},
      {text: randomWord(5)}
    ]);
  }
});
