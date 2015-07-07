'use strict';

var dashify = require('dashify')

function Rule (options) {
  if (!(this instanceof Rule)) {
    return new Rule(options)
  }

  this.index = options.index || 0
  this.selector = options.selector
  this.properties = options.properties
}

var SEP = ' : '
var IMPORTANT = '!important'
var PROPS_START = ' { \n'
var PROP_PADDING = '\t'
var PROP_END = ';\n'
var PROPS_END = ' } '

// value from prop
function v (prop) {
  return prop.value
}

// important from prop
function i (prop) {
  return prop.important ? IMPORTANT : ''
}

function propString (propName, prop) {
  return dashify(propName) + SEP + v(prop) + i(prop)
}

function appended (string, propName, prop) {
  return string + PROP_PADDING + propString(propName, prop) + PROP_END
}

function normalized (prop) {
  if (typeof prop === 'string') {
    prop = {
      value     : prop,
      important : false
    }
  }

  return prop
}

Rule.prototype = Object.create({
  toString: function toString () {
    var string = String(this.selector) + PROPS_START
    var props = this.properties

    for (var propName in props) {
      if (props.hasOwnProperty(propName)) {
        string = appended(string, propName, normalized(props[propName]))
      }
    }

    return string + PROPS_END
  },

  toArray: function toArray () {
    return [ this.toString(), this.index ]
  }
})

module.exports = Rule
