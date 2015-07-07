var RGBNormalizer = require('./rgb-normalizer')
var randomColor   = require('random-color')

// Triplets of the Siamese variety
function triSi (i) {
  return [ i, i, i ].join(', ')
}

var CSSColor = {
  /** Create a CSS RGB string from one color. */
  rgb3 : function rgb3 (colorToTriplicateAsRGB) {
    var i = Number(colorToTriplicateAsRGB)

    if (!RGBNormalizer.isRGB(i)) {
      i = RGBNormalizer.coaxed(i)
    }

    return 'rgb(' + triSi(i) + ')'
  },

  rand: function rand (max) {
    return randomColor(max)
  }
}

module.exports = CSSColor
