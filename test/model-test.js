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
describe('A model being serialized', function () {
  testUtils.serialize(function basicModel () {
    return new Backbone.Model({
      hello: 'world'
    });
  });

  it('returns its attributes in an object', function () {
    assert.deepEqual(this.result, {hello: 'world'});
  });
});

describe('A model with a model as an attribute being serialized', function () {
  testUtils.serialize(function modelWithModel () {
    return new Backbone.Model({
      hello: 'world',
      cereal: new Backbone.Model({
        monster: true
      })
    });
  });

  it('returns its normal attributes', function () {
    assert.strictEqual(this.result.hello, 'world');
  });

  it('returns the serialized model', function () {
    assert.deepEqual(this.result.cereal, {monster: true});
  });
});

describe('A model with a collection being serialized', function () {
  testUtils.serialize(function modelWithCollection () {
    return new Backbone.Model({
      hello: 'world',
      planets: new Backbone.Collection([{
        name: 'Earth'
      }, {
        name: 'Mars'
      }])
    });
  });

  it('returns its normal attributes', function () {
    assert.strictEqual(this.result.hello, 'world');
  });

  it('returns the serialized collection', function () {
    assert.deepEqual(this.result.planets, [{
      name: 'Earth'
    }, {
      name: 'Mars'
    }]);
  });
});

describe('A model with dynamic attributes being serialized', function () {
  testUtils.serialize(function modelWithDynamicAttrs () {
    var DynamicModel = Backbone.Model.extend({
      dynamicAttributes: ['goodbye'],
      goodbye: function () {
        return 'moon';
      }
    });

    return new DynamicModel({
      hello: 'world'
    });
  });

  it('returns its normal attributes', function () {
    assert.strictEqual(this.result.hello, 'world');
  });

  it('returns its dynamic attributes', function () {
    assert.strictEqual(this.result.goodbye, 'moon');
  });
});
