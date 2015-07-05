/**
 * RGBNormalizer module.
 * @module rgb-normalizer
*/

var inRange = require('in-range')

/** The RGB range. */
var RGBBounds = {
  MIN : 0,
  MAX : 255
}

RGBBounds.BLACK = RGBBounds.MIN
RGBBounds.WHITE = RGBBounds.MAX

/** Let's you know if the number is in the RGB range. */
function isRGB (colorInt) {
  return inRange(colorInt, RGBBounds.MAX)
}

/** Takes a Number and moves it into the RGB range. */
function coaxed (colorInt) {
  var coaxedValue = colorInt

  switch (colorInt) {
    case (colorInt < RGBBounds.MIN):
      coaxedValue = RGBBounds.MIN
      break

    case (colorInt > RGBBounds.MAX):
      coaxedValue = RGBBounds.MAX
      break

    default:
      break
  }

  return coaxedValue
}

module.exports = {
  coaxed : coaxed,
  isRGB  : isRGB,
  Bounds : RGBBounds
}
