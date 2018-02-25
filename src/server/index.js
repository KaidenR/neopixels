const express = require('express')

const NeoPixels = require('../neoPixels')

class NeoPixelServer {
  constructor() {
    this.neoPixels = new NeoPixels()
    const app = this.app = express()


    app.post('/on/:value', this.handleSetOnRequest.bind(this))
    app.post('/hue/:value', this.handleSetHueRequest.bind(this))
    app.post('/saturation/:value', this.handleSetSaturationRequest.bind(this))
    app.post('/brightness/:value', this.handleSetBrightnessRequest.bind(this))

    app.use(this.errorHandler)
  }

  listen() {
    this.app.listen(3000, () => console.log('Server listening on port 3000!'))
  }

  shutDown() {
    this.neoPixels.turnOff()
  }

  errorHandler(err, req, res, next) {
    console.error(err.stack)
    res.send(500, { error: err })
  }

  handleSetOnRequest(req, res) {
    console.log(`Setting ON to ${req.params.value}`)
    if (req.params.value === 'false') {
      this.neoPixels.turnOff()
    } else {
      this.neoPixels.turnOn()
    }

    res.status(200).send()
  }

  handleSetHueRequest(req, res) {
    let hue = req.params.value / 360
    console.log(`Setting HUE to ${hue}`)
    this.neoPixels.setHue(hue)
    res.status(200).send()
  }

  handleSetSaturationRequest(req, res) {
    let saturation = req.params.value / 100
    this.neoPixels.setSaturation(saturation)
    console.log(`Setting SATURATION to ${saturation}`)
    res.send()
  }

  handleSetBrightnessRequest(req, res) {
    console.log(`Setting BRIGHTNESS to ${req.params.value}`)
    this.neoPixels.setBrightness(parseInt(req.params.value))
    res.status(200).send()
  }
}

module.exports = NeoPixelServer