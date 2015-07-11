'use strict';

var deepFreeze = require('deep-freeze'),
    keykey     = require('keykey'),
    PreSuf     = require('presuf')

var SUFFIX = 'Callback'

var lifecycleEventNames = [
  'created',
  'attached',
  'detached',
  'attributeChanged'
]

// https://en.wikipedia.org/wiki/Affix
var keys = PreSuf.suffix(lifecycleEventNames, SUFFIX)

module.exports = deepFreeze({
  lifecycle : keykey(keys),

  mapToDOM  : lifecycleEventNames.reduce(function reducer (map, name) {
    map[name] = name + SUFFIX

    return map
  }, {})
})
