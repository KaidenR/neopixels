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
    app.post('/sayHello', this.handleSayHelloRequest.bind(this))

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
    res.status(200).send({ value: this.neoPixels.isOn })
  }

  handleGetHueRequest(req, res) {
    res.send({ value: this.neoPixels.hue})
  }

  handleGetSaturationRequest(req, res) {
    res.send({ value: this.neoPixels.saturation})
  }

  handleGetBrightnessRequest(req, res) {
    res.send({ value: this.neoPixels.brightness})
  }

  handleSetOnRequest(req, res) {
    console.log(`Setting ON to ${req.params.value}`)
    if (req.params.value === 'false') {
      this.neoPixels.turnOff()
    } else {
      this.neoPixels.turnOn()
    }

    res.sendStatus(200)
  }

  handleSetHueRequest(req, res) {
    const value = parseInt(req.params.value)
    console.log(`Setting HUE to ${value}`)
    this.neoPixels.setHue(value)
    res.sendStatus(200)
  }

  handleSetSaturationRequest(req, res) {
    const value = parseInt(req.params.value)
    console.log(`Setting SATURATION to ${value}`)
    this.neoPixels.setSaturation(value)
    res.sendStatus(200)
  }

  handleSetBrightnessRequest(req, res) {
    const value = parseInt(req.params.value)
    console.log(`Setting BRIGHTNESS to ${value}`)
    this.neoPixels.setBrightness(value)
    res.sendStatus(200)
  }

  handleSayHelloRequest(req, res) {
    this.neoPixels.sayHello()
    res.sendStatus(200)
  }
}

module.exports = NeoPixelServer