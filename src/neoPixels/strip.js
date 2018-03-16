const Color = require('./color')

class Strip {
  constructor(array) {
    this.array = array
  }

  setRange(start, end, color) {
    for (let i = start; i < end; i++) {
      this.array[i] = color.rgbwNumber();
    }

    return this
  }

  setTop(color) {
    return this.setRange(88, 158, color)
  }
  setSides(color) {
    return this
      .setRange(69, 87, color)
      .setRange(157, 177, color)
  }
  setBottom(color) {
    return this.setRange(0, 69, color)
  }

  setBlock(start, count, color) {
    this.setRange(start, start + count, color)
    return this
  }

  fill(color) {
    this.setRange(0, this.array.length, color)
    return this
  }

  clear() {
    this.fill(new Color(0,0,0,0))
    return this
  }

}


module.exports = Strip