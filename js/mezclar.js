'use strict';

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getOwnPropertyNames      = Object.getOwnPropertyNames,
    defineProperty           = Object.defineProperty


/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} destination
 *
 * @param {Object} source
 *
 * @return {destination}
 */

function mezclar (destination, source) {
  var key,
      ref = getOwnPropertyNames(source)

  for (var i in ref) {
    if (ref.hasOwnProperty(i) &&
        source.propertyIsEnumerable(key = ref[i])) {
      var desc = getOwnPropertyDescriptor(source, key)
      defineProperty(destination, key, desc)
    }
  }

  return destination
}

module.exports = mezclar
