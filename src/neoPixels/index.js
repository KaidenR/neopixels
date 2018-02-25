const ws281x = require('rpi-ws281x-native');

const Color = require('./color')
const { hslToRgb } = require('./util')

const LED_COUNT = 240

class NeoPixels {
  constructor() {
    this.channel = ws281x(LED_COUNT, { stripType: 'sk6812-rgbw' });
    this.saturation = 0.5
    this.hue = 0.5
    this.isOn = false
    this.turnOn()
    this.fill(new Color(0,0,0,100))
  }

  fill(color) {
    const col = new Color(color).toNumber()
    console.log('filling with color', col);
    const colorArray = this.channel.array;
    for (let i = 0; i < this.channel.count; i++) {
      colorArray[i] = col;
    }

    ws281x.render(colorArray)
    this.isOn = true
  }

  setHue(hue) {
    this.hue = hue
    this.fill(new Color(...hslToRgb(this.hue, this.saturation, 0.5), 0))
  }

  setSaturation(saturation) {
    this.saturation = saturation
    this.fill(new Color(...hslToRgb(this.hue, this.saturation, 0.5), 0))
  }

  turnOff() {
    if(this.isOn) {
      this.setBrightness(0)
      this.isOn = false
    }
  }

  turnOn() {
    if(!this.isOn) {
      this.setBrightness(50)
      this.isOn = true
    }
  }

  setBrightness(percent) {
    this.channel.brightness = percent / 100 * 255
    ws281x.render(this.channel.array)
  }
}

module.exports = NeoPixels