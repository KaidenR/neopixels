const Color = require('color')


Object.assign(Color.prototype, {
  rgbwObject() {
    const { color } = this.rgb()
    let [r, g, b] = color
    const isGrayscale = r === g && r === b

    let w = 0
    if (color.length === 4){
      w = color[3]
    } else if (isGrayscale) {
      w = r
      r = g = b = 0
    }
    return { r, g, b, w }
  },

  rgbwNumber() {
    const { r, g, b, w } = this.rgbwObject()
    return parseInt(`${toHex(w)}${toHex(g)}${toHex(r)}${toHex(b)}`, 16)
  }
})

Color.rgbw = function(r, g, b, w) {
  const color = Color.rgb(r, g, b)
  color.color[3] = w

  return color
}

Color.random = function() {
  return Color.rgb(random(),random(), random())
}

function toHex(num) {
  const hex = (num & 0xff).toString(16)
  return hex.length < 2 ? '0' + hex : hex
}

function random() { return Math.random() * 255 }

module.exports = Color