import Backbone from 'backbone';

// models
export var Image = Backbone.Model.extend({});

var Text = Backbone.Model.extend({});

export var TextList = Backbone.Collection.extend({
  model: Text
});
