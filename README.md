# backbone-serialize [![Build status](https://travis-ci.org/underdogio/backbone-serialize.png?branch=master)](https://travis-ci.org/underdogio/backbone-serialize)

Serialize [Backbone][] models and collections into JSON representations

This was written to prevent mutating model/collection state once inside of a template. This was heavily inspired by [Chaplin's serialize][chaplin-serialize] method.

[Backbone]: http://backbonejs.org/
[chaplin-serialize]: http://docs.chaplinjs.org/chaplin.model.html#serialize

## Getting Started
### npm
Install the module with: `npm install backbone-serialize`

```js
// Add our bindings to Backbone
var BackboneSerialize = require('backbone-serialize');
var Backbone = BackboneSerialize.mixin(require('backbone'));

// Create a model and serialize it
var model = new Backbone.Model({
  hello: 'world'
});
model.serialize(); // {hello: 'world'}

// Create a model with a model and serialize it
var model = new Backbone.Model({
  name: 'Earth',
  galaxy: new Backbone.Model({
    name: 'Milky Way'
  })
});
model.serialize(); // {name: 'Earth', galaxy: {name: 'Milky Way'}}

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
person.serialize(); // {first_name: 'Bark', full_name: 'Bark Ruffalo', last_name: 'Ruffalo'}

// Create a collection and serialize it
var collection = new Backbone.Collection([
  new Backbone.Model({
    word: 'hello'
  }),
  new Backbone.Model({
    word: 'world'
  })
]);
collection.serialize(); // [{word: 'hello'}, {word: 'world'}]
```

### bower
Install the module with: `bower install backbone-serialize`

```html
<script src="bower_components/backbone-serialize/dist/backbone-serialize.min.js"></script>
<script>
  window.BackboneSerialize; // Use same as in `npm`
</script>
```

### Vanilla
Download the minified JS at:

https://raw.githubusercontent.com/underdogio/backbone-serialize/master/dist/backbone-serialize.min.js

```html
<script src="backbone-serialize.min.js"></script>
<script>
  window.BackboneSerialize; // Use same as in `npm`
</script>
```

## Documentation
`backbone-serialize` exposes the function `mixin` via `exports.mixin`.

### `mixin(Backbone)`
Add `serialize` bindings to `Backbone` library

This function mutates `Backbone.Model.prototype` and `Backbone.Collection.prototype` and adds a `serialize` method to each.

- Backbone `Object` - Backbone library to mix into
    - Model `Function` - Constructor for Backbone models
    - Collection `Function` - Constructor for Backbone collections

**Returns:**

- Backbone `Object` - Original `Backbone` library passed in with mutated `Backbone.Model` and `Backbone.Collection`

### `model.dynamicAttributes`
Array of attributes that should be added to the returned serialized values. It is preferred to define this via `Model.extend` but it can be defined directly on instances.

- dynamicAttributes `String[]` - Array of strings for methods to run and save as serialized attributes
    - For example, if `dynamicAttributes` is `['formatted_date']`, then `model.formatted_date()` would be run and saved to the serialized result

**Usage via Model.extend:**

```js
var UserModel = Backbone.Model.extend({
  dynamicAttributes: ['formatted_date'],
  formatted_date: function () {
    // `last_login_date` is a Date, we are formatting it to a human friendlier string
    // e.g. 'Wed Feb 25 2015'
    return this.get('last_login_date').toDateString();
  }
});
var user = new UserModel({
  username: 'barkruffalo'
});
user.serialize(); /*
{
  formatted_date: 'Wed Feb 25 2015',
  username: 'barkruffalo'
}
*/
```

### `model.serialize()`
Return JSON form of `model.attributes`. This iterates over `model.attributes`, serializes any models/collections, and saves all attributes into an object.

Additionally, it supports `model.dynamicAttributes` which allows for converting methods into their serialized form.

**Returns:**

- retObj `Object` - Serialized form of `model.attributes`
    - This will be key/value pairs that directly correspond to `model.attributes`
    - If any of the attributes were a model or collection, then this will be their `.serialize()'d` form
    - If `model.dynamicAttributes` was defined, then those properties will be executed and be preset on `retObj` under their respective keys

### `collection.serialize()`
Returns JSON form of `collection.models`. This iterates over `collection.models`, serializes any models, and saves all results into an array of objects.

**Returns:**

- retArr `Object[]` - Array of serialized form of `collection.models`
    - This will be in the same order as `collection.models`
    - If any of the models were a model, then this will be their `.serialize()'d` form

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.

## License
Copyright (c) 2015 Underdog.io

Licensed under the MIT license.
