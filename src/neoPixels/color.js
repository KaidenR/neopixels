const { hslToRgb } = require('./util')

function Color(r, g, b, w) {
  if(r instanceof Color) {
    this.fromColor(r)
  } else if(typeof r === 'string') {
    this.fromString(r)
  } else {
    this.fromRgbw(r, g, b, w)
  }
}

Color.fromHueAndSaturation = function(hue, saturation) {
  const { r, g, b } = hslToRgb(hue, saturation, 0.5)
  return new Color(r, g, b, 0)
}

Color.prototype.fromColor = function(color) {
  this.decimal = color.decimal
}

Color.prototype.fromString = function(str) {
  const parts = str.split(',')
  if (parts.length === 4) {
    this.fromRgbw(...parts)
  }
}

Color.prototype.fromRgbw = function(r, g, b, w) {
  this.decimal = rgbw(r, g, b, w)
}

Color.prototype.toNumber = function() {
  return this.decimal
}

function rgbw(r, g, b, w) {
  return parseInt(`${toHex(w)}${toHex(g)}${toHex(r)}${toHex(b)}`, 16)
}

function toHex(num) {
  const hex = (num & 0xff).toString(16)
  if(hex.length < 2)
    return '0' + hex
  return hex
}

module.exports = Color