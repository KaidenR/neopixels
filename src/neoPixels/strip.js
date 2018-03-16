const Color = require('./color')

class Strip {
  constructor(array) {
    this.array = array
  }

  setRange(start, end, color) {
    for (let i = start; i < end; i++) {
      this.array[i] = color.toNumber();
    }

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