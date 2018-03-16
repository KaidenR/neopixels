const express = require('express')

const NeoPixels = require('../neoPixels')

class NeoPixelServer {
  constructor() {
    this.neoPixels = new NeoPixels()
    const app = this.app = express()


    app.get('/on', this.handleGetOnRequest.bind(this))
    app.get('/hue', this.handleGetHueRequest.bind(this))
    app.get('/saturation', this.handleGetSaturationRequest.bind(this))
    app.get('/brightness', this.handleGetBrightnessRequest.bind(this))

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

  handleGetOnRequest(req, res) {
    res.status(200).send(this.neoPixels.isOn)
  }

  handleGetHueRequest(req, res) {
    res.status(200).send(this.neoPixels.hue)
  }

  handleGetSaturationRequest(req, res) {
    res.status(200).send(this.neoPixels.saturation)
  }

  handleGetBrightnessRequest(req, res) {
    res.status(200).send(this.neoPixels.brightness)
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
    const { value } = req.params
    console.log(`Setting HUE to ${value}`)
    this.neoPixels.setHue(value)
    res.status(200).send()
  }

  handleSetSaturationRequest(req, res) {
    const { value } = req.params
    console.log(`Setting SATURATION to ${value}`)
    this.neoPixels.setSaturation(value)
    res.status(200).send()
  }

  handleSetBrightnessRequest(req, res) {
    const { value } = req.params
    console.log(`Setting BRIGHTNESS to ${value}`)
    this.neoPixels.setBrightness(parseInt(value))
    res.status(200).send()
  }
}

module.exports = NeoPixelServer