const ws281x = require('rpi-ws281x-native')

const Color = require('./color')
const Strip = require('./strip')
const config = require('../config')

const FADE_UPDATE_INTERVAL = 1000 / 60
const FADE_DURATION = 2000
const FADE_EASING_FUNC = cubicInOut
const COLOR_CHANGE_DELAY = 200
const { ledCount } = config.neoPixels

class NeoPixels {
  constructor() {
    this.channel = ws281x(ledCount, { stripType: 'sk6812-rgbw' });

    this.isOn = false
    this.hue = 0
    this.saturation = 0
    this.brightness = this.channel.brightness = 0
    this.strip = new Strip(this.channel.array)

    this.reset()
  }

  reset() {
    const colorNumber = Color.white.rgbwNumber()
    const colorArray = this.channel.array
    for (let i = 0; i < ledCount; i++) {
      colorArray[i] = colorNumber
    }
    this.render(colorArray)
  }

  sayHello() {
    const startBrightness = this.brightness
    this.fadeBrightness(0, 500)
      .then(() => this.fadeBrightness(75, 300))
      .then(() => this.fadeBrightness(0, 500))
      .then(() => this.fadeBrightness(75, 300))
      .then(() => this.fadeBrightness(0, 500))
      .then(() => this.fadeBrightness(startBrightness / 255 * 100, 200))
  }

  turnOff() {
    if(this.isOn) {
      this.fadeBrightness(0)
      this.cancelAnimation()
      this.isOn = false
    }
  }

  turnOn() {
    if(!this.isOn) {
      this.fadeBrightness(100)
      this.isOn = true
    }
  }

  fill(color) {
    const colorNumber = color.rgbwNumber()
    const colorArray = this.channel.array
    for (let i = 0; i < ledCount; i++) {
      colorArray[i] = colorNumber
    }

    this.render(colorArray)
  }

  render(colorArray) {
    ws281x.render(colorArray)
  }

  updateColor() {
    clearTimeout(this.colorChangeTimeout)
    this.turnOn()

    this.colorChangeTimeout = setTimeout(() => {
      this.cancelAnimation()
      if(this.targetHue === 17 && this.targetSaturation === 85) {
        this.rainbow()
        this.hue = this.saturation = 0
      } else {
        this.fadeColorToTarget()
      }
    }, COLOR_CHANGE_DELAY)
  }

  fadeColorToTarget() {
    clearInterval(this.colorFadeInterval)

    const targetLightness = this.targetHue === 0 && this.targetSaturation === 0 ? 100 : 50
    const startLightness = this.hue === 0 && this.saturation === 0 ? 100 : 50
    const targetRgbw = Color.hsl(this.targetHue, this.targetSaturation, targetLightness).rgbwObject()
    const startRgbw = Color.hsl(this.hue, this.saturation, startLightness).rgb().rgbwObject()
    const redDistance = targetRgbw.r - startRgbw.r
    const greenDistance = targetRgbw.g - startRgbw.g
    const blueDistance = targetRgbw.b - startRgbw.b
    const whiteDistance = targetRgbw.w - startRgbw.w
    const start = new Date()

    this.colorFadeInterval = setInterval(() => {
      const ellapsedMillis = new Date() - start
      const time = ellapsedMillis / FADE_DURATION
      const newRed = FADE_EASING_FUNC(time) * redDistance + startRgbw.r
      const newGreen = FADE_EASING_FUNC(time) * greenDistance + startRgbw.g
      const newBlue = FADE_EASING_FUNC(time) * blueDistance + startRgbw.b
      const newWhite = FADE_EASING_FUNC(time) * whiteDistance + startRgbw.w

      this.fill(Color.rgbw(newRed, newGreen, newBlue, newWhite))

      if(time > 1) {
        clearInterval(this.colorFadeInterval)
      }
    }, FADE_UPDATE_INTERVAL)

    this.hue = this.targetHue
    this.saturation = this.targetSaturation
  }

  setHue(hue) {
    this.targetHue = hue
    this.updateColor()
  }

  setSaturation(saturation) {
    this.targetSaturation = saturation
    this.updateColor()
  }

  setBrightness(percent) {
    this.brightness = this.channel.brightness = percent
    this.render(this.channel.array)
  }

  fadeBrightness(percent, duration = FADE_DURATION) {
    return new Promise(resolve => {
      clearInterval(this.fadeInterval)

      const start = Date.now()
      const startBrightness = this.brightness
      const targetBrightness = percent / 100 * 255
      const brightnessDistance = targetBrightness - startBrightness
      const increasing = targetBrightness > startBrightness
      const limitFunc = increasing ? Math.min : Math.max

      this.fadeInterval = setInterval(() => {
        const ellapsedMillis = Date.now() - start
        const time = ellapsedMillis / duration
        const newBrightness = FADE_EASING_FUNC(time) * brightnessDistance + startBrightness
        this.setBrightness(limitFunc(targetBrightness, newBrightness))

        if(time > 1) {
          clearInterval(this.fadeInterval)
          resolve()
        }
      }, FADE_UPDATE_INTERVAL)
    })
  }

  cancelAnimation() {
    clearInterval(this.animationInterval)
  }

  rainbow() {
    let offset = 0;
    this.animationInterval = setInterval(() => {
      const colorArray = this.channel.array
      for(let i = 0; i < ledCount; i++) {
        colorArray[i] = colorwheel((offset + i) % 256);
      }
      offset = (offset + 1) % 256;
      this.render(colorArray);
    }, 1000 / 30);
  }
}

function cubicInOut(t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
}

function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) {
    return rgbw(255 - pos * 3, 0, pos * 3, 0);
  }
  else if (pos < 170) {
    pos -= 85;
    return rgbw(0, pos * 3, 255 - pos * 3, 0);
  }
  else {
    pos -= 170;
    return rgbw(pos * 3, 255 - pos * 3, 0, 0);
  }
}

function rgbw(r, g, b, w) {
  return parseInt(`${toHex(w)}${toHex(g)}${toHex(r)}${toHex(b)}`, 16)
}

function toHex(num) {
  const hex = (num & 0xff).toString(16)
  if (hex.length < 2)
    return '0' + hex
  return hex

}

module.exports = NeoPixels