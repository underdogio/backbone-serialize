// Load in dependencies
var assert = require('assert');
var BackboneSerialize = require('../');
var Backbone = BackboneSerialize.mixin(require('backbone'));

// Define test helpers
var testUtils = {
  serialize: function (fn) {
    before(function runFn () {
      var item = fn();
      this.result = item.serialize();
    });
    after(function cleanup () {
      delete this.result;
    });
  }
};

// Start our tests
describe('A collection of objects being serialized', function () {
  testUtils.serialize(function collectionWithObjects () {
    return new Backbone.Collection([{
      hello: 'world'
    }, {
      goodbye: 'moon'
    }]);
  });

  it('returns an array of the objects', function () {
    assert.deepEqual(this.result, [{
      hello: 'world'
    }, {
      goodbye: 'moon'
    }]);
  });
});

describe('A collection of models being serialized', function () {
  testUtils.serialize(function collectionWithModels () {
    return new Backbone.Collection([
      new Backbone.Model({
        color: 'blue'
      }),
      new Backbone.Model({
        color: 'red'
      })
    ]);
  });

  it('returns an array of the serialized models', function () {
    assert.deepEqual(this.result, [{
      color: 'blue'
    }, {
      color: 'red'
    }]);
  });
});
