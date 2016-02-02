import Backbone from 'backbone';

// models
export var Image = Backbone.Model.extend({});

var Text = Backbone.Model.extend({
  defaults: {checked: "" }
});

export var TextList = Backbone.Collection.extend({
  model: Text
});
