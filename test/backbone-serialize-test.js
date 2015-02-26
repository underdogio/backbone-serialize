// Load in dependencies
var assert = require('assert');
var backboneSerialize = require('../');

// Start our tests
describe('backbone-serialize', function () {
  it('returns awesome', function () {
    assert.strictEqual(backboneSerialize(), 'awesome');
  });
});
