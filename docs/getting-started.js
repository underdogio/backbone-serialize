// Add our bindings to Backbone
var BackboneSerialize = require('../');
var Backbone = BackboneSerialize.mixin(require('backbone'));

// Create a model and serialize it
var model = new Backbone.Model({
  hello: 'world'
});
console.log(model.serialize()); // {hello: 'world'}

// Create a model with a model and serialize it
var model = new Backbone.Model({
  name: 'Earth',
  galaxy: new Backbone.Model({
    name: 'Milky Way'
  })
});
console.log(model.serialize()); // {name: 'Earth', galaxy: {name: 'Milky Way'}}

// Create a model with dynamic attributes
var PersonModel = Backbone.Model.extend({
  dynamicAttributes: ['full_name'],
  full_name: function () {
    return this.get('first_name') + ' ' + this.get('last_name');
  }
});
var person = new PersonModel({
  first_name: 'Bark',
  last_name: 'Ruffalo'
});
console.log(person.serialize()); // {first_name: 'Bark', full_name: 'Bark Ruffalo', last_name: 'Ruffalo'}

// Create a collection and serialize it
var collection = new Backbone.Collection([
  new Backbone.Model({
    word: 'hello'
  }),
  new Backbone.Model({
    word: 'world'
  })
]);
console.log(collection.serialize()); // [{word: 'hello'}, {word: 'world'}]
