(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Define our mixin binding
function BackboneSerializeMixin(Backbone) {
  // Add on our model and collection mixins
  Backbone.Model.prototype.serialize = function () {
    // Walk over all of our attributes
    var retObj = {};
    for (var key in this.attributes) {
      if (this.attributes.hasOwnProperty(key)) {
        // If the value is a Model or a Collection, then serialize them as well
        var val = this.attributes[key];
        if (val instanceof Backbone.Model || val instanceof Backbone.Collection) {
          retObj[key] = val.serialize();
        // Otherwise, save the original value
        } else {
          retObj[key] = val;
        }
      }
    }

    // Iterate over each the dynamic attributes
    if (this.dynamicAttributes) {
      var i = 0;
      var len = this.dynamicAttributes.length;
      for (; i < len; i++) {
        key = this.dynamicAttributes[i];
        retObj[key] = this[key]();
      }
    }

    // Return the serialized attributes
    return retObj;
  };

  Backbone.Collection.prototype.serialize = function () {
    // Walk over all of our models
    var i = 0;
    var len = this.models.length;
    var retArr = [];
    for (; i < len; i++) {
      // If the model is serializable, then serialize it
      var model = this.models[i];
      if (model instanceof Backbone.Model || model instanceof Backbone.Collection) {
        retArr.push(model.serialize());
      // Otherwise (it is an object), return it in its current form
      } else {
        retArr.push(model);
      }
    }

    // Return the serialized models
    return retArr;
  };

  // Return Backbone
  return Backbone;
}

// Export our function
exports.mixin = BackboneSerializeMixin;

},{}],2:[function(require,module,exports){
// Load in our library and expose it to `window`
window.BackboneSerialize = require('./backbone-serialize');

},{"./backbone-serialize":1}]},{},[2]);
