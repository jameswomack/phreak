function Rule (options) {
  this.index = options.index || 0
  this.selector = options.selector
  this.properties = options.properties
}

var PROP_END = ';\n'
var SEP = ' : '
var IMPORTANT = '!important'
var PROPS_START = ' { \n'
var PROP_PADDING = '\t'
var PROPS_END = ' } '

// value from prop
function v (prop) {
  return prop.value
}

// important from prop
function i (prop) {
  return prop.important ? IMPORTANT : ''
}

function appended (string, propName, prop) {
  return string + PROP_PADDING + propName + SEP + v(prop) + i(prop) + PROP_END
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
      string = appended(string, propName, normalized(props[propName]))
    }

    return string + PROPS_END
  },

  toArray: function toArray () {
    return [ this.toString(), this.index ]
  }
})

module.exports = Rule
