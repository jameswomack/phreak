'use strict';

// It'd be great to have a module for these blocks
var Units = {
  EM : 'em',
  PX : 'px'
}

function nUnit (n, unit) {
  return String(n) + unit
}

var CSSUnit = {
  em : function em (n) {
    return nUnit(n, Units.EM)
  },

  px : function px (n) {
    return nUnit(n, Units.PX)
  }
}

module.exports = CSSUnit
